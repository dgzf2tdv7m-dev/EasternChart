import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

const GUMROAD_PRODUCT_URL = "https://gumroad.com/l/xqubii";
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

export function PricingGrid({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const dict = getDictionary(locale);

  return (
    <section id="pricing" className={compact ? "" : "px-5 py-24 md:px-8 md:py-32"}>
      <div className={compact ? "" : "mx-auto max-w-7xl"}>
        {!compact && (
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-semibold leading-tight md:text-5xl">{dict.pricing.title}</h2>
            <p className="mt-5 text-lg leading-8 text-[#B8AEA0]">{dict.pricing.body}</p>
          </div>
        )}
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.12fr_0.98fr]">
          {dict.pricing.plans.map((plan, index) => (
            <article
              key={plan.name}
              className={`rounded-lg border p-6 transition hover:-translate-y-1 ${
                index === 1
                  ? "border-[#B6462E]/80 bg-[#1A1511] shadow-[0_20px_80px_rgba(182,70,46,0.14)]"
                  : "border-[#302A22] bg-[#13110E]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <CheckCircle size={22} className={index === 1 ? "text-[#C7A76C]" : "text-[#B8AEA0]"} />
              </div>
              <p className="mt-7 font-mono text-4xl text-[#C7A76C]">{plan.price}</p>
              <p className="mt-5 min-h-24 text-sm leading-6 text-[#B8AEA0]">{plan.body}</p>
              <a
                href={index === 1 ? GUMROAD_PRODUCT_URL : `/${locale}${index === 0 ? "/free-chart" : "/report"}`}
                rel={index === 1 ? "noopener noreferrer" : undefined}
                target={index === 1 ? "_blank" : undefined}
                style={index === 1 ? directBuyStyle : undefined}
                className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-semibold transition active:translate-y-px ${
                  index === 1
                    ? "bg-[#B6462E] text-[#F4EFE6] hover:bg-[#c55239]"
                    : "border border-[#302A22] text-[#F4EFE6] hover:border-[#B6462E]/70"
                }`}
              >
                {index === 1 ? "立即购买" : index === 0 ? dict.nav.cta : dict.report.buy}
              </a>
            </article>
          ))}
        </div>
        <p className="mt-5 text-sm text-[#7F7569]">{dict.pricing.pay}</p>
      </div>
    </section>
  );
}
