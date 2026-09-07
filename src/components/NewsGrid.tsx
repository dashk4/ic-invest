"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "./ui/Reveal";
import { useLocale, pick } from "@/lib/locale";
import type { NewsItem } from "@/lib/api";

const MotionLink = motion.create(Link);

const MN_MONTHS = [
  "1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар",
  "7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар",
];

const EN_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Deterministic on purpose: Intl month names differ between Node and the
 *  browser for mn-MN, which produces a hydration mismatch. */
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
      <Reveal delay={0.15} className="mt-16 border-t hairline pt-10 t-body text-fg-muted">
        {pick(locale, "Мэдээ удахгүй нэмэгдэнэ.", "News coming soon.")}
      </Reveal>
    );
  }

  return (
    <div className="mt-12 grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {news.slice(0, 6).map((item, i) => (
        <MotionLink
          key={item.id}
          href={`/news/${item.id}`}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="surface-card group flex min-h-[21rem] flex-col rounded-[1.5rem] p-7 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-accent/40 md:p-8"
        >
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="brand-signal h-2 w-2 rounded-full" />
            <span className="eyebrow text-fg-subtle">
              {formatDate(item.created_at ?? item.publish_date, locale)}
            </span>
          </div>
          <h3 className="font-news mt-7 line-clamp-4 text-balance text-[1.35rem] leading-[1.28] text-fg md:text-[1.5rem]">
            {item.title}
          </h3>
          <p className="font-news t-small mt-4 line-clamp-3 text-pretty text-fg-muted">
            {item.content}
          </p>
          <span
            aria-hidden
            className="brand-card-arrow mt-auto flex h-10 w-10 translate-y-1 items-center justify-center self-end rounded-full transition-all duration-500 group-hover:translate-x-1"
          >
            →
          </span>
        </MotionLink>
      ))}
    </div>
  );
}
