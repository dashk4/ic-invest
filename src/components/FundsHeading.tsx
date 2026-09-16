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
            "Өөрийн санхүүгийн зорилго, хөрөнгө оруулалтын хугацаа, эрсдэлийн түвшинд нийцсэн сангийн бүтээгдэхүүнтэй танилцаарай.",
            "Explore fund products matched to your financial goals, investment horizon and risk tolerance."
          )}
        </p>
      }
    />
  );
}
