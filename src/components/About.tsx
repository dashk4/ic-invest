"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, HandshakeIcon, Leaf, Sprout, Users } from "lucide-react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import { SectionHead } from "./ui/SectionHead";
import { Reveal } from "./ui/Reveal";
import { SplitReveal } from "./ui/SplitReveal";
import { ExpandableTeam } from "./ui/ExpandableTeam";
import { ALL_MEMBERS, TEAM } from "@/lib/team";
import { useLocale, pick, type Locale } from "@/lib/locale";

const EASE = [0.16, 1, 0.3, 1] as const;

export function About() {
  const { locale } = useLocale();

  return (
    <section id="about" className="theme-fade bg-surface-alt pb-[clamp(6rem,12vh,10rem)] pt-36 md:pt-44">
      <div className="container-page">
        <SectionHead
          eyebrow={pick(locale, "Бидний тухай", "About us")}
          title={pick(
            locale,
            "Монголын хөрөнгийн зах зээлд шилдэг туршлага",
            "International best practice, brought to Mongolia"
          )}
          aside={
            <p className="t-body max-w-sm text-pretty text-fg-muted">
              {pick(
                locale,
                "Харилцагчдадаа үр өгөөж авчрахын төлөө өдөр бүр өөрсдийн мэдлэг, чадвар, туршлагаа хурцалсаар байх мэргэжлийн баг.",
                "A professional team sharpening its knowledge, skill and experience every day to deliver value to our clients."
              )}
            </p>
          }
        />

        {/* anchors for the "Бидний тухай" submenu */}
        <div id="vision" className="scroll-mt-28" />
        <div id="philosophy" className="scroll-mt-28" />

        <BentoGrid className="mt-16">
          <BentoGridItem
            index={0}
            className="md:col-span-2"
            header={<VisionHeader locale={locale} />}
            icon={<Eye className="h-4 w-4 text-accent" strokeWidth={1.7} />}
            title={pick(locale, "Алсын хараа", "Vision")}
            description={pick(
              locale,
              "Хөрөнгө оруулагчдын санхүүгийн зорилгод тулгуурласан, инновац шингээсэн үйлчилгээг хүргэж, зах зээлийг тэргүүлэгч.",
              "Lead the market by delivering innovative services built around each investor's financial goals."
            )}
          />

          <BentoGridItem
            index={1}
            header={<TeamStackHeader locale={locale} />}
            icon={<Users className="h-4 w-4 text-accent" strokeWidth={1.7} />}
            title={pick(locale, "Чадварлаг баг", "A dedicated team")}
            description={pick(
              locale,
              "Монголын хөрөнгийн зах зээлд шилдэг туршлага нэвтрүүлж, мэдлэг чадвараа хурцалж байх мэргэжлийн баг.",
              "Professionals introducing industry best practice into the Mongolian capital market."
            )}
          />

          <BentoGridItem
            index={2}
            header={<TrustHeader />}
            icon={<HandshakeIcon className="h-4 w-4 text-accent" strokeWidth={1.7} />}
            title={pick(locale, "Итгэмжтэй байдал", "Managing with trust")}
            description={pick(
              locale,
              "Харилцагч, хамтрагч нартаа ил тод, шударга, урт хугацааны итгэлцлийг бий болгоно.",
              "Transparency, fairness and enduring trust with clients and partners."
            )}
          />

          <BentoGridItem
            index={3}
            header={<GrowthHeader />}
            icon={<Sprout className="h-4 w-4 text-accent" strokeWidth={1.7} />}
            title={pick(locale, "Тогтвортой хөгжил", "Sustainability at its core")}
            description={pick(
              locale,
              "Байгаль орчин, нийгэмд ээлтэй, урт хугацааны хамтын ажиллагаанд суурилан ажиллана.",
              "Environmentally and socially responsible long-term investing."
            )}
          />

          <BentoGridItem
            index={4}
            header={<BoardHeader locale={locale} />}
            icon={<Leaf className="h-4 w-4 text-accent" strokeWidth={1.7} />}
            title={pick(locale, "Нөлөөллийн хөрөнгө оруулалт", "Impact investing")}
            description={pick(
              locale,
              "Байгаль орчин, нийгэм, засаглалын үзүүлэлтүүдэд эерэг нөлөөлөл үзүүлэх нөлөөллийн хөрөнгө оруулалтын стратегийг хэрэгжүүлэгч.",
              "Integrating financial analysis with environmental, social and governance insight to find solutions that deliver both performance and tangible impact."
            )}
          />
        </BentoGrid>

        <div id="team" className="mt-24 scroll-mt-28 border-t hairline pt-16">
          <Reveal>
            <p className="eyebrow text-accent">{pick(locale, "Хамт олон", "Our team")}</p>
          </Reveal>
          <h3 className="t-h2 mt-6 max-w-[16ch] text-balance text-fg">
            <SplitReveal
              text={pick(locale, "Манай хамт олон", "The people behind the capital")}
            />
          </h3>
          <Reveal delay={0.12}>
            <p className="t-body mt-6 max-w-sm text-pretty text-fg-muted">
              {pick(
                locale,
                "Нэр дээр дарж дэлгэрэнгүй танилцана уу.",
                "Select a name to see the full profile."
              )}
            </p>
          </Reveal>

          <ExpandableTeam locale={locale} />
        </div>
      </div>
    </section>
  );
}

