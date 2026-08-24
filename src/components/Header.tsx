"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, pick } from "@/lib/locale";
import { useTheme } from "@/lib/theme";
import { ThemeToggle } from "./ui/ThemeToggle";
import { LocaleToggle } from "./ui/LocaleToggle";
import { RollText } from "./ui/RollText";

const NAV = [
  { mn: "Арга барил", en: "Approach", href: "#philosophy" },
  { mn: "Сангууд", en: "Funds", href: "#funds" },
  { mn: "Судалгаа", en: "Insights", href: "#insights" },
  { mn: "Хамт олон", en: "Team", href: "#team" },
  { mn: "Бидний тухай", en: "About", href: "#about" },
  { mn: "Холбоо барих", en: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { locale } = useLocale();
  const { theme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Unscrolled the header floats over the dark hero; scrolled it sits on the
  // page surface, which is only light in the light theme.
  const onDark = !scrolled || theme === "dark";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <div
        className={`glass-panel mx-auto max-w-[1320px] overflow-hidden rounded-[1.25rem] border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          onDark ? "glass-on-dark" : "glass-on-light"
        } ${scrolled ? "glass-raised" : ""} ${open ? "glass-opaque" : ""}`}
      >
        <div className="relative flex h-[3.75rem] items-center justify-between gap-6 px-4 md:h-16 md:px-6">
        <Link href="#top" className="shrink-0">
          <Image
            src={onDark ? "/brand/white-logo_mn.svg" : "/brand/logo_mn.svg"}
            alt="IC Asset Management"
            width={132}
            height={41}
            className="h-7 w-auto transition-opacity duration-700 md:h-[1.9rem]"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`group eyebrow whitespace-nowrap transition-colors duration-500 ${
                onDark ? "text-on-strong-muted" : "text-fg-muted"
              }`}
            >
              <RollText hoverClassName={onDark ? "text-accent-on-dark" : "text-accent"}>
                {pick(locale, item.mn, item.en)}
              </RollText>
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
          <LocaleToggle light={onDark} />
          <ThemeToggle light={onDark} />
          <a
            href="https://system.ic-invest.mn"
            target="_blank"
            rel="noopener noreferrer"
            className={`group eyebrow overflow-hidden whitespace-nowrap rounded-full border px-5 py-2.5 transition-colors duration-500 ${
              onDark
                ? "border-[color:var(--c-line-strong)] text-on-strong hover:border-accent-on-dark"
                : "hairline text-fg hover:border-accent"
            }`}
          >
            <RollText hoverClassName={onDark ? "text-accent-on-dark" : "text-accent"}>
              {pick(locale, "Нэвтрэх", "Login")}
            </RollText>
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LocaleToggle light={onDark} />
          <ThemeToggle light={onDark} />
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
            aria-label="Цэс"
            aria-expanded={open}
          >
            <span
              className={`h-px w-5 transition-all duration-500 ${onDark ? "bg-on-strong" : "bg-fg"} ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-5 transition-all duration-500 ${onDark ? "bg-on-strong" : "bg-fg"} ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
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
              className="relative overflow-hidden lg:hidden"
            >
              <div
                className={`flex flex-col px-4 pb-5 md:px-6 ${
                  onDark ? "text-on-strong" : "text-fg"
                }`}
              >
                {NAV.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.06 + i * 0.045,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`font-display border-t py-3.5 text-2xl ${
                      onDark
                        ? "border-[color:var(--c-line-strong)]"
                        : "border-[color:var(--c-line)]"
                    }`}
                  >
                    {pick(locale, item.mn, item.en)}
                  </motion.a>
                ))}
                <a
                  href="https://system.ic-invest.mn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow mt-5 w-fit rounded-full bg-accent px-6 py-3 text-accent-contrast"
                >
                  {pick(locale, "Нэвтрэх", "Login")}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
