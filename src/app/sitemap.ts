import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { easternSeoPages } from "@/lib/seo-pages";
import { SITE_URL } from "@/lib/seo";

const lastModified = new Date("2026-06-20");
const localePages = ["", "/free-chart", "/samples", "/pricing", "/report"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...locales.flatMap((locale) =>
      localePages.map((path) => ({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified,
        changeFrequency: path ? "monthly" as const : "weekly" as const,
        priority: path ? 0.78 : 0.95,
      })),
    ),
    ...easternSeoPages.map((page) => ({
      url: `${SITE_URL}/zh-Hans/seo/${page.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.72,
    })),
  ];
}
