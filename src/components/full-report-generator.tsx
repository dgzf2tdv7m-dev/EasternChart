"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, FileText, SealCheck, WarningCircle } from "@phosphor-icons/react";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

type InitialValues = {
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  gender?: string;
};

type ReportSection = {
  title: string;
  paragraphs: string[];
};

type ReportPayload = {
  report: {
    title: string;
    sections: ReportSection[];
  };
  provider: string;
  model: string;
};

type ReportRequest = {
  locale: Locale;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  gender: string;
  email: string;
  saleId: string;
  checkoutToken: string;
  errorMessage: string;
};

const GUMROAD_PRODUCT_URL = "https://gumroad.com/l/xqubii";
const UNLOCK_STORAGE_KEY = "eastern-chart-deep-report-unlocked";
const FORM_STORAGE_KEY = "eastern-chart-deep-report-form";
const SALE_ID_STORAGE_KEY = "eastern-chart-deep-report-sale-id";
const CHECKOUT_TOKEN_STORAGE_KEY = "eastern-chart-deep-report-checkout-token";
const directBuyStyle = {
  display: "inline-block",
  padding: "14px 32px",
  background: "#111",
  color: "#fff",
  borderRadius: 8,
  fontWeight: 600,
  textDecoration: "none",
  fontSize: 16,
  textAlign: "center",
} as const;

async function requestReport(input: ReportRequest) {
  const response = await fetch("/api/report/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      locale: input.locale,
      birthDate: input.birthDate,
      birthTime: input.birthTime,
      birthPlace: input.birthPlace,
      gender: input.gender,
      email: input.email,
      sale_id: input.saleId || undefined,
      checkout_token: input.checkoutToken || undefined,
    }),
  });
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.detail || payload?.error || input.errorMessage);
  }

  return payload as ReportPayload;
}

