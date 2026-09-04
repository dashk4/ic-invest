"use client";

import { Counter } from "./ui/Counter";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { useLocale, pick } from "@/lib/locale";

export type OverviewStats = {
  activeFunds: number;
};

const FOUNDED_YEAR = 2021;

export function Stats({ stats }: { stats: OverviewStats }) {
  const { locale } = useLocale();

  const cards = [
    {
      key: "founded",
      value: FOUNDED_YEAR,
      mn: "Байгуулагдсан он",
      en: "Founded",
    },
    {
      key: "license",
      value: pick(locale, "СЗХ", "FRC"),
      mn: "Тусгай зөвшөөрөлтэй",
      en: "Licensed by the FRC",
    },
    {
      key: "funds",
      value: stats.activeFunds,
      prefix: "+",
      mn: "Сангийн бүтээгдэхүүн",
      en: "Fund products",
    },
  ];

  return (
    <section className="theme-fade relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,color-mix(in_srgb,var(--brand-navy)_7%,transparent),transparent_30rem)]" />
      <div className="container-page section-y relative">
        <Reveal>
          <h2 className="max-w-[22ch] text-balance font-display text-3xl leading-tight text-fg md:text-4xl">
            {pick(
              locale,
              "Хөрөнгө оруулалтын мэргэжлийн түнш",
              "Your professional investment partner",
            )}
          </h2>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cards.map((c) => (
            <RevealItem
              key={c.key}
              className="surface-card group relative flex flex-col overflow-hidden rounded-[1.5rem] p-7 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-accent/35"
            >
              <div className="t-numeral text-4xl text-fg md:text-5xl">
                {c.key === "funds" ? (
                  <Counter value={c.value as number} prefix={c.prefix} />
                ) : c.key === "founded" ? (
                  c.value
                ) : (
                  <span className="text-accent">{c.value}</span>
                )}
              </div>
              <p className="t-small mt-4 max-w-[24ch] text-pretty uppercase tracking-[0.08em] text-fg-muted">
                {pick(locale, c.mn, c.en)}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
