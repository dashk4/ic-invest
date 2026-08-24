"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { SplitReveal } from "./ui/SplitReveal";
import { Counter } from "./ui/Counter";
import ParticleShape from "./ui/ParticleShape";
import { FlipWords } from "./ui/FlipWords";
import {
  BRAND_CHECKMARK_PATH,
  BRAND_CHECKMARK_VIEWBOX,
  BRAND_RED,
} from "@/lib/brandMark";
import { useLocale, pick, type Locale } from "@/lib/locale";

function formatInt(n: number) {
  return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const MN_FLIP_WORDS = [
  "мэргэшсэн",
  "туршлагатай",
  "хариуцлагатай",
  "инновацлаг",
];
const EN_FLIP_WORDS = ["expertise", "experience", "insight", "discipline"];

/** Small inline instance of the brand checkmark, sized to the headline's own
 *  em so it scales with the clamp()'d display type automatically. */
function InlineCheckmark() {
  return (
    <span className="relative inline-block h-[0.6em] w-[0.6em] translate-y-[0.08em] align-middle">
      <ParticleShape
        path={BRAND_CHECKMARK_PATH}
        viewBox={BRAND_CHECKMARK_VIEWBOX}
        color={BRAND_RED}
        highlightColor="#ff8a7a"
        trigger="mount"
        particleSize={1.5}
        density={1.6}
        scatter={80}
        gatherDuration={1300}
        stagger={260}
        pointerRepel={22}
        repelRadius={50}
        idleDrift={0.35}
        glow
        label="IC"
      />
    </span>
  );
}

export function Hero({
  heroFund,
}: {
  heroFund: { name: string; nav: number | null; units: number | null };
}) {
  const { locale } = useLocale();

  return (
    <section
      id="top"
      className="theme-fade relative flex min-h-svh flex-col justify-end overflow-hidden bg-surface-strong pt-32 text-on-strong"
    >
      <Atmosphere />

      <div className="container-page relative z-10 flex flex-1 flex-col justify-center pb-16 pt-6">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="eyebrow flex items-center gap-3 text-accent-on-dark"
            >
              <span className="h-px w-8 bg-accent-on-dark/50" />
              Инвескор Ассет Менежмент ҮЦК
            </motion.p>

            <h1
              key={locale + "-h1"}
              className="t-display mt-8 max-w-[15ch] text-balance"
            >
              {/*
                The brand checkmark sits right after the first word — the
                same device as the logo's "In[✓]esCore", where the mark is
                punctuation inside the wordmark rather than beside it.
              */}
              <SplitReveal
                trigger="mount"
                delay={0.12}
                text={pick(locale, "Хөрөнгө", "Your")}
              />{" "}
              <InlineCheckmark />{" "}
              <SplitReveal
                trigger="mount"
                delay={0.17}
                text={pick(locale, "оруулалтын", "journey,")}
              />
              <br />
              <span className="italic text-accent-on-dark">
                {locale === "en" && "our "}
                <FlipWords
                  key={locale}
                  words={pick(locale, MN_FLIP_WORDS, EN_FLIP_WORDS)}
                />
                {locale === "mn" && " удирдлага"}
              </span>
            </h1>
          </div>

          <motion.div
            key={locale + "-lead"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 lg:self-start lg:pt-1"
          >
            {/*
              The brand's own checkmark swash (the "V" in InVesCore), isolated
              from the logo file and rendered as a particle field that gathers
              in on mount — same particle engine as reactbits' ParticleText,
              forked to sample a filled SVG path instead of fillText. Stands in
              for the lead paragraph as the hero's visual anchor, top-aligned
              with the eyebrow/headline on the left instead of floating in the
              empty space above the buttons.

              trigger="mount": the initial gather always runs regardless of
              this prop, but "hover" additionally restarts the full
              scatter-to-gather animation on every pointerenter, which read as
              the mark "resetting" each time the cursor crossed it. Pointer
              repel still works either way — that logic isn't gated by trigger.
            */}
            <div className="h-[clamp(6.5rem,11vw,10rem)] w-[clamp(6.5rem,11vw,10rem)]">
              {/* <ParticleShape
                path={BRAND_CHECKMARK_PATH}
                viewBox={BRAND_CHECKMARK_VIEWBOX}
                color={BRAND_RED}
                highlightColor="#ff8a7a"
                trigger="mount"
                particleSize={2.4}
                density={2}
                scatter={170}
                gatherDuration={1600}
                stagger={400}
                pointerRepel={40}
                repelRadius={100}
                idleDrift={0.5}
                glow
                label="IC"
              /> */}
            </div>

            <div className="mt-48 flex flex-wrap items-center gap-3">
              <Button href="#funds" onDark>
                {pick(locale, "Сангуудыг үзэх", "Explore funds")}
              </Button>
              <Button href="/about" variant="ghost" onDark>
                {pick(locale, "Бидний арга барил", "Our approach")}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <DataRail
        locale={locale}
        name={heroFund.name}
        nav={heroFund.nav}
        units={heroFund.units}
      />
    </section>
  );
}

function DataRail({
  locale,
  name,
  nav,
  units,
}: {
  locale: Locale;
  name: string;
  nav: number | null;
  units: number | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 border-t border-[color:var(--c-line-strong)]"
    >
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-4">
          <RailCell label={pick(locale, "Сан", "Fund")}>
            <span className="flex items-center gap-2 text-[0.95rem] font-medium text-on-strong">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-on-dark opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-on-dark" />
              </span>
              INQ ETF
            </span>
          </RailCell>

          <RailCell
            label={pick(
              locale,
              "Нэгжийн цэвэр үнэ цэн",
              "Net asset value / unit",
            )}
          >
            <span className="t-numeral text-2xl text-on-strong">
              {nav != null ? <Counter value={nav} decimals={2} /> : "—"}
              <span className="ml-1 text-base text-on-strong-subtle">₮</span>
            </span>
          </RailCell>

          <RailCell label={pick(locale, "Гаргасан нэгж", "Units outstanding")}>
            <span className="t-numeral text-2xl text-on-strong">
              {units != null ? formatInt(units) : "—"}
            </span>
          </RailCell>

          <RailCell label={pick(locale, "Ангилал", "Category")}>
            <span className="text-[0.95rem] font-medium text-on-strong">
              {pick(locale, "Биржээр арилжаалагдах", "Exchange-traded")}
            </span>
          </RailCell>
        </div>

        <p className="border-t border-[color:var(--c-line-strong)] py-4 text-[0.8rem] text-on-strong-subtle">
          {name}
        </p>
      </div>
    </motion.div>
  );
}

function RailCell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-[color:var(--c-line-strong)] px-5 py-6 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0">
      <p className="eyebrow text-on-strong-subtle">{label}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Atmosphere() {
  return (
    <div className="grain pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="drift absolute -top-[20%] left-[45%] h-[70vh] w-[70vh] rounded-full opacity-[0.16] blur-[130px]"
        style={{ background: "var(--jade-400)" }}
      />
      <div
        className="drift-slow absolute bottom-[-25%] left-[-10%] h-[60vh] w-[60vh] rounded-full opacity-[0.10] blur-[130px]"
        style={{ background: "var(--jade-500)" }}
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
