"use client";

import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SplitReveal } from "./SplitReveal";

/**
 * Shared section opener. `aside` sits opposite the title on wide screens so
 * sections read as an editorial spread rather than a stack of centred blocks.
 */
export function SectionHead({
  eyebrow,
  title,
  aside,
  onDark = false,
  align = "split",
}: {
  eyebrow: string;
  title: string;
  aside?: ReactNode;
  onDark?: boolean;
  align?: "split" | "center";
}) {
  const eyebrowColor = onDark ? "text-accent-on-dark" : "text-accent";
  const titleColor = onDark ? "text-on-strong" : "text-fg";

  if (align === "center") {
    return (
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className={`eyebrow ${eyebrowColor}`}>{eyebrow}</p>
        </Reveal>
        <h2 className={`t-h2 mt-6 text-balance ${titleColor}`}>
          <SplitReveal text={title} />
        </h2>
        {aside && <Reveal delay={0.12}>{aside}</Reveal>}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
      <div className="lg:col-span-7">
        <Reveal>
          <p className={`eyebrow ${eyebrowColor}`}>{eyebrow}</p>
        </Reveal>
        <h2 className={`t-h2 mt-6 text-balance ${titleColor}`}>
          <SplitReveal text={title} />
        </h2>
      </div>
      {aside && (
        <Reveal delay={0.12} className="lg:col-span-5 lg:pb-2">
          {aside}
        </Reveal>
      )}
    </div>
  );
}
