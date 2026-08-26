"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Distilled from Aceternity UI's Timeline: just the scroll-linked beam — a
 * faint vertical track (masked to fade at both ends) with a bright beam that
 * fills in as the section scrolls through view. Dropped the sticky per-entry
 * titles from the original; this project's lists are short reason/entry
 * blurbs, not the long per-entry content that pattern was built around.
 *
 * Driven by framer-motion's scroll-linked transforms rather than a scroll
 * listener + rAF loop, so there's no per-frame JS work — the browser's
 * compositor handles it, same mechanism as CSS scroll-linked animations.
 */
export function ScrollBeam({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => setHeight(el.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // "start end" -> "end start": progress 0 when the track's top enters the
  // viewport, 1 when its bottom leaves. Scroll distance is always
  // trackHeight + viewportHeight, so it holds up for a short list, unlike
  // percentage offsets tuned for a track much taller than the viewport
  // (verified: the original's ["start 80%","end 60%"] filled this section's
  // beam completely by ~40% of the way through it).
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"],
  });
  const beamHeight = useTransform(scrollYProgress, [0.15, 0.85], [0, height]);
  const beamOpacity = useTransform(scrollYProgress, [0.15, 0.22], [0, 1]);

  return (
    <div ref={trackRef} className="relative">
      <div
        style={{ height }}
        className="absolute left-0 top-0 w-px overflow-hidden bg-[color:var(--c-line-strong)] [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]"
      >
        <motion.div
          style={{ height: beamHeight, opacity: beamOpacity }}
          className="absolute inset-x-0 top-0 w-px rounded-full bg-gradient-to-b from-accent via-accent to-transparent"
        />
      </div>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
