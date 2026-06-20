import Link from "next/link";
import { ChartPolar, SealCheck } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/lib/i18n";
import { getDictionary, localeLabels, locales } from "@/lib/i18n";

export function SiteHeader({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const link = (path = "") => `/${locale}${path}`;

  return (
    <header className="sticky top-0 z-40 border-b border-[#302A22]/80 bg-[#0F0E0B]/88 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href={link()} className="flex items-center gap-3 text-sm font-semibold text-[#F4EFE6]">
          <span className="grid size-8 place-items-center rounded-md border border-[#C7A76C]/40 text-[#C7A76C]">
            <ChartPolar size={18} weight="regular" />
          </span>
          Eastern Chart
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-[#B8AEA0] md:flex">
          <Link className="transition hover:text-[#F4EFE6]" href={link()}>
            {dict.nav.home}
          </Link>
          <Link className="transition hover:text-[#F4EFE6]" href={link("/free-chart")}>
            {dict.nav.freeChart}
          </Link>
          <Link className="transition hover:text-[#F4EFE6]" href={link("/samples")}>
            {dict.nav.samples}
          </Link>
          <Link className="transition hover:text-[#F4EFE6]" href={link("/report")}>
            {dict.nav.report}
          </Link>
          <Link className="transition hover:text-[#F4EFE6]" href={link("/pricing")}>
            {dict.nav.pricing}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden gap-1 text-xs text-[#B8AEA0] sm:flex">
            {locales.map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                className={`rounded-md px-2 py-1 transition ${
                  item === locale ? "bg-[#302A22] text-[#F4EFE6]" : "hover:text-[#F4EFE6]"
                }`}
              >
                {localeLabels[item]}
              </Link>
            ))}
          </div>
          <Link
            href={link("/free-chart")}
            className="rounded-md bg-[#B6462E] px-4 py-2 text-sm font-semibold text-[#F4EFE6] transition hover:bg-[#c55239] active:translate-y-px"
          >
            {dict.nav.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <footer className="border-t border-[#302A22] px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-[#B8AEA0] md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 text-[#F4EFE6]">
          <SealCheck size={20} className="text-[#C7A76C]" />
          <span>Eastern Chart</span>
        </div>
        <p className="max-w-xl">{dict.footer.body}</p>
      </div>
    </footer>
  );
}

export function PageFrame({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#0F0E0B] text-[#F4EFE6]">
      <SiteHeader locale={locale} />
      {children}
      <SiteFooter locale={locale} />
    </div>
  );
}
