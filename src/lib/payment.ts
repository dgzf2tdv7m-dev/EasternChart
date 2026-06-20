import { createHash, randomUUID } from "crypto";

type ReportPaymentInput = {
  saleId?: string;
  checkoutToken?: string;
  email?: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  gender: string;
};

type CheckoutTokenInput = {
  email: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  gender: string;
};

type GumroadSaleResponse = {
  success?: boolean;
  sale?: {
    id?: string;
    email?: string;
    product_id?: string;
    product_permalink?: string;
    refunded?: boolean;
    disputed?: boolean;
    dispute_won?: boolean;
    chargebacked?: boolean;
    cancelled?: boolean;
    can_contact?: boolean;
  };
};

type CachedSale = {
  birthHash: string;
  expiresAt: number;
};

type CheckoutToken = {
  email: string;
  birthHash: string;
  expiresAt: number;
  used: boolean;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const TWO_HOURS_MS = 2 * 60 * 60 * 1000;
const ONE_HOUR_MS = 60 * 60 * 1000;
const REPORTS_PER_HOUR = 5;
const GUMROAD_PRODUCT_URL = "https://gumroad.com/l/xqubii";

const saleCache = new Map<string, CachedSale>();
const checkoutTokens = new Map<string, CheckoutToken>();
const rateLimits = new Map<string, RateLimitEntry>();

function now() {
  return Date.now();
}

function pruneExpired() {
  const current = now();

  for (const [key, value] of saleCache) {
    if (value.expiresAt <= current) {
      saleCache.delete(key);
    }
  }

  for (const [key, value] of checkoutTokens) {
    if (value.expiresAt <= current) {
      checkoutTokens.delete(key);
    }
  }

  for (const [key, value] of rateLimits) {
    if (value.resetAt <= current) {
      rateLimits.delete(key);
    }
  }
}

function normalizeEmail(email?: string) {
  return String(email ?? "").trim().toLowerCase();
}

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

export function buildBirthHash(input: ReportPaymentInput | CheckoutTokenInput) {
  return createHash("sha256")
    .update(
      JSON.stringify({
        birthDate: input.birthDate,
        birthTime: input.birthTime,
        birthPlace: input.birthPlace.trim().toLowerCase(),
        gender: input.gender.trim().toLowerCase(),
      }),
    )
    .digest("hex");
}

export function checkAndConsumeRateLimit(ip: string) {
  pruneExpired();

  const current = now();
  const existing = rateLimits.get(ip);

  if (!existing || existing.resetAt <= current) {
    rateLimits.set(ip, { count: 1, resetAt: current + ONE_HOUR_MS });
    return { allowed: true, remaining: REPORTS_PER_HOUR - 1, resetAt: current + ONE_HOUR_MS };
  }

  if (existing.count >= REPORTS_PER_HOUR) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return { allowed: true, remaining: REPORTS_PER_HOUR - existing.count, resetAt: existing.resetAt };
}

export function createCheckoutToken(input: CheckoutTokenInput) {
  pruneExpired();

  const token = randomUUID();
  checkoutTokens.set(token, {
    email: normalizeEmail(input.email),
    birthHash: buildBirthHash(input),
    expiresAt: now() + TWO_HOURS_MS,
    used: false,
  });

  const url = new URL(GUMROAD_PRODUCT_URL);
  url.searchParams.set("wanted", "true");
  url.searchParams.set("checkout_token", token);
  url.searchParams.set("email", input.email);

  return {
    checkoutToken: token,
    checkoutUrl: url.toString(),
    expiresInSeconds: TWO_HOURS_MS / 1000,
  };
}

function validateCheckoutToken(input: ReportPaymentInput) {
  if (process.env.GUMROAD_ACCESS_TOKEN) {
    return false;
  }

  const token = String(input.checkoutToken ?? "").trim();
  const record = token ? checkoutTokens.get(token) : undefined;

  if (!record || record.used || record.expiresAt <= now()) {
    return false;
  }

  if (record.birthHash !== buildBirthHash(input)) {
    return false;
  }

  const requestedEmail = normalizeEmail(input.email);
  if (record.email && requestedEmail && record.email !== requestedEmail) {
    return false;
  }

  record.used = true;
  return true;
}

function getExpectedProductIds() {
  return new Set(
    [process.env.GUMROAD_PRODUCT_ID, process.env.GUMROAD_PRODUCT_PERMALINK ?? "xqubii"]
      .map((value) => value?.trim())
      .filter(Boolean),
  );
}

function saleMatchesProduct(sale: NonNullable<GumroadSaleResponse["sale"]>) {
  const expected = getExpectedProductIds();

  if (expected.size === 0) {
    return true;
  }

  return Boolean((sale.product_id && expected.has(sale.product_id)) || (sale.product_permalink && expected.has(sale.product_permalink)));
}

function saleIsCompleted(sale: NonNullable<GumroadSaleResponse["sale"]>) {
  return !sale.refunded && !sale.disputed && !sale.chargebacked && !sale.cancelled;
}

async function validateGumroadSale(input: ReportPaymentInput) {
  const accessToken = process.env.GUMROAD_ACCESS_TOKEN;
  const saleId = String(input.saleId ?? "").trim();

  if (!accessToken || !saleId) {
    return false;
  }

  const cached = saleCache.get(saleId);
  const birthHash = buildBirthHash(input);

  if (cached && cached.expiresAt > now()) {
    return cached.birthHash === birthHash;
  }

  const response = await fetch(`https://api.gumroad.com/v2/sales/${encodeURIComponent(saleId)}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return false;
  }

  const payload = (await response.json().catch(() => null)) as GumroadSaleResponse | null;
  const sale = payload?.sale;

  if (!payload?.success || !sale || !saleMatchesProduct(sale) || !saleIsCompleted(sale)) {
    return false;
  }

  const requestEmail = normalizeEmail(input.email);
  const saleEmail = normalizeEmail(sale.email);
  if (requestEmail && saleEmail && requestEmail !== saleEmail) {
    return false;
  }

  saleCache.set(saleId, { birthHash, expiresAt: now() + SEVEN_DAYS_MS });
  return true;
}

export async function validateReportPayment(input: ReportPaymentInput) {
  pruneExpired();

  if (process.env.NODE_ENV === "development" && !input.saleId && !input.checkoutToken) {
    return { ok: true as const, mode: "development" };
  }

  if (validateCheckoutToken(input)) {
    return { ok: true as const, mode: "checkout-token" };
  }

  if (await validateGumroadSale(input)) {
    return { ok: true as const, mode: "gumroad-sale" };
  }

  return {
    ok: false as const,
    error: "Payment verification failed. Please complete checkout before generating the full report.",
  };
}
