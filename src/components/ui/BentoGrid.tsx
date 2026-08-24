"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * Aceternity UI's bento-grid, recoloured for this palette.
 * The published version leans on a `cn()` helper and shadcn's neutral tokens;
 * this project has neither, so classes are composed directly.
 */

export function BentoGrid({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`mx-auto grid grid-cols-1 gap-4 md:auto-rows-[19rem] md:grid-cols-3 ${className}`}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  className = "",
  title,
  description,
  header,
  icon,
  index = 0,
}: {
  className?: string;
  title?: ReactNode;
  description?: ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`group/bento row-span-1 flex flex-col justify-between gap-4 rounded-2xl border hairline bg-card p-4 transition-shadow duration-500 hover:shadow-[0_24px_60px_-28px_rgb(0_0_0/0.45)] ${className}`}
    >
      {header}
      <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/bento:translate-x-2">
        {icon}
        <div className="font-display mt-3 text-[1.35rem] leading-snug text-fg">{title}</div>
        <div className="t-small mt-2 text-pretty text-fg-muted">{description}</div>
      </div>
    </motion.div>
  );
}
