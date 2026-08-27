"use client";

import { useMemo } from "react";

/**
 * Aceternity UI's Meteors: a fixed count of angled streaks, each randomly
 * positioned along the top edge and given its own animation delay/duration,
 * drawn once per mount via useMemo so they don't re-randomize on every
 * parent re-render. Recolored from the published slate/white version to the
 * site's jade accent, with an occasional brand-red streak as the "signature"
 * flourish used elsewhere (nav dot, hero headline).
 */
export function Meteors({ number = 16, className = "" }: { number?: number; className?: string }) {
  const meteors = useMemo(
    () =>
      Array.from({ length: number }, (_, i) => ({
        left: Math.floor(Math.random() * 100),
        delay: Math.random() * 6,
        duration: 4 + Math.random() * 4,
        red: i % 5 === 0,
      })),
    [number],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {meteors.map((m, i) => (
        <span
          key={i}
          className="animate-meteor absolute left-0 top-0 h-0.5 w-0.5 rounded-full"
          style={{
            left: `${m.left}%`,
            top: "-8%",
            background: m.red ? "var(--brand-red)" : "var(--jade-400)",
            boxShadow: `0 0 0 1px color-mix(in srgb, ${m.red ? "var(--brand-red)" : "var(--jade-400)"} 25%, transparent)`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
          }}
        >
          <span
            className="absolute right-0 top-1/2 h-px w-12 -translate-y-1/2"
            style={{
              background: `linear-gradient(to right, transparent, ${m.red ? "var(--brand-red)" : "var(--jade-400)"})`,
              opacity: 0.5,
            }}
          />
        </span>
      ))}
    </div>
  );
}
