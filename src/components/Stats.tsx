"use client";

import { Counter } from "./ui/Counter";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { useLocale, pick } from "@/lib/locale";

const STATS = [
  {
    value: 4,
    mn: "Идэвхлэг хөрөнгө оруулалтын сан",
    en: "Active investment funds",
  },
  {
    value: 10,
    mn: "Гишүүнтэй мэргэжлийн баг, ТУЗ хамт",
    en: "Team members, including the board",
  },
  {
    value: 1,
    mn: "Монголын анхны орон нутгийн ETF сан",
    en: "First local ETF fund in Mongolia",
  },
];

export function Stats() {
  const { locale } = useLocale();

  return (
    <section className="theme-fade bg-surface py-16 md:py-20">
      <div className="container-page">
        <RevealGroup className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {STATS.map((s) => (
            <RevealItem
              key={s.mn}
              className="card-lift glow-ring rounded-3xl border hairline bg-surface-alt/60 p-8"
            >
              <div className="font-display bg-gradient-to-br from-fg to-fg/60 bg-clip-text text-5xl font-semibold text-transparent md:text-6xl">
                <Counter value={s.value} />
              </div>
              <p className="mt-3 max-w-[240px] text-base leading-relaxed text-fg-muted">
                {pick(locale, s.mn, s.en)}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal delay={0.15} className="mt-6 rounded-2xl border hairline bg-surface-alt/40 px-6 py-4">
          <p className="text-sm leading-relaxed text-fg-subtle">
            {pick(
              locale,
              "Инвескор Ассет Менежмент ҮЦК — Санхүүгийн Зохицуулах Хорооноос 2022 оны 4-р сарын 6-нд тусгай зөвшөөрөл авсан (Гэрчилгээ №309/41).",
              "Invescore Asset Management LLC obtained a special license from the Financial Regulatory Commission on April 6, 2022 (Certificate No. 309/41)."
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
