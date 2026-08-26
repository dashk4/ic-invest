"use client";

import { motion } from "framer-motion";
import { Reveal } from "./ui/Reveal";
import { ScrollBeam } from "./ui/ScrollBeam";
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
    <div className="mt-16 max-w-3xl">
      {/* chronological list, so this is where the scroll-beam actually
          means something — a timeline of real dated posts, not a grid */}
      <ScrollBeam>
        <div className="space-y-2">
          {news.slice(0, 6).map((item, i) => (
            <motion.a
              key={item.id}
              href={`https://ic-invest.mn/${locale}/content/${item.id}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative block border-b hairline py-8 pl-10"
            >
              <span
                aria-hidden
                className="absolute -left-[6.5px] top-9 h-3.5 w-3.5 rounded-full border-2 border-accent bg-surface"
              />
              <span className="eyebrow text-fg-subtle">
                {formatDate(item.created_at ?? item.publish_date, locale)}
              </span>
              <h3 className="t-h3 mt-2 text-balance text-fg">
                <span className="link-underline">{item.title}</span>
              </h3>
              <p className="t-small mt-2 max-w-prose text-pretty text-fg-muted">
                {item.content}
              </p>
            </motion.a>
          ))}
        </div>
      </ScrollBeam>
    </div>
  );
}
