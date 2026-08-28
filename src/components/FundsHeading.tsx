"use client";

import { SectionHead } from "./ui/SectionHead";
import { useLocale, pick } from "@/lib/locale";

export function FundsHeading() {
  const { locale } = useLocale();

  return (
    <SectionHead
      onDark
      eyebrow={pick(locale, "Хөрөнгө оруулалтын боломж", "Investment opportunities")}
      title={pick(locale, "Хөрөнгө оруулалтын сан", "Our funds")}
      aside={
        <p className="t-body max-w-sm text-pretty text-on-strong-muted">
          {pick(
            locale,
            "Хөрөнгө оруулалтын зорилго, хугацаанд тохирох хөрөнгө оруулалтын санг сонгоно уу.",
            "Choose the investment fund that fits your goals and time horizon."
          )}
        </p>
      }
    />
  );
}
