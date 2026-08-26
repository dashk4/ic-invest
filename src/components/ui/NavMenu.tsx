"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { NAV, type NavEntry } from "@/lib/nav";
import { pick, type Locale } from "@/lib/locale";

/**
 * Aceternity UI's navbar-menu interaction: a shared `layoutId` panel that
 * morphs between menu items on a spring. Transition values are the published
 * ones; framer-motion stands in for `motion/react`, and the panel is
 * recoloured for the dark glass header.
 */

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export function NavMenu({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <nav
      onMouseLeave={() => setActive(null)}
      // self-stretch keeps the whole header row inside the nav's box, so the
      // pointer stays within it on the way down to a panel
      className="hidden h-full items-center gap-7 lg:flex xl:gap-9"
    >
      {NAV.map((entry) => (
        <MenuItem
          key={entry.key}
          entry={entry}
          locale={locale}
          active={active}
          setActive={setActive}
        />
      ))}
    </nav>
  );
}

function MenuItem({
  entry,
  locale,
  active,
  setActive,
}: {
  entry: NavEntry;
  locale: Locale;
  active: string | null;
  setActive: (v: string | null) => void;
}) {
  const isOpen = active === entry.key && !!entry.children;

  return (
    <div
      onMouseEnter={() => setActive(entry.key)}
      className="relative flex h-full items-center"
    >
      {active === entry.key && (
        <motion.div
          layoutId="nav-glass"
          transition={transition}
          style={{ position: "absolute", background: "color-mix(in srgb, #ffffff 7%, transparent)" }}
          className="glass-panel inset-y-2 -inset-x-3 z-0 rounded-full border border-[color:var(--c-line-strong)]"
        />
      )}
      <a
        href={entry.href}
        className="eyebrow relative z-10 flex items-center gap-1.5 whitespace-nowrap text-[0.82rem]! text-on-strong-muted transition-colors duration-500 hover:text-accent-on-dark"
      >
        {pick(locale, entry.mn, entry.en)}
      </a>

      {active !== null && isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {/* the published component offsets by 1.2rem; here that gap sits
              outside the nav and drops the hover, so the padding carries it */}
          <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-5">
            <motion.div
              layoutId="active"
              transition={transition}
              /* solid rather than translucent: over the light theme's page
                 surface even 5% transmission let headings ghost through */
              className="overflow-hidden rounded-2xl border border-[color:var(--c-line-strong)] bg-[color:var(--ink-900)] shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)]"
            >
              <motion.div layout className="h-full w-max p-4">
                <div className="flex flex-col space-y-4">
                  {entry.children?.map((child) => {
                    const Icon = child.icon;
                    return (
                      <a
                        key={child.mn}
                        href={child.href}
                        target={child.external ? "_blank" : undefined}
                        rel={child.external ? "noopener noreferrer" : undefined}
                        className="group/link flex items-center gap-3 text-[0.95rem] text-on-strong-muted transition-colors duration-300 hover:text-accent-on-dark"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[color:var(--c-line-strong)] bg-white/[0.04] transition-colors duration-300 group-hover/link:border-accent-on-dark/40 group-hover/link:bg-accent-on-dark/10">
                          <Icon className="h-[15px] w-[15px]" strokeWidth={1.6} />
                        </span>
                        {pick(locale, child.mn, child.en)}
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
