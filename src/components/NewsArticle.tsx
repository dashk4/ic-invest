"use client";

import Image from "next/image";
import { useLocale, pick } from "@/lib/locale";
import type { NewsItem } from "@/lib/api";

const MN_MONTHS = [
  "1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар",
  "7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар",
];

const EN_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Same deterministic formatter as NewsGrid — Intl month names differ
 *  between Node and the browser for mn-MN, which produces a hydration
 *  mismatch in a client component. */
function formatDate(value: string | undefined, locale: "mn" | "en") {
  if (!value) return "";
  const iso = value.includes("T") ? value : value.replace(" ", "T");
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const day = d.getUTCDate();
  const month = d.getUTCMonth();
  const year = d.getUTCFullYear();
  return locale === "en"
    ? `${EN_MONTHS[month]} ${day}, ${year}`
    : `${year} оны ${MN_MONTHS[month]}ын ${day}`;
}

export function NewsArticle({
  itemMn,
  itemEn,
}: {
  itemMn: (NewsItem & { pictureUrl: string | null }) | null;
  itemEn: (NewsItem & { pictureUrl: string | null }) | null;
}) {
  const { locale } = useLocale();
  // The CMS doesn't pair MN/EN articles under a shared id — they're
  // independent per-language lists, so show whichever locale actually has
  // this id rather than assuming a translation always exists.
  const item = pick(locale, itemMn, itemEn) ?? itemMn ?? itemEn;
  if (!item) return null;

  const dateValue = item.created_at ?? item.publish_date ?? item.published_at;

  return (
    <>
      {dateValue && <p className="eyebrow mt-10 text-accent">{formatDate(dateValue, locale)}</p>}
      <h1 className="t-h2 mt-4 text-balance text-fg">{item.title}</h1>

      {item.pictureUrl && (
        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border hairline">
          <Image src={item.pictureUrl} alt={item.title} fill sizes="768px" className="object-cover" />
        </div>
      )}

      <div
        className="prose-news mt-10 max-w-none text-pretty t-body text-fg [&_a]:text-accent [&_a]:underline [&_a]:decoration-accent/40 [&_a:hover]:decoration-accent [&_li]:mt-1 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p+p]:mt-4 [&_strong]:font-semibold [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6"
        dangerouslySetInnerHTML={{ __html: item.content }}
      />
    </>
  );
}
