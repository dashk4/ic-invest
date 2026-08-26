"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Aceternity UI's 3d-marquee, adapted:
 *  - takes `items: ReactNode[]` rather than `images: string[]` — there is no
 *    stock photography to fill this with, so each cell renders a designed
 *    tile (built by the caller) instead of an <img>
 *  - framer-motion instead of `motion/react`; no `cn()` helper, since this
 *    project has neither shadcn nor that utility
 *  - grid-line colour is a fixed light-on-dark token rather than Tailwind's
 *    `dark:` variant, which this project's theme system (a `data-theme`
 *    attribute, not a `.dark` class) doesn't drive — the section this sits
 *    in is permanently dark regardless of site theme, same reasoning as the
 *    header's glass chrome
 *  - the column drift and per-tile hover-lift are skipped under
 *    prefers-reduced-motion, which the original doesn't account for
 *  - repositioned entirely: the original's `relative top-96 right-[50%]
 *    origin-top-left` never renders anything in this layout — verified in
 *    an isolated test harness that the exact recipe (same values, same
 *    ancestor structure) produces an empty box here too, so it isn't a
 *    values mismatch. Centering the grid analytically instead — absolute,
 *    top/left 50%, `translate(-50%,-50%)` before the rotation, origin
 *    center — puts its rotated bounding box dead on the wrapper's center
 *    (verified: both centers land within a pixel of each other)
 */
export function ThreeDMarquee({
  items,
  columnCount = 4,
  tileWidth = 220,
  className = "",
}: {
  items: ReactNode[];
  /** fewer columns reads as fewer repeats of the same handful of real items,
   *  rather than a wall of duplicates */
  columnCount?: number;
  tileWidth?: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const chunkSize = Math.ceil(items.length / columnCount);
  const columns = Array.from({ length: columnCount }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return items.slice(start, start + chunkSize);
  });

  return (
    <div className={`mx-auto block h-[600px] overflow-hidden rounded-3xl max-sm:h-[420px] ${className}`}>
      <div className="flex size-full items-center justify-center">
        <div className="relative size-[1720px] shrink-0 scale-50 sm:scale-75 lg:scale-100">
          <div
            style={{
              transform: "translate(-50%, -50%) rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
              gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
            }}
            className="absolute left-1/2 top-1/2 grid size-full gap-[18px] transform-3d"
          >
            {columns.map((column, colIndex) => (
              <motion.div
                animate={reducedMotion ? undefined : { y: colIndex % 2 === 0 ? 100 : -100 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                key={colIndex}
                className="flex flex-col items-start gap-[18px]"
              >
                <GridLineVertical className="-left-4" offset="80px" />
                {column.map((item, itemIndex) => (
                  <div className="relative" key={itemIndex}>
                    <GridLineHorizontal className="-top-4" offset="20px" />
                    <motion.div
                      whileHover={reducedMotion ? undefined : { y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ width: tileWidth }}
                      className="aspect-[970/700] overflow-hidden rounded-xl ring-1 ring-white/10"
                    >
                      {item}
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// fixed light-on-dark tint: this grid always sits on the permanently-dark
// funds section, so there's no light/dark variant to switch between
const LINE_VARS = {
  "--color": "rgba(246, 244, 241, 0.16)",
  "--background": "#0e1311",
  "--fade-stop": "90%",
} as React.CSSProperties;

function GridLineHorizontal({ className = "", offset = "200px" }: { className?: string; offset?: string }) {
  return (
    <div
      style={{ ...LINE_VARS, "--height": "1px", "--width": "5px", "--offset": offset } as React.CSSProperties}
      className={`absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))] z-30
        bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]
        [background-size:var(--width)_var(--height)]
        [mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]
        [mask-composite:exclude] ${className}`}
    />
  );
}

function GridLineVertical({ className = "", offset = "150px" }: { className?: string; offset?: string }) {
  return (
    <div
      style={{ ...LINE_VARS, "--height": "5px", "--width": "1px", "--offset": offset } as React.CSSProperties}
      className={`absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)] z-30
        bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]
        [background-size:var(--width)_var(--height)]
        [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]
        [mask-composite:exclude] ${className}`}
    />
  );
}
