"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Hexagon, Sparkle } from "@phosphor-icons/react";
import { calculateChart, type ChartResult } from "@/lib/chart";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

export function FreeChartForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale).freeChart;
  const [form, setForm] = useState({
    birthDate: "1992-08-17",
    birthTime: "09:30",
    birthPlace: "Seoul",
    gender: dict.genderOptions[0],
  });
  const [result, setResult] = useState<ChartResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fieldsComplete = useMemo(
    () => Boolean(form.birthDate && form.birthTime && form.birthPlace),
    [form.birthDate, form.birthPlace, form.birthTime],
  );

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!fieldsComplete) {
      setError(dict.error);
      return;
    }

    setError("");
    setLoading(true);
    window.setTimeout(() => {
      setResult(calculateChart(form));
      setLoading(false);
    }, 360);
  }

  function formatTemplate(template: string, values: Record<string, string>) {
    return Object.entries(values).reduce((text, [key, value]) => text.replaceAll(`{${key}}`, value), template);
  }

  function displayResultText(result: ChartResult) {
    const dayMaster = dict.stemNames[result.dayMaster] ?? result.dayMaster;
    const strongest = dict.elementNames[result.strongestElement] ?? result.strongestElement;
    const quietest = dict.elementNames[result.quietestElement] ?? result.quietestElement;
    const values = { dayMaster, strongest, quietest };

    return {
      summary: formatTemplate(dict.summaryTemplate, values),
      tips: dict.tipsTemplates.map((template) => formatTemplate(template, values)),
    };
  }

  function reportHref() {
    const query = new URLSearchParams({
      birthDate: form.birthDate,
      birthTime: form.birthTime,
      birthPlace: form.birthPlace,
      gender: form.gender,
    });

    return `/${locale}/report?${query.toString()}`;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <form onSubmit={submit} className="rounded-lg border border-[#302A22] bg-[#13110E] p-5 md:p-7">
        <div className="grid gap-5">
          <Field label={dict.birthDate}>
            <input
              className="h-12 rounded-md border border-[#302A22] bg-[#0F0E0B] px-3 text-[#F4EFE6] outline-none transition focus:border-[#B6462E]"
              type="date"
              value={form.birthDate}
              onChange={(event) => update("birthDate", event.target.value)}
            />
          </Field>
          <Field label={dict.birthTime}>
            <input
              className="h-12 rounded-md border border-[#302A22] bg-[#0F0E0B] px-3 text-[#F4EFE6] outline-none transition focus:border-[#B6462E]"
              type="time"
              value={form.birthTime}
              onChange={(event) => update("birthTime", event.target.value)}
            />
          </Field>
          <Field label={dict.birthPlace}>
            <input
              className="h-12 rounded-md border border-[#302A22] bg-[#0F0E0B] px-3 text-[#F4EFE6] outline-none transition placeholder:text-[#7F7569] focus:border-[#B6462E]"
              value={form.birthPlace}
              onChange={(event) => update("birthPlace", event.target.value)}
              placeholder={dict.placePlaceholder}
            />
          </Field>
          <Field label={dict.gender}>
            <select
              className="h-12 rounded-md border border-[#302A22] bg-[#0F0E0B] px-3 text-[#F4EFE6] outline-none transition focus:border-[#B6462E]"
              value={form.gender}
              onChange={(event) => update("gender", event.target.value)}
            >
              {dict.genderOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
        </div>
        {error && <p className="mt-4 text-sm text-[#ff9a86]">{error}</p>}
        <button className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#B6462E] px-4 py-3 text-sm font-semibold text-[#F4EFE6] transition hover:bg-[#c55239] active:translate-y-px">
          {loading ? dict.loading : dict.submit}
          <ArrowRight size={18} />
        </button>
      </form>

      <section className="rounded-lg border border-[#302A22] bg-[#13110E] p-5 md:p-7">
        {!result && (
          <div className="flex min-h-[420px] flex-col justify-center">
            <Hexagon size={38} className="text-[#C7A76C]" />
            <h2 className="mt-6 text-2xl font-semibold">{dict.resultTitle}</h2>
            <p className="mt-4 max-w-md leading-7 text-[#B8AEA0]">
              {dict.body}
            </p>
          </div>
        )}
        {result && (
          <div>
            <h2 className="text-2xl font-semibold">{dict.resultTitle}</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {result.pillars.map((pillar, index) => (
                <div key={`${pillar.stem}-${index}`} className="rounded-md border border-[#302A22] p-4">
                  <p className="text-xs text-[#B8AEA0]">{dict.pillars[index]}</p>
                  <p className="mt-3 text-xl font-semibold">{dict.stemNames[pillar.stem] ?? pillar.stem}</p>
                  <p className="font-mono text-sm text-[#C7A76C]">{dict.branchNames[pillar.branch] ?? pillar.branch}</p>
                </div>
              ))}
            </div>
            <h3 className="mt-8 text-lg font-semibold">{dict.elementTitle}</h3>
            <div className="mt-4 grid gap-3">
              {Object.entries(result.elements).map(([element, value]) => (
                <div key={element} className="grid grid-cols-[72px_1fr_44px] items-center gap-3 text-sm">
                  <span className="text-[#B8AEA0]">{dict.elementNames[element] ?? element}</span>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#302A22]">
                    <div className="h-full rounded-full bg-[#B6462E]" style={{ width: `${value}%` }} />
                  </div>
                  <span className="font-mono text-[#C7A76C]">{value}%</span>
                </div>
              ))}
            </div>
            <h3 className="mt-8 text-lg font-semibold">{dict.summaryTitle}</h3>
            <p className="mt-3 leading-7 text-[#B8AEA0]">{displayResultText(result).summary}</p>
            <h3 className="mt-8 text-lg font-semibold">{dict.tipsTitle}</h3>
            <div className="mt-4 grid gap-3">
              {displayResultText(result).tips.map((tip) => (
                <p key={tip} className="flex gap-3 rounded-md border border-[#302A22] p-4 text-sm leading-6 text-[#B8AEA0]">
                  <Sparkle className="mt-0.5 shrink-0 text-[#C7A76C]" size={18} />
                  {tip}
                </p>
              ))}
            </div>
            <Link
              href={reportHref()}
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#B6462E] px-4 py-3 text-sm font-semibold text-[#F4EFE6] transition hover:bg-[#c55239] active:translate-y-px"
            >
              {dict.unlock}
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm text-[#F4EFE6]">
      <span>{label}</span>
      {children}
    </label>
  );
}
