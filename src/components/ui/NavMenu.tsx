"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { NAV, type NavEntry } from "@/lib/nav";
import { pick, type Locale } from "@/lib/locale";
import { RollText } from "./RollText";

/**
 * Desktop nav with Aceternity UI's navbar-menu interaction: a shared
 * `layoutId` panel that morphs between menu items, opening with a spring.
 * Recoloured for the dark glass header.
 */

const spring = {
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
      className="hidden items-center gap-7 lg:flex xl:gap-9"
    >
      {NAV.map((entry) => (
        <NavItem
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

function NavItem({
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
    <div onMouseEnter={() => setActive(entry.key)} className="relative">
      <a
        href={entry.href}
        className="group eyebrow flex items-center gap-1.5 whitespace-nowrap py-1 text-on-strong-muted transition-colors duration-500"
      >
        <RollText hoverClassName="text-accent-on-dark">
          {pick(locale, entry.mn, entry.en)}
        </RollText>
        {entry.children && (
          <motion.svg
            aria-hidden
            viewBox="0 0 10 6"
            fill="none"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="h-[5px] w-[9px] shrink-0 opacity-70"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        )}
      </a>

      {active !== null && isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={spring}
        >
          {/* starts flush with the trigger so the pointer never crosses a gap */}
          <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4">
            <motion.div
              layoutId="nav-dropdown"
              transition={spring}
              /* solid, not translucent: over the light theme's page surface
                 even 5% transmission let headings ghost through the panel */
              className="overflow-hidden rounded-2xl border border-[color:var(--c-line-strong)] bg-[color:var(--ink-900)] shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)]"
            >
              <motion.ul layout className="h-full w-max p-2">
                {entry.children?.map((child) => (
                  <li key={child.mn}>
                    <a
                      href={child.href}
                      target={child.external ? "_blank" : undefined}
                      rel={child.external ? "noopener noreferrer" : undefined}
                      className="block rounded-xl px-4 py-2.5 text-[0.95rem] text-on-strong-muted transition-colors duration-300 hover:bg-white/5 hover:text-accent-on-dark"
                    >
                      {pick(locale, child.mn, child.en)}
                    </a>
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
