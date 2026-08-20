"use client";

import { motion } from "framer-motion";

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
  const viewportProps =
    trigger === "inView" ? { whileInView: "show" as const, viewport: { once: true, margin: "-70px" } } : { animate: "show" as const };

  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="mr-[0.28em] inline-block overflow-hidden align-top last:mr-0">
          <motion.span
            className="inline-block"
            initial="hidden"
            {...viewportProps}
            variants={{
              hidden: { y: "110%" },
              show: {
                y: "0%",
                transition: {
                  duration: 0.9,
                  delay: delay + i * 0.045,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
