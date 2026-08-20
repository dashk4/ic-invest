"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { SplitReveal } from "./ui/SplitReveal";
import { HeroCard } from "./ui/HeroCard";
import { useLocale, pick } from "@/lib/locale";

export function Hero({
  heroFund,
}: {
  heroFund: { name: string; nav: number | null; units: number | null };
}) {
  const { locale } = useLocale();

  return (
    <section
      id="top"
      className="theme-fade relative flex min-h-screen items-center overflow-hidden bg-surface-strong pt-28 pb-20 text-on-strong"
    >
      <AuroraMesh />

      <div className="container-page relative z-10 grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="glass eyebrow inline-flex items-center gap-2 rounded-full px-4 py-2 text-accent-light"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Инвескор Ассет Менежмент ҮЦК
          </motion.p>

          <h1
            key={locale + "-h1"}
            className="font-display mt-7 max-w-2xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
          >
            <SplitReveal
              trigger="mount"
              delay={0.1}
              text={pick(locale, "Хөрөнгө оруулалтын", "Your journey,")}
            />
            <br />
            <span className="bg-gradient-to-r from-accent-light via-accent to-forest bg-clip-text text-transparent">
              <SplitReveal
                trigger="mount"
                delay={0.32}
                text={pick(locale, "мэргэшсэн удирдлага", "our expertise")}
              />
            </span>
          </h1>

          <motion.p
            key={locale + "-p"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-on-strong-muted"
          >
            {pick(
              locale,
              "Монголын хөрөнгийн зах зээлд шилдэг туршлага нэвтрүүлж, харилцагчдадаа үр өгөөж авчрахын төлөө өдөр бүр мэдлэг, чадвар, туршлагаа хурцалсаар байх мэргэжлийн баг.",
              "We are a team of professionals applying our passion and expertise to solve the needs of our clients and introduce best practices into the Mongolian capital market."
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-11 flex flex-wrap items-center gap-4"
          >
            <Button href="#funds">
              {pick(locale, "Хөрөнгө оруулалтын сангууд", "Investment Funds")}
            </Button>
            <Button href="#philosophy" variant="outline">
              {pick(locale, "Бидний арга барил", "Our Approach")}
            </Button>
          </motion.div>
        </div>

        <div className="hidden justify-self-center lg:flex lg:justify-self-end">
          <HeroCard name={heroFund.name} nav={heroFund.nav} units={heroFund.units} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-on-strong-subtle md:flex"
      >
        <span className="eyebrow">{pick(locale, "Доош гүйлгэх", "Scroll")}</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="h-8 w-px bg-on-strong-subtle"
        />
      </motion.div>
    </section>
  );
}

function AuroraMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="mesh-blob absolute -top-32 left-[8%] h-[520px] w-[520px] rounded-full opacity-40 blur-[110px]"
        style={{ background: "var(--c-mesh-1)" }}
      />
      <div
        className="mesh-blob-slow absolute top-[20%] right-[4%] h-[460px] w-[460px] rounded-full opacity-35 blur-[110px]"
        style={{ background: "var(--c-mesh-2)" }}
      />
      <div
        className="mesh-blob absolute bottom-[-10%] left-[30%] h-[420px] w-[420px] rounded-full opacity-25 blur-[110px]"
        style={{ background: "var(--c-mesh-3)" }}
      />
      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 bg-surface-strong/35" />
    </div>
  );
}
