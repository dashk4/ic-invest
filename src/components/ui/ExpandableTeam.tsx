"use client";

import { useEffect, useId, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { startLenis, stopLenis } from "@/lib/lenis";
import { TEAM, type Member } from "@/lib/team";
import { pick, type Locale } from "@/lib/locale";

/**
 * Aceternity UI's expandable-card, adapted: the roster keeps the three real
 * groups instead of one flat list, framer-motion replaces `motion/react`, and
 * opening a card also pauses Lenis.
 */

type Active = (Member & { groupMn: string; groupEn: string }) | null;

export function ExpandableTeam({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<Active>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  const close = useCallback(() => setActive(null), []);
  useOutsideClick(ref, close);

  useEffect(() => {
    if (!active) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);

    // remember what the page had rather than forcing "auto" back
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    stopLenis();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      startLenis();
    };
  }, [active]);

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] h-full w-full bg-[color:var(--ink-900)]/70 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-[100] grid place-items-center p-4">
            <motion.button
              key={`close-${id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              onClick={close}
              aria-label={pick(locale, "Хаах", "Close")}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface text-fg shadow-lg"
            >
              <X className="h-4 w-4" strokeWidth={1.8} />
            </motion.button>

            <motion.div
              layoutId={`card-${active.mn}-${id}`}
              ref={ref}
              role="dialog"
              aria-modal="true"
              className="flex w-full max-w-[540px] flex-col overflow-hidden rounded-3xl border hairline bg-surface shadow-2xl md:max-h-[90vh]"
            >
              <motion.div
                layoutId={`image-${active.mn}-${id}`}
                className="relative h-[24rem] w-full shrink-0"
              >
                <Image
                  src={active.photo}
                  alt={pick(locale, active.mn, active.en)}
                  fill
                  sizes="540px"
                  className="object-cover object-top"
                  priority
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[color:var(--c-surface)] to-transparent" />
              </motion.div>

              <div className="p-6 pt-2">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.12 }}
                  className="eyebrow text-accent"
                >
                  {pick(locale, active.groupMn, active.groupEn)}
                </motion.p>
                <motion.h3
                  layoutId={`title-${active.mn}-${id}`}
                  className="font-display mt-2 text-3xl leading-tight text-fg"
                >
                  {pick(locale, active.mn, active.en)}
                </motion.h3>
                <motion.p
                  layoutId={`role-${active.mn}-${id}`}
                  className="t-small mt-1 text-fg-muted"
                >
                  {pick(locale, active.mnTitle, active.enTitle)}
                </motion.p>
              </div>

              {pick(locale, active.bioMn, active.bioEn) && (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="t-small max-h-48 overflow-auto px-6 pb-8 text-pretty text-fg-muted [scrollbar-width:none]"
                >
                  {pick(locale, active.bioMn, active.bioEn)}
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="mt-16 space-y-14">
        {TEAM.map((group) => (
          <div key={group.mn}>
            <h3 className="eyebrow border-b hairline pb-4 text-fg-subtle">
              {pick(locale, group.mn, group.en)}
            </h3>
            <ul className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {group.members.map((m) => (
                <li key={m.mn}>
                  <motion.button
                    layoutId={`card-${m.mn}-${id}`}
                    onClick={() =>
                      setActive({ ...m, groupMn: group.mn, groupEn: group.en })
                    }
                    className="group block w-full text-left"
                  >
                    <motion.div
                      layoutId={`image-${m.mn}-${id}`}
                      className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface-sunken ring-1 ring-[color:var(--c-line)] transition-all duration-500 group-hover:ring-accent"
                    >
                      <Image
                        src={m.photo}
                        alt={pick(locale, m.mn, m.en)}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover object-top grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                      />
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--ink-900)]/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </motion.div>

                    <motion.p
                      layoutId={`title-${m.mn}-${id}`}
                      className="font-display mt-4 text-[1.25rem] leading-snug text-fg"
                    >
                      {pick(locale, m.mn, m.en)}
                    </motion.p>
                    <motion.p
                      layoutId={`role-${m.mn}-${id}`}
                      className="t-small mt-1 text-pretty text-fg-muted"
                    >
                      {pick(locale, m.mnTitle, m.enTitle)}
                    </motion.p>
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
