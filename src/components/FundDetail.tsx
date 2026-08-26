"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Briefcase, ExternalLink, PieChart, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { SplitReveal } from "./ui/SplitReveal";
import { Counter } from "./ui/Counter";
import DotField from "./ui/DotField";
import { useLocale, pick } from "@/lib/locale";
import { FundCalculator } from "./FundCalculator";

const ICONS = [Briefcase, ShieldCheck, TrendingUp, Users, PieChart];

export type FundFactRow = { labelMn: string; labelEn: string; value: string; numeric: number | null };

export type FundDetailData = {
  sid: number;
  slug: string;
  index: number;
  code: string;
  labelMn: string;
  labelEn: string;
  name: string;
  blurbMn: string;
  blurbEn: string;
  descriptionMn: string;
  descriptionEn: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  logoOnDark: boolean;
  facts: FundFactRow[];
  externalSite?: string;
  otherFunds: { slug: string; name: string; nameEn: string; code: string }[];
};

export function FundDetail({ fund }: { fund: FundDetailData }) {
  const { locale } = useLocale();
  const description = pick(locale, fund.descriptionMn, fund.descriptionEn);
  const paragraphs = description.split("\n\n").filter(Boolean);
  const blurb = pick(locale, fund.blurbMn, fund.blurbEn);
  const Icon = ICONS[fund.index % ICONS.length];

  return (
    <>
      {/* banner — same dark/grain treatment as the funds section on the homepage */}
      <section className="theme-fade relative overflow-hidden bg-surface-strong pb-20 pt-36 text-on-strong md:pt-44">
        <div className="grain pointer-events-none absolute inset-0">
          <div
            className="drift-slow absolute right-[-10%] top-[10%] h-[55vh] w-[55vh] rounded-full opacity-[0.10] blur-[140px]"
            style={{ background: "var(--jade-500)" }}
          />
          <div
            className="drift absolute bottom-[-15%] left-[-5%] h-[40vh] w-[40vh] rounded-full opacity-[0.08] blur-[120px]"
            style={{ background: "var(--jade-400)" }}
          />
        </div>

        <div className="container-page relative">
          <Reveal>
            <Link
              href="/#funds"
              className="group inline-flex items-center gap-3 text-on-strong-subtle"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--c-line-strong)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1 group-hover:border-accent-on-dark group-hover:text-accent-on-dark">
                <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <span className="eyebrow transition-colors duration-300 group-hover:text-accent-on-dark">
                {pick(locale, "Хөрөнгө оруулалтын сан", "Our funds")}
              </span>
            </Link>
          </Reveal>

          <div className="mt-12 max-w-3xl">
            <Reveal delay={0.05}>
              {fund.logoOnDark ? (
                <div className="relative h-48 w-[36rem] max-w-full">
                  <Image
                    src={fund.logo}
                    alt={fund.name}
                    fill
                    sizes="576px"
                    className="object-contain object-left"
                  />
                </div>
              ) : (
                // a plain white patch just big enough for the mark — no
                // rounded card edges, so it reads as the logo's own light
                // background rather than a boxed UI frame sitting behind it
                <div
                  className="inline-flex h-24 items-center px-2 py-1"
                  style={{ background: "var(--bone-100)" }}
                >
                  <div className="relative h-full w-56">
                    <Image
                      src={fund.logo}
                      alt={fund.name}
                      fill
                      sizes="224px"
                      className="object-contain object-left"
                    />
                  </div>
                </div>
              )}
            </Reveal>

            <div className="mt-8 flex items-center gap-2.5">
              <Icon className="h-4 w-4 text-accent-on-dark" strokeWidth={1.8} />
              <p className="eyebrow text-accent-on-dark">{fund.code}</p>
            </div>
            <h1 className="t-h2 mt-4 text-balance text-on-strong">
              <SplitReveal text={fund.name} />
            </h1>
            <Reveal delay={0.12}>
              <p className="t-body mt-6 max-w-xl text-pretty text-on-strong-muted">
                {pick(locale, fund.labelMn, fund.labelEn)}
              </p>
            </Reveal>
          </div>

          {fund.facts.length > 0 ? (
            <RevealGroup className="mt-14 grid max-w-2xl grid-cols-2 gap-8 border-t border-[color:var(--c-line-strong)] pt-10">
              {fund.facts.map((f) => (
                <RevealItem key={f.labelMn}>
                  <p className="t-numeral text-4xl text-on-strong md:text-5xl">
                    {f.numeric != null ? (
                      <Counter value={f.numeric} decimals={f.numeric % 1 !== 0 ? 2 : 0} />
                    ) : (
                      f.value
                    )}
                  </p>
                  <p className="eyebrow mt-3 text-on-strong-subtle">{pick(locale, f.labelMn, f.labelEn)}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <Reveal delay={0.16} className="mt-14 max-w-2xl border-l-2 border-accent-on-dark/40 pl-6">
              <p className="font-display text-pretty text-[1.3rem] leading-snug text-on-strong-muted">
                {blurb}
              </p>
            </Reveal>
          )}

          <Reveal delay={0.22} className="mt-12 flex flex-wrap items-center gap-3">
            <a
              href="https://system.ic-invest.mn"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent px-7 py-3 text-[0.9rem] font-medium text-accent-contrast transition-all duration-500 hover:brightness-110"
            >
              {pick(locale, "Нэвтрэх", "Login")}
            </a>
            <Link
              href="/#contact"
              className="rounded-full border border-[color:var(--c-line-strong)] px-7 py-3 text-[0.9rem] font-medium text-on-strong transition-colors duration-500 hover:border-accent-on-dark"
            >
              {pick(locale, "Холбоо барих", "Contact us")}
            </Link>
            <Link
              href="#calculator"
              className="rounded-full border border-[color:var(--c-line-strong)] px-7 py-3 text-[0.9rem] font-medium text-on-strong transition-colors duration-500 hover:border-accent-on-dark"
            >
              {pick(locale, "Тооцоолуур", "Calculator")}
            </Link>
            {fund.externalSite && (
              <a
                href={`https://${fund.externalSite}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 px-3 py-3 text-[0.9rem] text-on-strong-muted transition-colors duration-300 hover:text-accent-on-dark"
              >
                {fund.externalSite}
                <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </Reveal>
        </div>
      </section>

      {/* body — description */}
      <section className="theme-fade bg-surface">
        <div className="container-page py-20 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal>
                <p className="eyebrow text-accent">{pick(locale, "Сангийн тухай", "About this fund")}</p>
              </Reveal>
              <div className="mt-6 space-y-5">
                {paragraphs.map((p, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <p className="t-body max-w-prose text-pretty text-fg-muted">{p}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.1} className="mt-14 border-t hairline pt-6">
                <p className="t-small max-w-2xl text-pretty text-fg-subtle">
                  {pick(
                    locale,
                    'Сангийн удирдлагыг хариуцдаг "Инвескор Ассет Менежмент ҮЦК" ХХК нь Санхүүгийн Зохицуулах Хорооноос 2022 оны 4 дүгээр сарын 6-нд олгосон тусгай зөвшөөрөл, гэрчилгээ №309/41-тэй.',
                    'Managed by Invescore Asset Management SC LLC, licensed by the Financial Regulatory Commission on 6 April 2022, certificate no. 309/41.'
                  )}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-4">
              <Reveal delay={0.1}>
                <p className="eyebrow text-fg-subtle">{pick(locale, "Бусад сангууд", "Other funds")}</p>
                <div className="mt-6 flex flex-col gap-3">
                  {fund.otherFunds.map((f) => (
                    <Link
                      key={f.slug}
                      href={`/funds/${f.slug}`}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-[color:var(--c-line-strong)] bg-surface-alt/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
                    >
                      <span>
                        <span className="eyebrow block text-fg-subtle">{f.code}</span>
                        <span className="t-small mt-1 block max-w-[22ch] text-pretty text-fg">
                          {pick(locale, f.name, f.nameEn)}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border hairline text-fg-subtle transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:border-accent group-hover:text-accent"
                      >
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.2} className="mt-3">
                <div className="relative overflow-hidden rounded-2xl border border-[color:var(--c-line-strong)] bg-card p-7">
                  <div className="pointer-events-none absolute inset-0 z-0">
                    <DotField
                      dotRadius={1.2}
                      dotSpacing={16}
                      cursorRadius={160}
                      cursorForce={0.07}
                      bulgeStrength={32}
                      glowRadius={140}
                      gradientFrom="rgba(111,191,163,0.35)"
                      gradientTo="rgba(74,157,129,0.12)"
                      glowColor="#6fbfa3"
                    />
                  </div>
                  <p className="relative z-10 eyebrow text-fg-subtle">
                    {pick(locale, "Сонирхож байна уу", "Interested?")}
                  </p>
                  <p className="font-display relative z-10 mt-3 text-pretty text-[1.15rem] leading-snug text-fg">
                    {pick(
                      locale,
                      "Хөрөнгө оруулалтын талаар зөвлөгөө авахыг хүсвэл бидэнтэй холбогдоно уу.",
                      "Reach out for guidance on investing in this fund."
                    )}
                  </p>
                  <Link
                    href="/#contact"
                    className="group relative z-10 mt-6 inline-flex items-center gap-2.5 text-[0.9rem] font-medium text-accent"
                  >
                    {pick(locale, "Холбоо барих", "Contact us")}
                    <span
                      aria-hidden
                      className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <FundCalculator
        fund={{
          name: fund.name,
          code: fund.code,
          nav: fund.facts.find((fact) => fact.numeric != null)?.numeric ?? null,
        }}
      />
    </>
  );
}
