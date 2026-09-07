"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import ParticleShape from "./ui/ParticleShape";
import { Meteors } from "./ui/Meteors";
import { BRAND_CHECKMARK_PATH, BRAND_CHECKMARK_VIEWBOX, BRAND_RED } from "@/lib/brandMark";
import { useLocale, pick } from "@/lib/locale";

export function Hero() {
  const { locale } = useLocale();

  return (
    <section
      id="top"
      className="theme-fade relative flex min-h-svh flex-col justify-end overflow-hidden bg-surface-strong pt-32 text-on-strong"
    >
      <Atmosphere />

      <div className="container-page relative z-10 flex flex-1 flex-col justify-center pb-16 pt-6">
        <div className="grid grid-cols-1 items-center gap-y-14 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-8">
            {/*
              Plain CSS animation (globals.css: .animate-fade-up), not
              Framer Motion, for everything above the fold: this content has
              to be visible on first paint, before React ever hydrates. A
              motion.* component with initial={{opacity:0}} SSRs that
              invisible state straight into the HTML, so on a slow
              connection the whole hero — headline included — sat blank for
              however long JS took to load and hydrate. A stylesheet
              animation runs the moment the browser paints, no JS required.
            */}
            <p
              className="animate-fade-up eyebrow inline-flex items-center gap-2.5 rounded-full border border-[color:var(--c-line-strong)] bg-white/[0.04] px-4 py-2 text-accent-on-dark"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: BRAND_RED }} />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: BRAND_RED }} />
              </span>
              Инвескор Ассет Менежмент ХХК
            </p>

            <h1
              key={locale + "-h1"}
              className="animate-fade-up t-display mt-8 max-w-xl text-balance"
              style={{ animationDelay: "120ms" }}
            >
              {pick(locale, "Хөрөнгө оруулалтын", "Your journey,")}
              <br />
              {pick(locale, "мэргэшсэн удирдлага", "our expertise")}
            </h1>

            <p
              className="animate-fade-up t-body mt-7 max-w-md text-pretty text-on-strong-muted"
              style={{ animationDelay: "260ms" }}
            >
              {pick(
                locale,
                "Хөрөнгийн зах зээлийн судалгаанд суурилсан, хөрөнгө оруулалтын мэргэжлийн удирдлага санал болгож байна.",
                "We offer professional investment management built on capital market research.",
              )}
            </p>

            <div
              className="animate-fade-up mt-10 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "340ms" }}
            >
              <Button href="/#funds" onDark>
                {pick(locale, "Сангийн жагсаалт", "Fund list")}
              </Button>
              <Button href="/calculator" variant="ghost" onDark>
                {pick(locale, "Тооцоолуур ашиглах", "Try the calculator")}
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:col-span-4 lg:justify-end"
          >
            {/*
              The brand's own checkmark swash (the "V" in InVesCore), isolated
              from the logo file and rendered as a particle field that gathers
              in on mount — same particle engine as reactbits' ParticleText,
              forked to sample a filled SVG path instead of fillText. Housed in
              a card matching the site's surface-card language (bordered,
              shadowed, numbered badge) so it reads as a deliberate piece of
              the page instead of a shape floating in empty space.

              trigger="mount": the initial gather always runs regardless of
              this prop, but "hover" additionally restarts the full
              scatter-to-gather animation on every pointerenter, which reads as
              the mark "resetting" each time the cursor crossed it. Pointer
              repel still works either way — that logic isn't gated by trigger.
            */}
            <div className="relative flex aspect-square w-full max-w-[19rem] flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-[color:var(--c-line-strong)] bg-white/[0.03] p-10 shadow-[0_30px_90px_-30px_rgb(0_0_0/0.6)]">
              <span
                aria-hidden
                className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full opacity-25 blur-3xl"
                style={{ background: BRAND_RED }}
              />
              <span className="absolute left-6 top-6 z-10 eyebrow text-on-strong-subtle">IC</span>
              <span className="absolute right-6 top-6 z-10 h-2 w-2 rounded-full" style={{ background: BRAND_RED }} />
              <div className="relative z-0 h-[clamp(6.5rem,11vw,9rem)] w-[clamp(6.5rem,11vw,9rem)]">
                <ParticleShape
                  path={BRAND_CHECKMARK_PATH}
                  viewBox={BRAND_CHECKMARK_VIEWBOX}
                  color={BRAND_RED}
                  highlightColor="#ff8a7a"
                  trigger="mount"
                  particleSize={2.4}
                  density={2}
                  scatter={170}
                  scatterMode="random"
                  scatterPadding={84}
                  gatherDuration={1600}
                  stagger={400}
                  pointerRepel={40}
                  repelRadius={100}
                  idleDrift={0.5}
                  glow
                  label="IC"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Atmosphere() {
  return (
    <div className="grain pointer-events-none absolute inset-0 overflow-hidden">
      <Meteors number={14} />
      <div
        className="drift absolute -top-[20%] left-[45%] h-[70vh] w-[70vh] rounded-full opacity-[0.16] blur-[130px]"
        style={{ background: "var(--jade-400)" }}
      />
      <div
        className="drift-slow absolute bottom-[-25%] left-[-10%] h-[60vh] w-[60vh] rounded-full opacity-[0.10] blur-[130px]"
        style={{ background: "var(--jade-500)" }}
      />
      <div
        className="drift-slow absolute right-[-15%] top-[10%] h-[45vh] w-[45vh] rounded-full opacity-[0.08] blur-[130px]"
        style={{ background: "var(--brand-navy)" }}
      />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.10]"
        viewBox="0 0 1400 900"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden
      >
        <motion.path
          d="M0 700 C 220 660, 340 600, 520 610 S 800 500, 960 430 S 1240 300, 1400 250"
          stroke="var(--jade-400)"
          strokeWidth="1.25"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M0 800 C 240 780, 380 720, 560 730 S 860 640, 1020 570 S 1280 450, 1400 410"
          stroke="var(--bone-100)"
          strokeWidth="0.75"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  );
}
