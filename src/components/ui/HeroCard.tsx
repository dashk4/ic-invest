"use client";

import { motion } from "framer-motion";
import { Counter } from "./Counter";
import { useLocale, pick } from "@/lib/locale";

function formatNumber(n: number, decimals = 0) {
  const [whole, frac] = n.toFixed(decimals).split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimals > 0 ? `${grouped}.${frac}` : grouped;
}

export function HeroCard({
  name,
  nav,
  units,
}: {
  name: string;
  nav: number | null;
  units: number | null;
}) {
  const { locale } = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -3 }}
      animate={{ opacity: 1, y: 0, rotate: -3 }}
      transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="glass w-[320px] rounded-3xl p-6 shadow-[0_40px_100px_-30px_rgba(124,92,255,0.45)] sm:w-[360px]"
      >
        <div className="flex items-center justify-between">
          <span className="eyebrow rounded-full border border-line-strong px-3 py-1 text-accent-light">
            ETF · INQ
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-on-strong-subtle">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-forest" />
            </span>
            {pick(locale, "Идэвхтэй", "Live")}
          </span>
        </div>

        <p className="font-display mt-5 text-sm leading-snug text-on-strong-muted">{name}</p>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-4xl font-semibold text-on-strong">
            {nav != null ? <Counter value={nav} decimals={2} /> : "—"}
          </span>
          <span className="text-lg text-on-strong-subtle">₮</span>
        </div>
        <p className="mt-1 text-xs uppercase tracking-wide text-on-strong-subtle">
          {pick(locale, "Нэгжийн цэвэр үнэ цэн", "Net asset value / unit")}
        </p>

        <svg viewBox="0 0 300 70" className="mt-5 h-16 w-full" fill="none">
          <motion.path
            d="M0 52 C 30 46, 45 58, 70 44 S 110 20, 140 30 S 190 50, 220 32 S 270 8, 300 14"
            stroke="url(#cardLine)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <linearGradient id="cardLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--c-mesh-2)" />
              <stop offset="100%" stopColor="var(--c-mesh-1)" />
            </linearGradient>
          </defs>
        </svg>

        <div className="mt-5 flex items-center justify-between border-t border-line-strong pt-4 text-xs text-on-strong-subtle">
          <span>{pick(locale, "Гаргасан нэгж", "Units outstanding")}</span>
          <span className="font-medium text-on-strong">{units != null ? formatNumber(units) : "—"}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