export function FullReportGenerator({
  locale,
  initialValues,
}: {
  locale: Locale;
  initialValues: InitialValues;
}) {
  const pageDict = getDictionary(locale);
  const dict = pageDict.report.delivery;
  const formDict = pageDict.freeChart;
  const reportDict = pageDict.report;
  const reportErrorMessage = dict.error;
  const [form, setForm] = useState({
    email: "",
    birthDate: initialValues.birthDate || "1992-08-17",
    birthTime: initialValues.birthTime || "09:30",
    birthPlace: initialValues.birthPlace || formDict.placePlaceholder,
    gender: initialValues.gender || formDict.genderOptions[0],
  });
  const [report, setReport] = useState<ReportPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState("");
  const [saleId, setSaleId] = useState("");
  const [checkoutToken, setCheckoutToken] = useState("");
  const autoGenerateStarted = useRef(false);

  const unlockReport = useCallback(() => {
    window.localStorage.setItem(UNLOCK_STORAGE_KEY, "true");
    setPaid(true);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const querySaleId = params.get("sale_id") || params.get("purchase_id") || params.get("order_id") || "";
    const storedSaleId = window.localStorage.getItem(SALE_ID_STORAGE_KEY) || "";
    const storedCheckoutToken = window.localStorage.getItem(CHECKOUT_TOKEN_STORAGE_KEY) || "";
    const hasSuccess =
      params.get("payment") === "success" ||
      params.get("gumroad_ping") === "true" ||
      params.has("sale_id") ||
      params.has("purchase_id") ||
      params.has("order_id");
    const storedUnlock = window.localStorage.getItem(UNLOCK_STORAGE_KEY) === "true";

    const nextSaleId = querySaleId || storedSaleId;

    if (querySaleId) {
      window.localStorage.setItem(SALE_ID_STORAGE_KEY, querySaleId);
    }

    window.setTimeout(() => {
      setSaleId(nextSaleId);
      setCheckoutToken(storedCheckoutToken);
    }, 0);

    if (hasSuccess || storedUnlock) {
      window.setTimeout(unlockReport, 0);
    }
  }, [unlockReport]);

  useEffect(() => {
    const storedForm = window.localStorage.getItem(FORM_STORAGE_KEY);

    if (!storedForm) {
      return;
    }

    try {
      const parsed = JSON.parse(storedForm) as Partial<typeof form>;

      window.setTimeout(() => {
        setForm((current) => ({
          email: typeof parsed.email === "string" ? parsed.email : current.email,
          birthDate: typeof parsed.birthDate === "string" ? parsed.birthDate : current.birthDate,
          birthTime: typeof parsed.birthTime === "string" ? parsed.birthTime : current.birthTime,
          birthPlace: typeof parsed.birthPlace === "string" ? parsed.birthPlace : current.birthPlace,
          gender: typeof parsed.gender === "string" ? parsed.gender : current.gender,
        }));
      }, 0);
    } catch {
      window.localStorage.removeItem(FORM_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    function handleGumroadMessage(event: MessageEvent) {
      const isGumroadOrigin = event.origin === "https://gumroad.com" || event.origin.endsWith(".gumroad.com");

      if (!isGumroadOrigin) {
        return;
      }

      const eventData = typeof event.data === "string" ? event.data : JSON.stringify(event.data ?? {});
      const hasPurchaseSignal = /gumroad|purchase|sale|success|paid/i.test(eventData);
      const hasCloseOnlySignal = /close|dismiss/i.test(eventData);

      if (hasPurchaseSignal && !hasCloseOnlySignal) {
        const parsedSaleId = eventData.match(/(?:sale_id|purchase_id|order_id)["':=\s]+([A-Za-z0-9_-]+)/i)?.[1];
        if (parsedSaleId) {
          window.localStorage.setItem(SALE_ID_STORAGE_KEY, parsedSaleId);
          setSaleId(parsedSaleId);
        }
        unlockReport();
      }
    }

    window.addEventListener("message", handleGumroadMessage);
    return () => window.removeEventListener("message", handleGumroadMessage);
  }, [unlockReport]);

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function generateReport() {
    setLoading(true);
    setError("");
    setReport(null);

    try {
      setReport(
        await requestReport({
          locale,
          birthDate: form.birthDate,
          birthTime: form.birthTime,
          birthPlace: form.birthPlace,
          gender: form.gender,
          email: form.email,
          saleId,
          checkoutToken,
          errorMessage: reportErrorMessage,
        }),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : reportErrorMessage);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!paid || report || loading || autoGenerateStarted.current) {
      return;
    }

    autoGenerateStarted.current = true;
    const timer = window.setTimeout(() => {
      setLoading(true);
      setError("");
      setReport(null);
      void requestReport({
        locale,
        birthDate: form.birthDate,
        birthTime: form.birthTime,
        birthPlace: form.birthPlace,
        gender: form.gender,
        email: form.email,
        saleId,
        checkoutToken,
        errorMessage: reportErrorMessage,
      })
        .then(setReport)
        .catch((err) => setError(err instanceof Error ? err.message : reportErrorMessage))
        .finally(() => setLoading(false));
    }, 0);

    return () => window.clearTimeout(timer);
  }, [
    form.birthDate,
    form.birthPlace,
    form.birthTime,
    form.email,
    form.gender,
    loading,
    locale,
    paid,
    report,
    reportErrorMessage,
    saleId,
    checkoutToken,
  ]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!paid) {
      return;
    }

    await generateReport();
  }

  return (
    <section id="delivery" className="rounded-lg border border-[#302A22] bg-[#13110E] p-5 md:p-7">
      <div className="flex items-start gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-md border border-[#C7A76C]/40 text-[#C7A76C]">
          <FileText size={22} />
        </span>
        <div>
          <h2 className="text-2xl font-semibold">{dict.title}</h2>
          <p className="mt-3 text-sm leading-7 text-[#B8AEA0]">{dict.body}</p>
        </div>
      </div>

      <form onSubmit={submit} className="mt-7 grid gap-4 md:grid-cols-2">
        <Field label={dict.email}>
          <input
            className="h-12 rounded-md border border-[#302A22] bg-[#0F0E0B] px-3 text-[#F4EFE6] outline-none transition placeholder:text-[#7F7569] focus:border-[#B6462E]"
            type="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="name@example.com"
            required
          />
        </Field>
        <Field label={formDict.birthPlace}>
          <input
            className="h-12 rounded-md border border-[#302A22] bg-[#0F0E0B] px-3 text-[#F4EFE6] outline-none transition placeholder:text-[#7F7569] focus:border-[#B6462E]"
            value={form.birthPlace}
            onChange={(event) => update("birthPlace", event.target.value)}
            placeholder={formDict.placePlaceholder}
            required
          />
        </Field>
        <Field label={formDict.birthDate}>
          <input
            className="h-12 rounded-md border border-[#302A22] bg-[#0F0E0B] px-3 text-[#F4EFE6] outline-none transition focus:border-[#B6462E]"
            type="date"
            value={form.birthDate}
            onChange={(event) => update("birthDate", event.target.value)}
            required
          />
        </Field>
        <Field label={formDict.birthTime}>
          <input
            className="h-12 rounded-md border border-[#302A22] bg-[#0F0E0B] px-3 text-[#F4EFE6] outline-none transition focus:border-[#B6462E]"
            type="time"
            value={form.birthTime}
            onChange={(event) => update("birthTime", event.target.value)}
            required
          />
        </Field>
        <Field label={formDict.gender}>
          <select
            className="h-12 rounded-md border border-[#302A22] bg-[#0F0E0B] px-3 text-[#F4EFE6] outline-none transition focus:border-[#B6462E]"
            value={form.gender}
            onChange={(event) => update("gender", event.target.value)}
          >
            {formDict.genderOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
        <div className="flex items-end">
          {paid ? (
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#B6462E] px-4 text-sm font-semibold text-[#F4EFE6] transition hover:bg-[#c55239] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-65"
            >
              <ArrowRight size={18} />
              {loading ? dict.generating : dict.generate}
            </button>
          ) : (
            <a
              href={GUMROAD_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={directBuyStyle}
            >
              立即购买
            </a>
          )}
        </div>
      </form>

      {!paid && (
        <div className="mt-7 rounded-md border border-[#302A22] bg-[#0F0E0B] p-5">
          <p className="font-mono text-sm text-[#C7A76C]">{reportDict.visible}</p>
          <div className="mt-4 grid gap-3">
            {reportDict.sections.slice(0, 3).map((section) => (
              <div key={section} className="rounded-md border border-[#302A22] p-4">
                <h3 className="font-semibold">{section}</h3>
                <p className="mt-2 text-sm leading-6 text-[#B8AEA0]">{reportDict.previewBody}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-[#B8AEA0]">{dict.lockedNotice}</p>
        </div>
      )}

      {error && (
        <p className="mt-5 flex gap-2 rounded-md border border-[#B6462E]/50 bg-[#B6462E]/10 p-4 text-sm leading-6 text-[#ffb09f]">
          <WarningCircle className="mt-0.5 shrink-0" size={18} />
          {error}
        </p>
      )}

      {paid && !report && !loading && !error && (
        <p className="mt-5 flex items-center gap-2 rounded-md border border-[#C7A76C]/40 bg-[#C7A76C]/10 p-4 text-sm leading-6 text-[#E8D7AD]">
          <SealCheck className="shrink-0" size={18} />
          {dict.unlocked}
        </p>
      )}

      {paid && report && (
        <div className="mt-8">
          <p className="flex items-center gap-2 text-sm text-[#C7A76C]">
            <SealCheck size={18} />
            <span>{dict.success}</span>
            <span className="text-[#7F7569]">/</span>
            <span>{dict.model}</span>
            <span className="text-[#7F7569]">/</span>
            <span>{report.model}</span>
          </p>
          <h3 className="mt-5 text-3xl font-semibold leading-tight">{report.report.title}</h3>
          <div className="mt-7 grid gap-4">
            {report.report.sections.map((section) => (
              <article key={section.title} className="rounded-md border border-[#302A22] p-5">
                <h4 className="text-xl font-semibold">{section.title}</h4>
                <div className="mt-4 grid gap-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-7 text-[#B8AEA0]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm text-[#F4EFE6]">
      <span>{label}</span>
      {children}
    </label>
  );
}
