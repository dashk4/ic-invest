"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Adapted from Aceternity UI's "Cover": a plaque around a phrase that erupts
 * into sweeping beams and a drifting spark field on hover.
 *
 * Differences from the published component, all deliberate:
 *  - framer-motion instead of `motion/react` (already a dependency here)
 *  - the spark field is plain divs rather than @tsparticles, which would pull
 *    a particle engine in for a few dozen dots
 *  - beams are jade rather than blue, to stay inside the palette
 *  - beam timings are generated in an effect; the original randomises them
 *    during render, which differs between server and client and trips
 *    hydration
 */

type BeamConfig = { top: number; duration: number; delay: number };

export function Cover({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState(0);
  const [beams, setBeams] = useState<BeamConfig[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const { clientWidth, clientHeight } = el;
      setWidth(clientWidth);

      const count = Math.max(2, Math.floor(clientHeight / 14));
      setBeams(
        Array.from({ length: count }, (_, i) => ({
          top: (i + 1) * (clientHeight / (count + 1)),
          duration: Math.random() * 2 + 1,
          delay: Math.random() * 2 + 1,
        }))
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group/cover relative inline-block rounded-xl bg-[color:var(--ink-900)]/20 px-3 py-1 transition-colors duration-500 hover:bg-[color:var(--ink-900)] md:px-4"
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 block overflow-hidden rounded-xl"
          >
            <motion.span
              animate={{ translateX: ["-50%", "0%"] }}
              transition={{ duration: 12, ease: "linear", repeat: Infinity }}
              className="flex h-full w-[200%]"
            >
              <SparkField />
              <SparkField />
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>

      {beams.map((b, i) => (
        <Beam
          key={i}
          hovered={hovered}
          width={width}
          duration={b.duration}
          delay={b.delay}
          style={{ top: `${b.top}px` }}
        />
      ))}

      <motion.span
        animate={{
          scale: hovered ? 0.86 : 1,
          x: hovered ? [0, -14, 14, -14, 14, 0] : 0,
          y: hovered ? [0, 12, -12, 12, -12, 0] : 0,
        }}
        transition={{
          scale: { duration: 0.2 },
          x: { duration: 0.28, repeat: Infinity, repeatType: "loop" },
          y: { duration: 0.28, repeat: Infinity, repeatType: "loop" },
        }}
        className={`relative z-20 inline-block transition-colors duration-200 group-hover/cover:text-[color:var(--bone-100)] ${className ?? ""}`}
      >
        {children}
      </motion.span>

      <CornerDot className="-right-[2px] -top-[2px]" />
      <CornerDot className="-bottom-[2px] -right-[2px]" />
      <CornerDot className="-left-[2px] -top-[2px]" />
      <CornerDot className="-bottom-[2px] -left-[2px]" />
    </span>
  );
}

function SparkField() {
  // hover-only, so this never renders on the server
  const dots = useMemo(
    () =>
      Array.from({ length: 34 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 0.6 + Math.random() * 1.3,
        delay: Math.random() * 2.4,
        duration: 1.6 + Math.random() * 2.4,
      })),
    []
  );

  return (
    <span className="relative block h-full w-full">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[color:var(--bone-100)]"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
          }}
          animate={{ opacity: [0.15, 1, 0.15] }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}

function Beam({
  className,
  delay,
  duration,
  hovered,
  width = 600,
  ...svgProps
}: {
  className?: string;
  delay?: number;
  duration?: number;
  hovered?: boolean;
  width?: number;
} & ComponentProps<typeof motion.svg>) {
  const id = useId();

  return (
    <motion.svg
      width={width}
      height="1"
      viewBox={`0 0 ${width} 1`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none absolute inset-x-0 z-10 w-full transition-opacity duration-500 ${
        hovered ? "opacity-100" : "opacity-40"
      } ${className ?? ""}`}
      {...svgProps}
    >
      <motion.path d={`M0 0.5H${width}`} stroke={`url(#beam-${id})`} />
      <defs>
        <motion.linearGradient
          id={`beam-${id}`}
          key={String(hovered)}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: hovered ? "-10%" : "-5%", y1: 0, y2: 0 }}
          animate={{ x1: "110%", x2: hovered ? "100%" : "105%", y1: 0, y2: 0 }}
          transition={{
            duration: hovered ? 0.6 : (duration ?? 2),
            ease: "linear",
            repeat: Infinity,
            delay: hovered ? Math.random() * 0.8 + 0.2 : 0,
            repeatDelay: hovered ? Math.random() + 1 : (delay ?? 1),
          }}
        >
          <stop stopColor="var(--jade-400)" stopOpacity="0" />
          <stop stopColor="var(--jade-400)" />
          <stop offset="1" stopColor="var(--jade-500)" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </motion.svg>
  );
}

function CornerDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--bone-100)] opacity-25 group-hover/cover:opacity-0 ${className ?? ""}`}
    />
  );
}
