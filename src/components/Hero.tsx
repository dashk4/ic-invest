"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { SplitReveal } from "./ui/SplitReveal";
import { BuildingArt } from "./ui/BuildingArt";
import { useLocale, pick } from "@/lib/locale";

export function Hero() {
  const { locale } = useLocale();

  return (
    <section
      id="top"
      className="theme-fade relative flex min-h-screen items-center overflow-hidden bg-surface-strong pt-28 pb-20 text-on-strong"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-bronze/10 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[480px] w-[480px] rounded-full bg-forest/20 blur-3xl" />
        <HeroLines />
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block">
        <BuildingArt />
      </div>

      <div className="container-page relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow text-bronze-light"
        >
          Инвескор Ассет Менежмент ҮЦК
        </motion.p>

        <h1
          key={locale + "-h1"}
          className="font-display mt-7 max-w-4xl text-balance text-5xl font-medium leading-[1.08] md:text-7xl"
        >
          <SplitReveal
            trigger="mount"
            delay={0.1}
            text={pick(locale, "Хөрөнгө оруулалтын", "Your journey,")}
          />
          <br />
          <SplitReveal
            trigger="mount"
            delay={0.32}
            text={pick(locale, "мэргэшсэн удирдлага", "our expertise")}
          />
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

function HeroLines() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.18]"
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
      fill="none"
    >
      <motion.path
        d="M0 620 C 180 560, 260 520, 380 540 S 560 460, 680 420 S 880 320, 1000 300 S 1140 260, 1200 220"
        stroke="#ddc79a"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M0 700 C 200 680, 320 640, 440 660 S 640 600, 760 560 S 960 480, 1080 470 S 1180 440, 1200 430"
        stroke="#f6f3ec"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}
