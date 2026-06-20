import { NextResponse } from "next/server";
import { calculateChart, type ChartInput, type ChartResult } from "@/lib/chart";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { checkAndConsumeRateLimit, getClientIp, validateReportPayment } from "@/lib/payment";

export const maxDuration = 60;

type DeepSeekReport = {
  title: string;
  sections: {
    title: string;
    paragraphs: string[];
  }[];
};

const localeLanguage: Record<Locale, string> = {
  en: "English",
  ja: "Japanese",
  ko: "Korean",
  "zh-Hant": "Traditional Chinese",
  "zh-Hans": "Simplified Chinese",
};

function localizeChart(chart: ChartResult, locale: Locale) {
  const dict = getDictionary(locale).freeChart;

  return {
    pillars: chart.pillars.map((pillar, index) => ({
      label: dict.pillars[index],
      stem: dict.stemNames[pillar.stem] ?? pillar.stem,
      branch: dict.branchNames[pillar.branch] ?? pillar.branch,
      element: dict.elementNames[pillar.element] ?? pillar.element,
    })),
    elements: Object.fromEntries(
      Object.entries(chart.elements).map(([element, value]) => [dict.elementNames[element] ?? element, value]),
    ),
    dayMaster: dict.stemNames[chart.dayMaster] ?? chart.dayMaster,
    strongestElement: dict.elementNames[chart.strongestElement] ?? chart.strongestElement,
    quietestElement: dict.elementNames[chart.quietestElement] ?? chart.quietestElement,
  };
}

function buildPrompt(input: ChartInput, chart: ChartResult, locale: Locale) {
  const language = localeLanguage[locale];
  const localizedChart = localizeChart(chart, locale);

  return [
    `Write in ${language}.`,
    "Use the following BaZi chart JSON as the source data.",
    "Generate exactly 12 sections for a paid deep report.",
    "Section themes must cover: chart overview, day master, personality, career, wealth, relationships, health habits, yearly trend, decision timing, risks, strengths, action advice.",
    "Each section must contain 2 or 3 paragraphs.",
    "Tone: professional, restrained, insightful, specific, and practical. Avoid hype, fear, guarantees, fatalism, medical claims, legal advice, and financial advice.",
    "Return JSON only. Schema: {\"title\":\"string\",\"sections\":[{\"title\":\"string\",\"paragraphs\":[\"string\",\"string\"]}]}",
    "Every paragraph should be substantial but concise.",
    JSON.stringify(
      {
        birthData: input,
        chart: localizedChart,
        rawChart: chart,
      },
      null,
      2,
    ),
  ].join("\n\n");
}

function parseReport(content: string): DeepSeekReport {
  const cleaned = content.trim().replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  const jsonText =
    cleaned.startsWith("{") && cleaned.endsWith("}")
      ? cleaned
      : cleaned.slice(Math.max(0, cleaned.indexOf("{")), cleaned.lastIndexOf("}") + 1);
  const parsed = JSON.parse(jsonText) as DeepSeekReport;

  if (!parsed.title || !Array.isArray(parsed.sections) || parsed.sections.length < 12) {
    throw new Error("DeepSeek returned an invalid report shape.");
  }

  const sections = parsed.sections.slice(0, 12).map((section) => {
    const rawParagraphs = Array.isArray(section.paragraphs) ? section.paragraphs : [];
    const paragraphs = rawParagraphs
      .flatMap((paragraph) => String(paragraph).split(/\n+/))
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .slice(0, 3);

    if (!section.title || paragraphs.length < 2) {
      throw new Error("DeepSeek returned an incomplete section.");
    }

    return {
      title: String(section.title).trim(),
      paragraphs,
    };
  });

  return {
    title: String(parsed.title).trim(),
    sections,
  };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const locale = isLocale(body?.locale) ? body.locale : "en";

  if (!body?.birthDate || !body?.birthTime || !body?.birthPlace) {
    return NextResponse.json({ error: "Missing birth data." }, { status: 400 });
  }

  const input: ChartInput = {
    birthDate: String(body.birthDate),
    birthTime: String(body.birthTime),
    birthPlace: String(body.birthPlace),
    gender: String(body.gender ?? ""),
  };

  const payment = await validateReportPayment({
    ...input,
    email: String(body.email ?? ""),
    saleId: typeof body.sale_id === "string" ? body.sale_id : undefined,
    checkoutToken: typeof body.checkout_token === "string" ? body.checkout_token : undefined,
  });

  if (!payment.ok) {
    return NextResponse.json({ error: payment.error }, { status: 402 });
  }

  const rateLimit = checkAndConsumeRateLimit(getClientIp(request));
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: "Report generation limit reached. Please try again later.",
        resetAt: new Date(rateLimit.resetAt).toISOString(),
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000))),
        },
      },
    );
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "DEEPSEEK_API_KEY is not configured." }, { status: 500 });
  }

  const chart = calculateChart(input);
  const model = process.env.DEEPSEEK_MODEL ?? "deepseek-v4-flash";

  let response: Response;

  try {
    response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content:
              "You are a senior Eastern metaphysics report writer. You explain BaZi charts with restraint, clarity, and practical judgment.",
          },
          {
            role: "user",
            content: buildPrompt(input, chart, locale),
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.25,
        max_tokens: 6500,
      }),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "DeepSeek request failed.",
        detail: error instanceof Error ? error.message : "Network request failed.",
      },
      { status: 502 },
    );
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    return NextResponse.json(
      {
        error: "DeepSeek request failed.",
        detail: payload?.error?.message ?? response.statusText,
      },
      { status: 502 },
    );
  }

  const content = payload?.choices?.[0]?.message?.content;

  if (typeof content !== "string") {
    return NextResponse.json({ error: "DeepSeek returned no report content." }, { status: 502 });
  }

  try {
    const report = parseReport(content);

    return NextResponse.json({
      chart,
      report,
      provider: "deepseek",
      model,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unable to parse DeepSeek report.",
        detail: error instanceof Error ? error.message : "Unknown parser error.",
      },
      { status: 502 },
    );
  }
}
