import type { Metadata } from "next";
import { PricingGrid } from "@/components/pricing-grid";
import { PageFrame } from "@/components/site-shell";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const dict = getDictionary(locale).pricing;
  return buildPageMetadata(
    locale,
    "/pricing",
    `${dict.title} | Eastern Chart Pricing`,
    `${dict.body} Compare the free BaZi chart, deep AI report, and annual timing report before choosing the right reading depth.`,
  );
}

export default async function PricingPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const dict = getDictionary(locale).pricing;

  return (
    <PageFrame locale={locale}>
      <main>
        <section className="px-5 pt-16 md:px-8 md:pt-24">
          <div className="mx-auto max-w-7xl">
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight md:text-6xl">{dict.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#B8AEA0]">{dict.body}</p>
          </div>
        </section>
        <PricingGrid locale={locale} />
      </main>
    </PageFrame>
  );
}
