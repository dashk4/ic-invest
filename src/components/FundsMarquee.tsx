"use client";

import { ThreeDMarquee } from "./ui/ThreeDMarquee";
import { useLocale, pick } from "@/lib/locale";
import type { FundCardData } from "./FundsList";

function formatNav(n: number) {
  const [whole, frac] = n.toFixed(2).split(".");
  return `${whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${frac}`;
}

/**
 * Rotates the real funds into tiles, offsetting each repeat by one so no
 * column stacks the same fund twice in a row. Kept to 4 repeats (16 tiles
 * over 2 columns): with only 4 real funds, showing each one 9 times in a
 * 4-column wall read as repetitive rather than dense.
 */
function buildTiles(funds: FundCardData[]) {
  const n = funds.length;
  if (n === 0) return [];
  const tiles: FundCardData[] = [];
  for (let rep = 0; rep < 4; rep++) {
    for (let k = 0; k < n; k++) {
      tiles.push(funds[(k + rep) % n]);
    }
  }
  return tiles;
}

export function FundsMarquee({ funds }: { funds: FundCardData[] }) {
  const { locale } = useLocale();
  const tiles = buildTiles(funds);

  return (
    <div className="mt-16">
      <ThreeDMarquee
        columnCount={2}
        tileWidth={340}
        items={tiles.map((f, i) => (
          <a
            key={`${f.sid}-${i}`}
            href={f.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full w-full flex-col justify-between p-5"
            style={{
              background: "linear-gradient(155deg, #16211b 0%, #0a0f0c 100%)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="eyebrow rounded-full border border-white/15 px-3 py-1.5 text-[0.7rem] text-accent-on-dark">
                {f.code}
              </span>
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-on-dark opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-on-dark" />
              </span>
            </div>

            <div>
              <p className="font-display line-clamp-2 text-[1.2rem] leading-snug text-on-strong transition-transform duration-500 group-hover:-translate-y-0.5">
                {f.name}
              </p>
              <p className="eyebrow mt-2 text-[0.65rem] text-on-strong-subtle">
                {pick(locale, f.labelMn, f.labelEn)}
              </p>
              {f.nav != null && (
                <p className="t-numeral mt-3 text-2xl text-accent-on-dark">
                  {formatNav(f.nav)}
                  <span className="ml-0.5 text-sm text-on-strong-subtle">₮</span>
                </p>
              )}
            </div>
          </a>
        ))}
      />
    </div>
  );
}
