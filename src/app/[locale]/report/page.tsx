import type { Metadata } from "next";
import Link from "next/link";
import { LockKey, SealCheck } from "@phosphor-icons/react/dist/ssr";
import { FullReportGenerator } from "@/components/full-report-generator";
import { PageFrame } from "@/components/site-shell";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

function readParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Pick<PageProps, "params">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const dict = getDictionary(locale).report;
  return buildPageMetadata(
    locale,
    "/report",
    `${dict.title} | Eastern Chart AI Report`,
    `${dict.body} Unlock a structured BaZi report with personality, career, relationship, timing, and practical annual focus chapters.`,
  );
}

export default async function ReportPage({
  params,
  searchParams,
}: PageProps) {
  const { locale: rawLocale } = await params;
  const query = await searchParams;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const dict = getDictionary(locale).report;
  const initialValues = {
    birthDate: readParam(query.birthDate),
    birthTime: readParam(query.birthTime),
    birthPlace: readParam(query.birthPlace),
    gender: readParam(query.gender),
  };

  return (
    <PageFrame locale={locale}>
      <main className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">{dict.title}</h1>
            <p className="mt-5 text-lg leading-8 text-[#B8AEA0]">{dict.body}</p>
            <Link
              href="#delivery"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#B6462E] px-5 py-3 text-sm font-semibold text-[#F4EFE6] transition hover:bg-[#c55239] active:translate-y-px"
            >
              {dict.buy}
            </Link>
          </aside>
          <div className="grid gap-6">
            <FullReportGenerator locale={locale} initialValues={initialValues} />
            <section className="rounded-lg border border-[#302A22] bg-[#13110E] p-5 md:p-7">
              <h2 className="text-2xl font-semibold">{dict.tocTitle}</h2>
              <div className="mt-7 grid gap-4">
                {dict.sections.map((section, index) => {
                  const open = index < 3;
                  return (
                    <article key={section} className="rounded-md border border-[#302A22] p-5">
                      <div className="flex items-start justify-between gap-5">
                        <div>
                          <p className="font-mono text-sm text-[#C7A76C]">{open ? dict.visible : dict.locked}</p>
                          <h3 className="mt-3 text-xl font-semibold">{section}</h3>
                        </div>
                        {open ? <SealCheck size={24} className="text-[#C7A76C]" /> : <LockKey size={24} className="text-[#B6462E]" />}
                      </div>
                      <p className="mt-4 text-sm leading-7 text-[#B8AEA0]">{open ? dict.previewBody : dict.lockedBody}</p>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </main>
    </PageFrame>
  );
}
