"use client";

import { Reveal } from "./ui/Reveal";
import { SplitReveal } from "./ui/SplitReveal";
import { useLocale, pick } from "@/lib/locale";

export function FundsHeading() {
  const { locale } = useLocale();

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <Reveal>
          <p className="eyebrow text-bronze-light">
            {pick(locale, "Хөрөнгө оруулалтын боломж", "Investment Opportunities")}
          </p>
        </Reveal>
        <h2 className="font-display mt-4 max-w-lg text-balance text-4xl font-medium leading-tight md:text-5xl">
          <SplitReveal text={pick(locale, "Хөрөнгө оруулалтын сангууд", "Investment Funds")} />
        </h2>
      </div>
      <Reveal delay={0.1}>
        <p className="max-w-sm text-base leading-relaxed text-on-strong-muted">
          {pick(
            locale,
            "Хувийн болон хамтын хөрөнгө оруулалтын сангуудаас өөрт тохирсон стратегийг сонгоно уу.",
            "Choose the strategy that fits you from our private and collective investment funds."
          )}
        </p>
      </Reveal>
    </div>
  );
}
