import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

export const SITE_URL = "https://mingchart.com";
export const LOCALE_HEADER = "x-eastern-chart-locale";

export const localeSeo = {
  en: {
    title: "Eastern Chart - AI BaZi Life Reading",
    description:
      "Generate a BaZi destiny chart, five elements balance, and AI life reading for career, relationships, timing, and annual focus.",
  },
  "zh-Hans": {
    title: "东方命理 - 免费八字排盘与AI命盘解读",
    description: "在线生成八字命盘、五行平衡和AI解读报告，帮助你理解事业、感情、财运、流年节奏与个人优势结构。",
  },
  "zh-Hant": {
    title: "東方命理 - 免費八字排盤與AI命盤解讀",
    description: "線上生成八字命盤、五行平衡與AI解讀報告，協助理解事業、感情、財運、流年節奏與個人優勢結構。",
  },
  ja: {
    title: "Eastern Chart - AI四柱推命と命式リーディング",
    description: "生年月日から四柱推命チャート、五行バランス、キャリア、恋愛、年運の流れをAIで読み解くオンライン命式ツールです。",
  },
  ko: {
    title: "Eastern Chart - AI 사주 명식과 운세 리딩",
    description: "생년월일과 시간을 바탕으로 사주 명식, 오행 균형, 커리어, 관계, 연간 흐름을 AI로 해석하는 온라인 도구입니다.",
  },
} satisfies Record<Locale, { title: string; description: string }>;

export const alternateLanguages = {
  en: `${SITE_URL}/en`,
  "zh-Hans": `${SITE_URL}/zh-Hans`,
  "zh-Hant": `${SITE_URL}/zh-Hant`,
  ja: `${SITE_URL}/ja`,
  ko: `${SITE_URL}/ko`,
  "x-default": `${SITE_URL}/en`,
};

export const alternateLinksHtml = Object.entries(alternateLanguages)
  .map(([hreflang, href]) => `<link rel="alternate" hreflang="${hreflang}" href="${href}" />`)
  .join("\n");

export function coerceLocale(value: string | null | undefined): Locale {
  return value && isLocale(value) ? value : "en";
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  return coerceLocale(segment);
}

export function buildLocaleMetadata(locale: Locale): Metadata {
  const seo = localeSeo[locale];
  const url = `${SITE_URL}/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: "Eastern Chart",
      type: "website",
      images: [{ url: "/images/report-ritual.png", width: 1200, height: 800, alt: seo.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/images/report-ritual.png"],
    },
  };
}

export function buildPageMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Eastern Chart",
      type: "website",
      images: [{ url: "/images/report-ritual.png", width: 1200, height: 800, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/report-ritual.png"],
    },
  };
}
