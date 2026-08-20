"use client";

import { Reveal } from "./ui/Reveal";
import { SplitReveal } from "./ui/SplitReveal";
import { useLocale, pick } from "@/lib/locale";

export function VisionBanner() {
  const { locale } = useLocale();

  return (
    <section
      id="about"
      className="theme-fade relative overflow-hidden bg-surface-deep py-28 text-on-strong md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-bronze/40 to-transparent" />
      </div>
      <div className="container-page relative text-center">
        <Reveal>
          <p className="eyebrow text-bronze-light">
            {pick(locale, "Алсын хараа", "Vision")}
          </p>
        </Reveal>
        <p className="font-display mx-auto mt-8 max-w-4xl text-balance text-3xl font-medium leading-[1.35] md:text-5xl">
          <SplitReveal
            delay={0.1}
            text={pick(
              locale,
              "Хөрөнгө оруулагчдын санхүүгийн зорилгод тулгуурласан, инновац шингээсэн үйлчилгээг хүргэж, зах зээлийг тэргүүлэгч.",
              "Lead the market by delivering innovative investment solutions aligned with investor's financial goals."
            )}
          />
        </p>
      </div>
    </section>
  );
}
