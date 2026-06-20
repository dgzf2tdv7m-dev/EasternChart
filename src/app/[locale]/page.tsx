import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain, GlobeHemisphereEast, LockKey, TreeStructure } from "@phosphor-icons/react/dist/ssr";
import { PageFrame } from "@/components/site-shell";
import { PricingGrid } from "@/components/pricing-grid";
import { Reveal } from "@/components/reveal";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const dict = getDictionary(locale);
  const iconSet = [TreeStructure, Brain, GlobeHemisphereEast];
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Eastern Chart",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}/${locale}`,
    description: dict.hero.body,
    offers: [
      { "@type": "Offer", name: "Free BaZi Chart", price: "0", priceCurrency: "USD" },
      { "@type": "Offer", name: "Deep Report", price: "19.99", priceCurrency: "USD" },
    ],
  };

  return (
    <PageFrame locale={locale}>
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <section className="px-5 pb-20 pt-14 md:px-8 md:pb-28 md:pt-20">
          <div className="mx-auto grid min-h-[calc(100dvh-8rem)] max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <Reveal>
              <p className="mb-5 text-sm font-medium text-[#C7A76C]">{dict.hero.eyebrow}</p>
              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] text-[#F4EFE6] md:text-6xl">
                {dict.hero.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#B8AEA0]">{dict.hero.body}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/${locale}/free-chart`}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#B6462E] px-5 py-3 text-sm font-semibold text-[#F4EFE6] transition hover:bg-[#c55239] active:translate-y-px"
                >
                  {dict.hero.primary}
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href={`/${locale}/samples`}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-[#302A22] px-5 py-3 text-sm font-semibold text-[#F4EFE6] transition hover:border-[#B6462E]/70 active:translate-y-px"
                >
                  {dict.hero.secondary}
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="relative">
              <div className="relative aspect-[16/11] overflow-hidden rounded-lg border border-[#302A22] bg-[#13110E] shadow-[0_28px_120px_rgba(0,0,0,0.45)]">
                <Image
                  src="/images/report-ritual.png"
                  alt={dict.hero.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  priority
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-[#302A22] px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr]">
            <Reveal>
              <h2 className="max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">{dict.value.title}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#B8AEA0]">{dict.value.body}</p>
            </Reveal>
            <div className="grid gap-4 md:grid-cols-2">
              {dict.value.items.map((item, index) => {
                const Icon = iconSet[index];
                return (
                  <Reveal key={item.title} delay={index * 0.05} className={index === 0 ? "md:row-span-2" : ""}>
                    <article className="h-full rounded-lg border border-[#302A22] bg-[#13110E] p-6 transition hover:border-[#B6462E]/60">
                      <Icon size={28} className="text-[#C7A76C]" />
                      <h3 className="mt-8 text-xl font-semibold">{item.title}</h3>
                      <p className="mt-4 text-sm leading-7 text-[#B8AEA0]">{item.body}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2 className="max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">{dict.samples.title}</h2>
            </Reveal>
            <div className="mt-12 grid gap-4 lg:grid-cols-[1.1fr_0.9fr_1fr]">
              {dict.samples.cards.map((card, index) => (
                <Reveal key={card.lang} delay={index * 0.05}>
                  <article className={`rounded-lg border border-[#302A22] p-6 ${index === 1 ? "bg-[#1A1511]" : "bg-[#13110E]"}`}>
                    <p className="font-mono text-sm text-[#C7A76C]">{card.lang}</p>
                    <h3 className="mt-8 text-2xl font-semibold">{card.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#B8AEA0]">{card.body}</p>
                    <div className="mt-8 flex items-center gap-2 text-sm text-[#F4EFE6]">
                      <LockKey size={18} className="text-[#B6462E]" />
                      {dict.samples.preview}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <PricingGrid locale={locale as Locale} />
      </main>
    </PageFrame>
  );
}
