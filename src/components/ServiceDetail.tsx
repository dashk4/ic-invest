"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { useLocale, pick } from "@/lib/locale";

type Copy = { mn: string; en: string };

export function ServiceDetail({
  icon,
  titleMn,
  titleEn,
  lead,
  paragraphs,
  closing,
  buttonMn,
  buttonEn,
}: {
  icon: ReactNode;
  titleMn: string;
  titleEn: string;
  /** Larger intro line directly under the title. */
  lead?: Copy;
  paragraphs: Copy[];
  /** Smaller closing line before the button, e.g. "contact us to learn more." */
  closing?: Copy;
  buttonMn: string;
  buttonEn: string;
}) {
  const { locale } = useLocale();

  return (
    <section className="theme-fade min-h-svh bg-surface-alt pb-24 pt-36 md:pt-44">
      <div className="container-page max-w-3xl">
        <Reveal>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-[0.85rem] text-fg-muted transition-colors duration-300 hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            {pick(locale, "Үйлчилгээ", "Services")}
          </Link>
        </Reveal>

        <Reveal delay={0.08}>
          <span className="brand-icon mt-8 flex h-11 w-11 items-center justify-center rounded-xl">
            {icon}
          </span>
        </Reveal>

        <Reveal delay={0.14}>
          <h1 className="t-h3 mt-6 max-w-xl text-balance text-fg">
            {pick(locale, titleMn, titleEn)}
          </h1>
        </Reveal>

        {lead && (
          <Reveal delay={0.2}>
            <p className="t-lead mt-6 max-w-2xl text-pretty text-fg">
              {pick(locale, lead.mn, lead.en)}
            </p>
          </Reveal>
        )}

        <div className="mt-6 max-w-2xl space-y-4">
          {paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.24 + i * 0.05}>
              <p className="t-small text-pretty text-fg-muted">
                {pick(locale, p.mn, p.en)}
              </p>
            </Reveal>
          ))}
        </div>

        {closing && (
          <Reveal delay={0.24 + paragraphs.length * 0.05}>
            <p className="t-small mt-6 max-w-2xl text-pretty text-fg-muted">
              {pick(locale, closing.mn, closing.en)}
            </p>
          </Reveal>
        )}

        <Reveal delay={0.3 + paragraphs.length * 0.05} className="mt-10">
          <Link
            href="/#contact"
            className="rounded-lg bg-accent px-7 py-3 text-[0.9rem] font-medium text-accent-contrast transition-all duration-500 hover:-translate-y-0.5 hover:brightness-110"
          >
            {pick(locale, buttonMn, buttonEn)}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
