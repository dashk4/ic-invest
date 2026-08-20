"use client";

import { SectionHead } from "./ui/SectionHead";
import { RollText } from "./ui/RollText";
import { useLocale, pick } from "@/lib/locale";

export function InsightsHeading() {
  const { locale } = useLocale();

  return (
    <SectionHead
      eyebrow={pick(locale, "Мэдээлэл ба судалгаа", "News & insights")}
      title={pick(locale, "Сүүлийн үеийн мэдээ", "Latest updates")}
      aside={
        <a
          href={`https://ic-invest.mn/${locale}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group eyebrow inline-flex items-center gap-2 text-fg lg:justify-self-end"
        >
          <RollText hoverClassName="text-accent">
            {pick(locale, "Бүгдийг үзэх", "View all")}
          </RollText>
          <span className="transition-transform duration-500 ease-out group-hover:translate-x-1.5">
            →
          </span>
        </a>
      }
    />
  );
}
