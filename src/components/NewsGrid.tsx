"use client";

import { motion } from "framer-motion";
import { Reveal } from "./ui/Reveal";
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
    <div className="mt-16 border-t hairline">
      {news.slice(0, 3).map((item, i) => (
        <motion.a
          key={item.id}
          href={`https://ic-invest.mn/${locale}/content/${item.id}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="group grid grid-cols-1 gap-y-3 border-b hairline py-9 md:grid-cols-12 md:gap-x-10"
        >
          <span className="eyebrow pt-2 text-fg-subtle md:col-span-2">
            {formatDate(item.created_at ?? item.publish_date, locale)}
          </span>

          <h3 className="t-h3 text-balance text-fg md:col-span-7">
            <span className="link-underline">{item.title}</span>
          </h3>

          <p className="t-small text-pretty text-fg-muted md:col-span-3">{item.content}</p>
        </motion.a>
      ))}
    </div>
  );
}
