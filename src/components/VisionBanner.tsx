"use client";

import { Reveal } from "./ui/Reveal";
import { SplitReveal } from "./ui/SplitReveal";
import { useLocale, pick } from "@/lib/locale";

export function VisionBanner() {
  const { locale } = useLocale();

  return (
    <section
      id="about"
      className="theme-fade section-y relative overflow-hidden bg-surface-deep text-on-strong"
    >
      <div className="grain pointer-events-none absolute inset-0">
        <div
          className="drift absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.13] blur-[140px]"
          style={{ background: "var(--jade-400)" }}
        />
      </div>

      <div className="container-page relative">
        <Reveal>
          <p className="eyebrow text-accent-on-dark">{pick(locale, "Алсын хараа", "Vision")}</p>
        </Reveal>

        <blockquote className="t-h2 mt-10 max-w-[20ch] text-balance">
          <SplitReveal
            delay={0.08}
            text={pick(
              locale,
              "Зах зээлийг тэргүүлэгч, инновацлаг хөрөнгө оруулалтын шийдэл.",
              "Leading the market with innovative investment solutions."
            )}
          />
        </blockquote>

        <Reveal delay={0.25}>
          <p className="t-lead mt-10 max-w-xl text-pretty text-on-strong-muted">
            {pick(
              locale,
              "Хөрөнгө оруулагчдын санхүүгийн зорилгод тулгуурласан, инновац шингээсэн үйлчилгээг хүргэж, Монголын хөрөнгийн зах зээлийг тэргүүлэгч байна.",
              "Delivering innovative services built around our investors' financial goals, and leading Mongolia's capital market."
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
