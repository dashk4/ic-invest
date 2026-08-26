"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, PieChart, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { useLocale, pick } from "@/lib/locale";

const MotionLink = motion.create(Link);
const ICONS = [Briefcase, ShieldCheck, TrendingUp, Users, PieChart];

export type FundCardData = {
  sid: number;
  code: string;
  href: string;
  name: string;
  labelMn: string;
  labelEn: string;
  excerptMn: string;
  excerptEn: string;
  nav: number | null;
};

function formatNav(n: number) {
  const [whole, frac] = n.toFixed(2).split(".");
  return `${whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${frac}`;
}

export function FundsList({ funds }: { funds: FundCardData[] }) {
  const { locale } = useLocale();

  return (
    <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
      {funds.map((f, i) => {
        const blurb = pick(locale, f.excerptMn, f.excerptEn);
        const Icon = ICONS[i % ICONS.length];

        return (
          <MotionLink
            key={f.sid}
            href={f.href}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-[color:var(--c-line-strong)] bg-white/[0.03] p-8 transition-colors duration-500 hover:border-accent-on-dark/40 hover:bg-white/[0.05] md:p-9"
          >
            {/* oversized ghost numeral, purely decorative */}
            <span
              aria-hidden
              className="t-numeral pointer-events-none absolute -right-3 -top-6 select-none text-[7rem] leading-none text-on-strong/[0.04] transition-colors duration-500 group-hover:text-accent-on-dark/[0.08] md:text-[8.5rem]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* soft accent glow that blooms on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-accent-on-dark/0 blur-3xl transition-colors duration-700 group-hover:bg-accent-on-dark/20"
            />

            <div className="relative flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[color:var(--c-line-strong)] bg-white/[0.04] text-accent-on-dark transition-colors duration-500 group-hover:border-accent-on-dark/40 group-hover:bg-accent-on-dark/10">
                <Icon className="h-[19px] w-[19px]" strokeWidth={1.7} />
              </span>
              <span className="eyebrow text-on-strong-subtle">{f.code}</span>
            </div>

            <h3 className="t-h3 relative mt-6 text-on-strong">{f.name}</h3>
            <p className="eyebrow mt-2 text-on-strong-subtle">
              {pick(locale, f.labelMn, f.labelEn)}
            </p>

            <p className="t-small relative mt-4 max-w-prose text-pretty text-on-strong-muted">
              {blurb}
            </p>

            <div className="relative mt-auto flex items-end justify-between gap-4 pt-8">
              {f.nav != null ? (
                <span>
                  <span className="t-numeral block text-2xl text-on-strong">
                    {formatNav(f.nav)}₮
                  </span>
                  <span className="eyebrow mt-1 block text-on-strong-subtle">NAV</span>
                </span>
              ) : (
                <span className="eyebrow text-on-strong-subtle">
                  {pick(locale, "Дэлгэрэнгүй", "Learn more")}
                </span>
              )}
              <span
                aria-hidden
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--c-line-strong)] text-on-strong-subtle transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:border-accent-on-dark/40 group-hover:text-accent-on-dark"
              >
                →
              </span>
            </div>
          </MotionLink>
        );
      })}
    </div>
  );
}
