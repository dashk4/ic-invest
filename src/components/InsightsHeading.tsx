"use client";

import { SectionHead } from "./ui/SectionHead";
import { useLocale, pick } from "@/lib/locale";

export function InsightsHeading() {
  const { locale } = useLocale();

  return (
    <SectionHead
      eyebrow={pick(locale, "Мэдээлэл ба судалгаа", "News & insights")}
      title={pick(locale, "Сүүлийн үеийн мэдээ", "Latest updates")}
    />
  );
}
