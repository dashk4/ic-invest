"use client";

import { Counter } from "./ui/Counter";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { useLocale, pick } from "@/lib/locale";

const STATS = [
  { value: 4, raw: false, mn: "Идэвхтэй хөрөнгө оруулалтын сан", en: "Active investment funds" },
  { value: 10, raw: false, mn: "Мэргэжлийн баг, ТУЗ-ийн хамт", en: "Professionals, board included" },
  { value: 2022, raw: true, mn: "СЗХ-ны тусгай зөвшөөрөл авсан", en: "Licensed by the FRC" },
];

export function Stats() {
  const { locale } = useLocale();

  return (
    <section className="theme-fade bg-surface">
      <div className="container-page py-20 md:py-24">
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-3">
          {STATS.map((s) => (
            <RevealItem
              key={s.mn}
              className="border-t hairline py-8 sm:border-l sm:border-t-0 sm:px-8 sm:py-0 sm:first:border-l-0 sm:first:pl-0"
            >
              <div className="t-numeral text-5xl text-fg md:text-6xl">
                {s.raw ? s.value : <Counter value={s.value} />}
              </div>
              <p className="t-small mt-4 max-w-[24ch] text-fg-muted">
                {pick(locale, s.mn, s.en)}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.15}>
          <p className="mt-14 max-w-3xl border-t hairline pt-6 text-[0.85rem] leading-relaxed text-fg-subtle">
            {pick(
              locale,
              "Санхүүгийн Зохицуулах Хорооноос 2022 оны 4 дүгээр сарын 6-нд олгосон тусгай зөвшөөрөл, гэрчилгээ №309/41.",
              "Special license granted by the Financial Regulatory Commission on 6 April 2022, certificate no. 309/41."
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
