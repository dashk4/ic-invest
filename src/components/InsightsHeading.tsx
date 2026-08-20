"use client";

import { Reveal } from "./ui/Reveal";
import { RollText } from "./ui/RollText";
import { SplitReveal } from "./ui/SplitReveal";
import { useLocale, pick } from "@/lib/locale";

export function InsightsHeading() {
  const { locale } = useLocale();

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <Reveal>
          <p className="eyebrow text-accent">
            {pick(locale, "Мэдээлэл ба судалгаа", "News & Insights")}
          </p>
        </Reveal>
        <h2 className="font-display mt-4 max-w-lg text-balance text-4xl font-medium leading-tight text-fg md:text-5xl">
          <SplitReveal text={pick(locale, "Сүүлийн үеийн мэдээ", "Latest updates")} />
        </h2>
      </div>
      <Reveal delay={0.1}>
        <a
          href={`https://ic-invest.mn/${locale}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group eyebrow inline-flex items-center gap-2 text-fg"
        >
          <RollText hoverClassName="text-accent">{pick(locale, "Бүгдийг үзэх", "View all")}</RollText>
          <span className="transition-transform duration-500 ease-out group-hover:translate-x-1.5">→</span>
        </a>
      </Reveal>
    </div>
  );
}
