"use client";

import { RevealGroup, RevealItem, Reveal } from "./ui/Reveal";
import { RollText } from "./ui/RollText";
import { useLocale, pick } from "@/lib/locale";
import type { NewsItem } from "@/lib/api";

const MN_MONTHS = [
  "1-р сар",
  "2-р сар",
  "3-р сар",
  "4-р сар",
  "5-р сар",
  "6-р сар",
  "7-р сар",
  "8-р сар",
  "9-р сар",
  "10-р сар",
  "11-р сар",
  "12-р сар",
];

const EN_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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

export function NewsGrid({ mn, en }: { mn: NewsItem[]; en: NewsItem[] }) {
  const { locale } = useLocale();
  const news = locale === "en" && en.length > 0 ? en : mn;

  if (news.length === 0) {
    return (
      <Reveal delay={0.15} className="mt-14 border-t hairline pt-10 text-base text-fg-muted">
        {pick(locale, "Мэдээ удахгүй нэмэгдэнэ.", "News coming soon.")}
      </Reveal>
    );
  }

  return (
    <RevealGroup className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
      {news.slice(0, 3).map((item) => (
        <RevealItem key={item.id}>
          <a
            href={`https://ic-invest.mn/${locale}/content/${item.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full flex-col border-t hairline pt-6"
          >
            <span className="eyebrow text-fg-subtle">
              {formatDate(item.created_at ?? item.publish_date, locale)}
            </span>
            <h3 className="font-display mt-4 text-xl font-medium leading-snug text-fg transition-colors group-hover:text-accent">
              {item.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-fg-muted">
              {item.content}
            </p>
            <span className="eyebrow mt-6 inline-flex items-center gap-2 text-fg-subtle">
              <RollText hoverClassName="text-accent">
                {pick(locale, "Дэлгэрэнгүй", "Read more")}
              </RollText>
              <span className="transition-transform duration-500 ease-out group-hover:translate-x-1.5">→</span>
            </span>
          </a>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
