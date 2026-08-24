"use client";

import { motion, type Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Masked per-word reveal.
 *
 * The in-view observer lives on the OUTER span, never on the words themselves:
 * each word is translated 110% down inside an `overflow-hidden` wrapper, so an
 * observer attached to the word measures zero visible area, never fires, and
 * the text stays invisible forever. The outer span is unclipped, so it triggers
 * reliably and the words inherit the variant label from it.
 */
export function SplitReveal({
  text,
  trigger = "inView",
  delay = 0,
  className,
}: {
  text: string;
  trigger?: "mount" | "inView";
  delay?: number;
  className?: string;
}) {
  const words = text.split(" ");

  const trigProps =
    trigger === "inView"
      ? {
          whileInView: "show" as const,
          viewport: { once: true, margin: "0px 0px -70px 0px" },
        }
      : { animate: "show" as const };

  return (
    <motion.span className={className} initial="hidden" {...trigProps}>
      {words.map((w, i) => {
        const variants: Variants = {
          hidden: { y: "110%" },
          show: {
            y: "0%",
            transition: { duration: 0.9, delay: delay + i * 0.045, ease: EASE },
          },
        };
        return (
          <span
            key={i}
            className="mr-[0.28em] inline-block overflow-hidden align-top last:mr-0"
          >
            <motion.span className="inline-block" variants={variants}>
              {w}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
