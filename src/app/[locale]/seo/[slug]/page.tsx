import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Question, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/site-shell";
import { isLocale } from "@/lib/i18n";
import { getEasternSeoPage, easternSeoPages } from "@/lib/seo-pages";
import { SITE_URL } from "@/lib/seo";

type SeoPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return easternSeoPages.map((page) => ({ locale: "zh-Hans", slug: page.slug }));
}

export async function generateMetadata({ params }: SeoPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getEasternSeoPage(slug);
  if (locale !== "zh-Hans" || !page) return {};

  const url = `${SITE_URL}/zh-Hans/seo/${page.slug}`;
  return {
    title: `${page.title} | Eastern Chart`,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: "Eastern Chart",
      type: "article",
      images: [{ url: "/images/report-ritual.png", width: 1200, height: 800, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/images/report-ritual.png"],
    },
  };
}

export default async function EasternSeoArticle({ params }: SeoPageProps) {
  const { locale: rawLocale, slug } = await params;
  if (rawLocale !== "zh-Hans" || !isLocale(rawLocale)) notFound();

  const page = getEasternSeoPage(slug);
  if (!page) notFound();

  const related = easternSeoPages.filter((item) => item.slug !== page.slug).slice(0, 4);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: page.title,
        description: page.description,
        inLanguage: "zh-Hans",
        url: `${SITE_URL}/zh-Hans/seo/${page.slug}`,
        about: page.keyword,
        publisher: { "@type": "Organization", name: "Eastern Chart", url: SITE_URL },
      },
      {
        "@type": "WebApplication",
        name: "Eastern Chart 免费八字排盘",
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Web",
        url: `${SITE_URL}/zh-Hans/free-chart`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <PageFrame locale="zh-Hans">
      <main className="px-5 py-14 md:px-8 md:py-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <article className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_0.28fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-md border border-[#302A22] bg-[#13110E] px-3 py-2 text-sm text-[#C7A76C]">
              <Compass size={16} />
              {page.keyword}
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-[#F4EFE6] md:text-6xl">
              {page.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-[#B8AEA0]">{page.summary}</p>

            <div className="mt-10 grid gap-5">
              {page.sections.map((section) => (
                <section key={section.title} className="rounded-lg border border-[#302A22] bg-[#13110E] p-6">
                  <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#F4EFE6]">
                    <Sparkle size={22} className="text-[#C7A76C]" />
                    {section.title}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-[#B8AEA0]">{section.body}</p>
                </section>
              ))}
            </div>

            <section className="mt-8 rounded-lg border border-[#302A22] bg-[#17130F] p-6">
              <h2 className="text-2xl font-semibold">常见问题</h2>
              <div className="mt-5 grid gap-4">
                {page.faq.map((item) => (
                  <div key={item.question} className="rounded-md border border-[#302A22] bg-[#0F0E0B] p-5">
                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                      <Question size={20} className="text-[#C7A76C]" />
                      {item.question}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#B8AEA0]">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-lg border border-[#302A22] bg-[#13110E] p-5">
              <h2 className="text-xl font-semibold">先生成你的命盘</h2>
              <p className="mt-3 text-sm leading-7 text-[#B8AEA0]">
                输入出生日期、时间和地点，先查看四柱、五行比例和日主摘要，再决定是否解锁完整报告。
              </p>
              <Link
                href="/zh-Hans/free-chart"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#B6462E] px-4 py-3 text-sm font-semibold text-[#F4EFE6] transition hover:bg-[#c55239]"
              >
                免费八字排盘
                <ArrowRight size={17} />
              </Link>
            </section>
            <section className="rounded-lg border border-[#302A22] bg-[#13110E] p-5">
              <h2 className="text-xl font-semibold">相关主题</h2>
              <div className="mt-4 grid gap-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/zh-Hans/seo/${item.slug}`}
                    className="rounded-md border border-[#302A22] p-3 text-sm leading-6 text-[#B8AEA0] transition hover:border-[#B6462E]/70 hover:text-[#F4EFE6]"
                  >
                    {item.keyword}
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </article>
      </main>
    </PageFrame>
  );
}
