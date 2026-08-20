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
      <div className="pointer-events-none absolute inset-0">
        <div
          className="mesh-blob absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[130px]"
          style={{ background: "var(--c-mesh-1)" }}
        />
        <div
          className="mesh-blob-slow absolute right-[10%] top-[10%] h-[360px] w-[360px] rounded-full opacity-20 blur-[110px]"
          style={{ background: "var(--c-mesh-2)" }}
        />
      </div>
      <div className="container-page relative text-center">
        <Reveal>
          <p className="eyebrow text-bronze-light">
            {pick(locale, "Алсын хараа", "Vision")}
          </p>
        </Reveal>
        <p className="font-display mx-auto mt-8 max-w-4xl text-balance text-3xl font-semibold leading-[1.35] md:text-5xl">
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
