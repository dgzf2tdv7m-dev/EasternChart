import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CaretDown, SealCheck, UserCircle } from "@phosphor-icons/react/dist/ssr";
import { PageFrame } from "@/components/site-shell";
import { isLocale, type Locale } from "@/lib/i18n";
import { sampleReports } from "@/lib/sample-reports";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  return buildPageMetadata(
    locale,
    "/samples",
    "BaZi Sample Reports | Eastern Chart",
    "Read sample BaZi reports for career, relationships, and wealth to preview the depth, structure, and practical guidance inside Eastern Chart.",
  );
}

export default async function SamplesPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";

  return (
    <PageFrame locale={locale}>
      <main>
        <section className="px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
              <div>
                <p className="text-sm font-medium text-[#C7A76C]">Premium report previews</p>
                <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] text-[#F4EFE6] md:text-6xl">
                  Sample Reports — See what you&apos;ll get
                </h1>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-[#B8AEA0]">
                Three complete sample reports show the depth behind the paid experience: real chart structure, day master
                analysis, eight-plus advisory chapters, and practical guidance written for modern decisions.
              </p>
            </div>

            <div className="mt-12 grid gap-5">
              {sampleReports.map((report, index) => (
                <article
                  key={report.id}
                  className="overflow-hidden rounded-lg border border-[#302A22] bg-[#13110E]"
                >
                  <div className="grid gap-0 lg:grid-cols-[0.36fr_0.64fr]">
                    <aside className="border-b border-[#302A22] bg-[#17130F] p-6 lg:border-b-0 lg:border-r">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-mono text-sm text-[#C7A76C]">{report.label}</p>
                          <h2 className="mt-3 text-2xl font-semibold">{report.focus}</h2>
                        </div>
                        <div className="grid size-12 shrink-0 place-items-center rounded-md border border-[#C7A76C]/35 text-[#C7A76C]">
                          <UserCircle size={26} />
                        </div>
                      </div>
                      <dl className="mt-8 grid gap-4 text-sm">
                        <div>
                          <dt className="text-[#7F7568]">Persona</dt>
                          <dd className="mt-1 text-[#F4EFE6]">{report.persona}</dd>
                        </div>
                        <div>
                          <dt className="text-[#7F7568]">Birth data</dt>
                          <dd className="mt-1 text-[#F4EFE6]">{report.birthData}</dd>
                        </div>
                        <div>
                          <dt className="text-[#7F7568]">Day master</dt>
                          <dd className="mt-1 text-[#F4EFE6]">{report.dayMaster}</dd>
                        </div>
                      </dl>
                      <p className="mt-8 rounded-md border border-[#302A22] bg-[#0F0E0B] p-4 text-sm leading-7 text-[#F4EFE6]">
                        {report.hook}
                      </p>
                    </aside>

                    <div className="p-6 md:p-8">
                      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-sm font-medium text-[#C7A76C]">{report.keyword}</p>
                          <p className="mt-3 max-w-3xl text-base leading-8 text-[#B8AEA0]">{report.summary}</p>
                        </div>
                        <Link
                          href={`/${locale}/report`}
                          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#B6462E] px-4 py-3 text-sm font-semibold text-[#F4EFE6] transition hover:bg-[#c55239] active:translate-y-px"
                        >
                          Get Your Own Report
                          <ArrowRight size={17} />
                        </Link>
                      </div>

                      <div className="mt-8 grid gap-3 sm:grid-cols-4">
                        {Object.entries(report.pillars).map(([pillar, value]) => (
                          <div key={pillar} className="rounded-md border border-[#302A22] bg-[#0F0E0B] p-4">
                            <p className="text-xs uppercase tracking-[0.18em] text-[#7F7568]">{pillar}</p>
                            <p className="mt-2 text-xl font-semibold text-[#F4EFE6]">{value}</p>
                          </div>
                        ))}
                      </div>

                      <section className="mt-8">
                        <h3 className="flex items-center gap-2 text-lg font-semibold">
                          <SealCheck size={20} className="text-[#C7A76C]" />
                          Report preview
                        </h3>
                        <div className="mt-5 grid gap-4">
                          {[report.dayMasterAnalysis, ...report.sections.slice(0, 3)].map((section) => (
                            <div key={section.title} className="rounded-md border border-[#302A22] p-5">
                              <h4 className="text-base font-semibold text-[#F4EFE6]">{section.title}</h4>
                              <p className="mt-3 text-sm leading-7 text-[#B8AEA0]">{section.content}</p>
                            </div>
                          ))}
                        </div>
                      </section>

                      <details className="mt-6 rounded-md border border-[#302A22] bg-[#0F0E0B] p-5" open={index === 0}>
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-[#F4EFE6]">
                          Complete report
                          <CaretDown size={18} className="text-[#C7A76C]" />
                        </summary>
                        <div className="mt-6 grid gap-7">
                          <section>
                            <h4 className="text-base font-semibold text-[#C7A76C]">Five elements</h4>
                            <div className="mt-4 grid gap-3 md:grid-cols-2">
                              {report.fiveElements.map((item) => (
                                <div key={item.name} className="rounded-md border border-[#302A22] p-4">
                                  <p className="font-semibold">{item.name}</p>
                                  <p className="mt-2 text-sm leading-7 text-[#B8AEA0]">{item.reading}</p>
                                </div>
                              ))}
                            </div>
                          </section>
                          <section>
                            <h4 className="text-base font-semibold text-[#C7A76C]">Ten gods</h4>
                            <div className="mt-4 grid gap-3 md:grid-cols-2">
                              {report.tenGods.map((item) => (
                                <div key={item.label} className="rounded-md border border-[#302A22] p-4">
                                  <p className="font-semibold">{item.label}</p>
                                  <p className="mt-2 text-sm leading-7 text-[#B8AEA0]">{item.reading}</p>
                                </div>
                              ))}
                            </div>
                          </section>
                          <section>
                            <h4 className="text-base font-semibold text-[#C7A76C]">Deep reading</h4>
                            <div className="mt-4 grid gap-4">
                              {report.sections.map((section) => (
                                <div key={section.title} className="rounded-md border border-[#302A22] p-5">
                                  <h5 className="text-base font-semibold">{section.title}</h5>
                                  <p className="mt-3 text-sm leading-7 text-[#B8AEA0]">{section.content}</p>
                                </div>
                              ))}
                            </div>
                          </section>
                          <section className="rounded-md border border-[#C7A76C]/35 bg-[#17130F] p-5">
                            <h4 className="text-base font-semibold text-[#C7A76C]">Premium insight</h4>
                            <p className="mt-3 text-sm leading-7 text-[#B8AEA0]">{report.premiumInsight}</p>
                          </section>
                          <section className="rounded-md border border-[#302A22] p-5">
                            <h4 className="text-base font-semibold">{report.marketing.headline}</h4>
                            <p className="mt-3 text-sm leading-7 text-[#B8AEA0]">{report.marketing.body}</p>
                            <p className="mt-3 text-sm leading-7 text-[#F4EFE6]">{report.marketing.cta}</p>
                            <p className="mt-5 text-xs leading-6 text-[#7F7568]">{report.disclaimer}</p>
                          </section>
                        </div>
                      </details>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#302A22] px-5 py-16 md:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-lg border border-[#302A22] bg-[#17130F] p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="text-sm font-medium text-[#C7A76C]">$19.99 — Unlock Your Deep Report</p>
              <h2 className="mt-3 text-3xl font-semibold">Turn your own birth data into a complete paid report.</h2>
            </div>
            <Link
              href={`/${locale}/report`}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#B6462E] px-5 py-3 text-sm font-semibold text-[#F4EFE6] transition hover:bg-[#c55239] active:translate-y-px"
            >
              Get Your Own Report
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