/* ---------- animated headers ---------- */

function HeaderShell({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative flex h-full min-h-[6rem] w-full flex-1 overflow-hidden rounded-xl ${className}`}
    >
      {children}
    </div>
  );
}

/** Drifting jade field with the same rising line used in the hero. */
function VisionHeader({ locale }: { locale: Locale }) {
  return (
    <HeaderShell className="bg-surface-strong">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="drift absolute -top-1/3 left-1/4 h-[28rem] w-[28rem] rounded-full opacity-30 blur-[90px]"
          style={{ background: "var(--jade-400)" }}
        />
        <div
          className="drift-slow absolute bottom-[-40%] right-[5%] h-[22rem] w-[22rem] rounded-full opacity-20 blur-[90px]"
          style={{ background: "var(--jade-500)" }}
        />
      </div>

      <svg
        viewBox="0 0 600 200"
        preserveAspectRatio="none"
        fill="none"
        className="absolute inset-0 h-full w-full opacity-40"
        aria-hidden
      >
        <motion.path
          d="M0 165 C 90 150, 150 120, 230 128 S 380 80, 450 55 S 560 22, 600 14"
          stroke="var(--jade-400)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease: EASE }}
        />
      </svg>

      <p className="relative m-auto max-w-[22ch] px-6 text-center font-display text-[1.4rem] leading-snug text-on-strong">
        {pick(
          locale,
          "Зах зээлийг тэргүүлэгч байх",
          "Leading the market"
        )}
      </p>
    </HeaderShell>
  );
}

/**
 * Chat-style stack: rounded bubbles with the middle one narrow and pushed
 * right, shearing apart on hover. Sized to the header box — at the original
 * padding the third bubble was clipped.
 */
function TeamStackHeader({ locale }: { locale: Locale }) {
  const rows = [ALL_MEMBERS[5], ALL_MEMBERS[8], ALL_MEMBERS[9]];
  const shift = {
    initial: { x: 0 },
    animate: { x: 10, rotate: 3, transition: { duration: 0.2 } },
  };
  const shiftBack = {
    initial: { x: 0 },
    animate: { x: -10, rotate: -3, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="relative flex h-full min-h-[6rem] w-full flex-1 flex-col justify-center gap-1.5 overflow-hidden rounded-xl bg-surface-sunken/60 p-2 text-fg-subtle"
    >
      <span className="bg-dots pointer-events-none absolute inset-0 opacity-30" />

      {rows.map((m, i) => (
        <motion.div
          key={m.mn}
          variants={i === 1 ? shiftBack : shift}
          className={`relative flex items-center gap-2.5 rounded-full border hairline bg-surface p-1 ${
            i === 1 ? "ml-auto w-3/4" : "w-full"
          }`}
        >
          <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full">
            <Image
              src={m.photo}
              alt=""
              fill
              sizes="24px"
              className="object-cover object-top grayscale transition-all duration-700 group-hover/bento:grayscale-0"
            />
          </span>
          <span className="truncate pr-1 text-[0.68rem] text-fg-muted">
            {pick(locale, m.mnTitle, m.enTitle)}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

/** Ledger-like bars that fill in — transparency made visual. */
function TrustHeader() {
  const widths = [72, 46, 88, 58, 34];
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true }}
      className="relative flex h-full min-h-[6rem] w-full flex-1 flex-col justify-center gap-2.5 overflow-hidden rounded-xl bg-surface-sunken/60 p-4 text-fg-subtle"
    >
      <span className="bg-dots pointer-events-none absolute inset-0 opacity-30" />
      {widths.map((w, i) => (
        <motion.span
          key={i}
          variants={{
            initial: { width: 0 },
            animate: { width: `${w}%`, transition: { duration: 0.7, delay: i * 0.08, ease: EASE } },
            hover: { width: ["0%", `${w}%`], transition: { duration: 1.4, delay: i * 0.05 } },
          }}
          className="relative h-2.5 rounded-full"
          style={{
            background:
              i % 2 === 0
                ? "color-mix(in srgb, var(--c-accent) 55%, transparent)"
                : "color-mix(in srgb, var(--c-fg) 16%, transparent)",
          }}
        />
      ))}
    </motion.div>
  );
}

/** Bars growing upward, with a sprout-like curve over them. */
function GrowthHeader() {
  const bars = [34, 52, 44, 70, 62, 92];
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true }}
      className="relative flex h-full min-h-[6rem] w-full flex-1 items-end gap-2 overflow-hidden rounded-xl bg-surface-sunken/60 p-4"
    >
      <span className="bg-dots pointer-events-none absolute inset-0 text-fg-subtle opacity-30" />
      {bars.map((h, i) => (
        <motion.span
          key={i}
          variants={{
            initial: { height: "8%" },
            animate: { height: `${h}%`, transition: { duration: 0.8, delay: i * 0.07, ease: EASE } },
            hover: { height: `${Math.min(100, h + 8)}%`, transition: { duration: 0.4 } },
          }}
          className="relative flex-1 rounded-t-md"
          style={{
            background: `linear-gradient(to top, color-mix(in srgb, var(--c-accent) ${30 + i * 10}%, transparent), color-mix(in srgb, var(--c-accent) 12%, transparent))`,
          }}
        />
      ))}
    </motion.div>
  );
}

/** Three board portraits, fanned out until hover straightens them. */
function BoardHeader({ locale }: { locale: Locale }) {
  const board = TEAM[0].members;
  const tilt = [
    { initial: { x: 14, rotate: -6 }, hover: { x: 0, rotate: 0 } },
    { initial: { x: 0, rotate: 0 }, hover: { x: 0, rotate: 0 } },
    { initial: { x: -14, rotate: 6 }, hover: { x: 0, rotate: 0 } },
  ];

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="relative flex h-full min-h-[6rem] w-full flex-1 items-center gap-2 overflow-hidden rounded-xl bg-surface-sunken/60 p-3"
    >
      <span className="bg-dots pointer-events-none absolute inset-0 text-fg-subtle opacity-30" />
      {board.map((m, i) => (
        <motion.div
          key={m.mn}
          variants={tilt[i]}
          transition={{ duration: 0.4, ease: EASE }}
          className={`relative flex h-full w-1/3 flex-col items-center justify-center gap-2 rounded-xl border hairline bg-surface p-2 ${
            i === 1 ? "z-20" : "z-10"
          }`}
        >
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image src={m.photo} alt="" fill sizes="40px" className="object-cover object-top" />
          </span>
          <p className="text-center text-[0.62rem] leading-tight text-fg-muted">
            {pick(locale, m.mnTitle, m.enTitle)}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
