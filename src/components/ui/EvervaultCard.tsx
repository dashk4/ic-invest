"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

/**
 * Aceternity UI's evervault-card: a character field revealed through a
 * cursor-following radial mask. Adapted — framer-motion instead of
 * `motion/react`, jade instead of the green→blue gradient, and the content
 * is a slot rather than a single fixed-size character.
 *
 * The published version regenerates a 1500-character string on every
 * mousemove, which is a lot of churn per frame; here the field is generated
 * once and only the mask position tracks the pointer.
 */

export function EvervaultCard({
  children,
  backdrop,
  className = "",
}: {
  children?: ReactNode;
  /** rendered behind the reveal pattern, e.g. an ambient DotField */
  backdrop?: ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [field, setField] = useState("");

  // client-only: keeps the random field out of the server render

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={onMouseMove}
      className={`group/card relative flex w-full items-center justify-center overflow-hidden rounded-2xl border hairline ${
        backdrop ? "" : "bg-surface-sunken/40"
      } ${className}`}
    >
      {backdrop && <div className="absolute inset-0 z-0">{backdrop}</div>}
      <CardPattern mouseX={mouseX} mouseY={mouseY} field={field} />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

function CardPattern({
  mouseX,
  mouseY,
  field,
}: {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  field: string;
}) {
  const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Theme-aware stops. The published card assumes a dark page; forcing a
          dark reveal on the light theme buried the dark body text under it. */}
      <motion.div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 "
        style={{
          ...style,
          background:
            "linear-gradient(120deg, var(--c-vault-a), var(--c-vault-b))",
        }}
      />
      {/* no mix-blend-overlay: over a light surface it greyed the characters out */}
      <motion.div
        className="absolute inset-0 opacity-0 transition-opacity duration-500"
        style={style}
      >
        <p className="h-full break-words whitespace-pre-wrap font-mono text-[0.72rem] leading-[1.35] font-bold text-[color:var(--c-vault-char)]">
          {field}
        </p>
      </motion.div>
    </div>
  );
}
