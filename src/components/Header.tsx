"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, pick } from "@/lib/locale";
import { NAV } from "@/lib/nav";
import { ThemeToggle } from "./ui/ThemeToggle";
import { LocaleToggle } from "./ui/LocaleToggle";
import { NavMenu } from "./ui/NavMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { locale } = useLocale();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The nav chrome is dark in both themes, so its contents are always the
  // light-on-dark treatment regardless of scroll position or theme.

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      {/*
        No overflow-hidden here: the desktop dropdowns hang below the capsule
        and would be clipped. The mobile panel clips its own corners instead.
      */}
      <div
        className={`glass-panel glass-nav mx-auto max-w-[1320px] rounded-[1.25rem] border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? "is-scrolled glass-raised" : ""
        } ${open ? "glass-opaque" : ""}`}
      >
        <div className="relative flex h-[3.75rem] items-center justify-between gap-6 px-4 md:h-16 md:px-6">
          <Link href="/" className="shrink-0">
            <Image
              src="/brand/white-logo_mn.svg"
              alt="IC Asset Management"
              width={132}
              height={41}
              className="h-8 w-auto transition-opacity duration-700 md:h-[2.15rem]"
              priority
            />
          </Link>

          <NavMenu locale={locale} />

          <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
            <LocaleToggle light />
            <ThemeToggle light />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LocaleToggle light />
            <ThemeToggle light />
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
              aria-label="Цэс"
              aria-expanded={open}
            >
              <span
                className={`h-px w-5 bg-on-strong transition-all duration-500 ${open ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-5 bg-on-strong transition-all duration-500 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-b-[1.25rem] lg:hidden"
            >
              <div className="flex flex-col px-4 pb-5 text-on-strong md:px-6">
                {NAV.map((entry, i) => (
                  <motion.div
                    key={entry.key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.06 + i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-t border-[color:var(--c-line-strong)] py-3.5"
                  >
                    <a
                      href={entry.href}
                      onClick={() => setOpen(false)}
                      className="block text-2xl font-bold"
                    >
                      {pick(locale, entry.mn, entry.en)}
                    </a>

                    {entry.children && (
                      <ul className="mt-3 space-y-3">
                        {entry.children.map((child) => {
                          const Icon = child.icon;
                          return (
                            <li key={child.mn}>
                              <a
                                href={child.href}
                                target={child.external ? "_blank" : undefined}
                                rel={child.external ? "noopener noreferrer" : undefined}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 text-[0.95rem] text-on-strong-muted"
                              >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[color:var(--c-line-strong)] bg-white/[0.04]">
                                  <Icon className="h-[15px] w-[15px]" strokeWidth={1.6} />
                                </span>
                                {pick(locale, child.mn, child.en)}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
