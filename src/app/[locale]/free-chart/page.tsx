import type { Metadata } from "next";
import { FreeChartForm } from "@/components/free-chart-form";
import { PageFrame } from "@/components/site-shell";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const dict = getDictionary(locale).freeChart;
  return buildPageMetadata(
    locale,
    "/free-chart",
    `${dict.title} | Eastern Chart`,
    `${dict.body} Generate a BaZi chart, five element balance, and day master summary before unlocking a complete AI report.`,
  );
}

export default async function FreeChartPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const dict = getDictionary(locale).freeChart;

  return (
    <PageFrame locale={locale}>
      <main className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">{dict.title}</h1>
            <p className="mt-5 text-lg leading-8 text-[#B8AEA0]">{dict.body}</p>
          </div>
          <FreeChartForm locale={locale} />
        </div>
      </main>
    </PageFrame>
  );
}
