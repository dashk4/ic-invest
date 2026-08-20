"use client";

import { RevealGroup, RevealItem } from "./ui/Reveal";
import { RollText } from "./ui/RollText";
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

function formatNumber(n: number) {
  const [whole, frac] = n.toFixed(2).split(".");
  return whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + frac;
}

export function FundsGrid({ funds }: { funds: FundCardData[] }) {
  const { locale } = useLocale();

  return (
    <RevealGroup className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
      {funds.map((f) => {
        const excerpt = pick(locale, f.excerptMn, f.excerptEn);
        return (
          <RevealItem key={f.sid}>
            <a
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card-lift glow-ring group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line-strong bg-white/[0.03] p-8"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-30"
                style={{ background: "var(--c-mesh-1)" }}
              />
              <div>
                <div className="flex items-center justify-between">
                  <span className="eyebrow rounded-full border border-line-strong px-3 py-1 text-bronze-light">
                    {f.code}
                  </span>
                  {f.nav != null && (
                    <span className="eyebrow text-on-strong-subtle">
                      NAV {formatNumber(f.nav)}₮
                    </span>
                  )}
                </div>
                <h3 className="font-display mt-6 text-2xl font-medium leading-snug text-on-strong">
                  {f.name}
                </h3>
                <p className="mt-2 text-sm uppercase tracking-wide text-on-strong-subtle">
                  {pick(locale, f.labelMn, f.labelEn)}
                </p>
                {excerpt && (
                  <p className="mt-4 text-base leading-relaxed text-on-strong-muted">
                    {excerpt}
                  </p>
                )}
              </div>
              <span className="eyebrow mt-8 inline-flex items-center gap-2 text-on-strong-muted">
                <RollText hoverClassName="text-bronze-light">
                  {pick(locale, "Сангийн дэлгэрэнгүй", "Fund details")}
                </RollText>
                <span className="transition-transform duration-500 ease-out group-hover:translate-x-1.5">→</span>
              </span>
            </a>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
