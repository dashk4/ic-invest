"use client";

import { motion } from "framer-motion";
import { HandshakeIcon, Leaf, Sprout } from "lucide-react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import { SectionHead } from "./ui/SectionHead";
import { Reveal } from "./ui/Reveal";
import { SplitReveal } from "./ui/SplitReveal";
import { TeamGrid } from "./ui/TeamGrid";
import { useLocale, pick, type Locale } from "@/lib/locale";

const EASE = [0.16, 1, 0.3, 1] as const;

export function About() {
  const { locale } = useLocale();

  return (
    <section
      id="about"
      className="theme-fade bg-surface-alt pb-[clamp(6rem,12vh,10rem)] pt-36 md:pt-44"
    >
      <div className="container-page">
        <SectionHead
          eyebrow={pick(locale, "Бидний тухай", "About us")}
          title={pick(
            locale,
            "Монголын хөрөнгийн зах зээлийн түүчээлэгч",
            "Mongolia's capital market pioneer",
          )}
          titleClassName="!text-[clamp(1.75rem,3vw,2.75rem)]"
        />

        <div id="vision" className="mt-16 scroll-mt-28">
          <Reveal>
            <p className="eyebrow text-accent">
              {pick(locale, "Алсын хараа", "Vision")}
            </p>
          </Reveal>
          <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="h-72 overflow-hidden rounded-2xl border hairline lg:col-span-7 lg:h-80">
              <VisionHeader locale={locale} />
            </div>
            <div className="lg:col-span-5">
              <p className="t-body text-pretty text-fg-muted">
                {pick(
                  locale,
                  "Хөрөнгө оруулагчдын зорилго, эрсдэлийн түвшинд хамгийн тохиромжтой хөрөнгө оруулалтыг санал болгох мэдлэг туршлагатай, чадварлаг баг хамт олон.",
                  "A knowledgeable, capable team recommending the investment best suited to each investor's goals and risk tolerance.",
                )}
              </p>
            </div>
          </div>
        </div>

        <div id="philosophy" className="mt-24 scroll-mt-28">
          <Reveal>
            <p className="eyebrow text-accent">
              {pick(locale, "Үнэт зүйл", "Values")}
            </p>
          </Reveal>

          <BentoGrid className="mt-6">
            <BentoGridItem
              index={0}
              header={<TrustHeader />}
              icon={
                <HandshakeIcon
                  className="h-4 w-4 text-accent"
                  strokeWidth={1.7}
                />
              }
              title={pick(locale, "Найдвартай байдал", "Managing with trust")}
              description={pick(
                locale,
                "Харилцагч, хамтрагчиддаа ил тод, шударга, урт хугацааны итгэлцэл бий болгоно.",
                "Transparency, fairness and enduring trust with clients and partners.",
              )}
            />

            <BentoGridItem
              index={1}
              header={<GrowthHeader />}
              icon={<Sprout className="h-4 w-4 text-accent" strokeWidth={1.7} />}
              title={pick(
                locale,
                "Тогтвортой хөгжил",
                "Sustainability at its core",
              )}
              description={pick(
                locale,
                "Байгаль орчин, нийгэмд ээлтэй, урт хугацааны хамтын ажиллагаанд суурилан ажиллана.",
                "Environmentally and socially responsible long-term investing.",
              )}
            />

            <BentoGridItem
              index={2}
              header={<ImpactHeader />}
              icon={<Leaf className="h-4 w-4 text-accent" strokeWidth={1.7} />}
              title={pick(
                locale,
                "Нөлөөллийн хөрөнгө оруулалт",
                "Impact investing",
              )}
              description={pick(
                locale,
                "Байгаль орчин, нийгэм, засаглалын үзүүлэлтүүдэд эерэг нөлөөлөл үзүүлэх нөлөөллийн хөрөнгө оруулалтын стратегийг хэрэгжүүлэгч.",
                "Integrating financial analysis with environmental, social and governance insight to find solutions that deliver both performance and tangible impact.",
              )}
            />
          </BentoGrid>
        </div>

        <div id="team" className="mt-24 scroll-mt-28 border-t hairline pt-16">
          <Reveal>
            <p className="eyebrow text-accent">
              {pick(locale, "Хамт олон", "Our team")}
            </p>
          </Reveal>
          <h3 className="t-h2 mt-6 max-w-[16ch] text-balance text-fg">
            <SplitReveal
              text={pick(
                locale,
                "Манай хамт олон",
                "The people behind the capital",
              )}
            />
          </h3>
          <TeamGrid locale={locale} />
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

      <p className="relative m-auto max-w-[30ch] px-6 text-center font-display text-[1.05rem] leading-snug text-on-strong">
        {pick(
          locale,
          "Хөрөнгө оруулагчдын санхүүгийн зорилгод нийцсэн, инновацлаг санхүүгийн шийдэл",
          "Innovative financial solutions matched to each investor's financial goals",
        )}
      </p>
    </HeaderShell>
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
            animate: {
              width: `${w}%`,
              transition: { duration: 0.7, delay: i * 0.08, ease: EASE },
            },
            hover: {
              width: ["0%", `${w}%`],
              transition: { duration: 1.4, delay: i * 0.05 },
            },
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
            animate: {
              height: `${h}%`,
              transition: { duration: 0.8, delay: i * 0.07, ease: EASE },
            },
            hover: {
              height: `${Math.min(100, h + 8)}%`,
              transition: { duration: 0.4 },
            },
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

/** Concentric rings rippling outward from a core mark — impact spreading beyond the initial investment. */
function ImpactHeader() {
  const rings = [0, 1, 2, 3];

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true }}
      className="relative flex h-full min-h-[6rem] w-full flex-1 items-center justify-center overflow-hidden rounded-xl bg-surface-sunken/60"
    >
      <span className="bg-dots pointer-events-none absolute inset-0 text-fg-subtle opacity-30" />
      {rings.map((i) => (
        <motion.span
          key={i}
          variants={{
            initial: { scale: 0.3, opacity: 0 },
            animate: {
              scale: 1,
              opacity: [0, 0.5, 0],
              transition: {
                duration: 2.6,
                delay: i * 0.55,
                repeat: Infinity,
                ease: EASE,
              },
            },
            hover: { transition: { duration: 1.4, delay: i * 0.15 } },
          }}
          className="absolute h-24 w-24 rounded-full border"
          style={{
            borderColor: "color-mix(in srgb, var(--c-accent) 55%, transparent)",
          }}
        />
      ))}
      <span
        className="relative h-3.5 w-3.5 rounded-full"
        style={{ background: "var(--c-accent)" }}
      />
    </motion.div>
  );
}
