"use client";

import { motion } from "framer-motion";
import { useLocale, pick } from "@/lib/locale";

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
    <div className="mt-16 border-t border-[color:var(--c-line-strong)]">
      {funds.map((f, i) => {
        const blurb = pick(locale, f.excerptMn, f.excerptEn);
        return (
          <motion.a
            key={f.sid}
            href={f.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="group relative block border-b border-[color:var(--c-line-strong)]"
          >
            {/* wash that sweeps in on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[color:var(--c-card)] transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
            />

            <div className="relative grid grid-cols-1 items-baseline gap-y-4 px-1 py-9 md:grid-cols-12 md:gap-x-8 md:py-11">
              <span className="t-numeral text-sm text-accent-on-dark md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="md:col-span-5">
                <h3 className="t-h3 text-on-strong transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:translate-x-2">
                  {f.name}
                </h3>
                <p className="eyebrow mt-3 text-on-strong-subtle">
                  {pick(locale, f.labelMn, f.labelEn)}
                </p>
              </div>

              <p className="t-small max-w-prose text-pretty text-on-strong-muted md:col-span-4">
                {blurb}
              </p>

              <div className="flex items-baseline justify-between gap-4 md:col-span-2 md:justify-end">
                {f.nav != null ? (
                  <span className="text-right">
                    <span className="t-numeral block text-xl text-on-strong">
                      {formatNav(f.nav)}₮
                    </span>
                    <span className="eyebrow mt-1 block text-on-strong-subtle">NAV</span>
                  </span>
                ) : (
                  <span className="eyebrow text-on-strong-subtle">{f.code}</span>
                )}
                <span
                  aria-hidden
                  className="text-on-strong-subtle transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-accent-on-dark"
                >
                  →
                </span>
              </div>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
