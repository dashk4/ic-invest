"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, pick } from "@/lib/locale";
import { ThemeToggle } from "./ui/ThemeToggle";
import { LocaleToggle } from "./ui/LocaleToggle";
import { RollText } from "./ui/RollText";

const NAV = [
  { mn: "Хөрөнгө оруулалт", en: "Investing", href: "#philosophy" },
  { mn: "Сангууд", en: "Funds", href: "#funds" },
  { mn: "Судалгаа", en: "Insights", href: "#insights" },
  { mn: "Хамт олон", en: "Our Team", href: "#team" },
  { mn: "Бидний тухай", en: "About us", href: "#about" },
  { mn: "Холбоо барих", en: "Contact", href: "#contact" },
];

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

  const light = !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-surface/85 backdrop-blur-md border-b hairline"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-5 md:px-8 xl:px-10">
        <Link href="#top" className="flex shrink-0 items-center gap-3">
          <Image
            src={scrolled ? "/brand/logo_mn.svg" : "/brand/white-logo_mn.svg"}
            alt="IC Asset Management"
            width={132}
            height={41}
            className="h-7 w-auto transition-opacity duration-500 md:h-8"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`group eyebrow whitespace-nowrap text-[0.74rem] tracking-[0.12em] ${
                scrolled ? "text-fg-muted" : "text-ivory/75"
              }`}
            >
              <RollText hoverClassName="text-accent">{pick(locale, item.mn, item.en)}</RollText>
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex shrink-0 items-center gap-2.5">
          <LocaleToggle light={light} />
          <ThemeToggle light={light} />
          <a
            href="https://system.ic-invest.mn"
            target="_blank"
            rel="noopener noreferrer"
            className={`group eyebrow whitespace-nowrap overflow-hidden rounded-full border px-4 py-2.5 transition-colors ${
              scrolled
                ? "hairline text-fg hover:border-accent"
                : "border-ivory/30 text-ivory hover:border-bronze-light"
            }`}
          >
            <RollText hoverClassName="text-accent">{pick(locale, "Нэвтрэх", "Login")}</RollText>
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LocaleToggle light={light} />
          <ThemeToggle light={light} />
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5"
            aria-label="Цэс"
          >
            <span
              className={`h-px w-6 transition-transform ${scrolled ? "bg-fg" : "bg-ivory"} ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-6 transition-transform ${scrolled ? "bg-fg" : "bg-ivory"} ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-surface border-b hairline"
          >
            <div className="container-page flex flex-col gap-5 py-6">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl text-fg"
                >
                  {pick(locale, item.mn, item.en)}
                </a>
              ))}
              <a
                href="https://system.ic-invest.mn"
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow mt-2 w-fit rounded-full border hairline px-5 py-2.5 text-fg"
              >
                {pick(locale, "Нэвтрэх", "Login")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
