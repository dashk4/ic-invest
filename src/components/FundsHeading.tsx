"use client";

import { SectionHead } from "./ui/SectionHead";
import { useLocale, pick } from "@/lib/locale";

export function FundsHeading() {
  const { locale } = useLocale();

  return (
    <SectionHead
      onDark
      eyebrow={pick(locale, "Хөрөнгө оруулалтын боломж", "Investment opportunities")}
      title={pick(locale, "Хөрөнгө оруулалтын сангууд", "Our funds")}
      aside={
        <p className="t-body max-w-sm text-pretty text-on-strong-muted">
          {pick(
            locale,
            "Хувийн болон хамтын хөрөнгө оруулалтын сангуудаас өөрийн зорилгод тохирсон стратегийг сонгоно уу.",
            "Choose the strategy that fits your goals from our private and collective investment funds."
          )}
        </p>
      }
    />
  );
}
