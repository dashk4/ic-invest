"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Briefcase,
  ExternalLink,
  FileText,
  PieChart,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { SplitReveal } from "./ui/SplitReveal";
import { Counter } from "./ui/Counter";
import DotField from "./ui/DotField";
import { useLocale, pick } from "@/lib/locale";
import {
  excerpt,
  type ApproachItem,
  type CommitteeManager,
  type FundDocument,
  type FundManager,
  type NewsItem,
  type PartnerItem,
  type PerformanceItem,
  type PortfolioChart,
  type PortfolioItem,
  numericValue,
  uploadUrl,
} from "@/lib/api";
import { FundCalculator } from "./FundCalculator";

const ICONS = [Briefcase, ShieldCheck, TrendingUp, Users, PieChart];
const MN_MONTHS = [
  "1-р сар",
  "2-р сар",
  "3-р сар",
  "4-р сар",
  "5-р сар",
  "6-р сар",
  "7-р сар",
  "8-р сар",
  "9-р сар",
  "10-р сар",
  "11-р сар",
  "12-р сар",
];
const EN_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type FundFactRow = { labelMn: string; labelEn: string; value: string; numeric: number | null };

export type FundLiveData = {
  managers: FundManager[];
  committeeManagers: CommitteeManager[];
  portfolio: PortfolioItem[];
  portfolioChart: PortfolioChart | null;
  performance: PerformanceItem[];
  approach: ApproachItem[];
  partners: PartnerItem[];
  documents: FundDocument[];
  serviceNews: NewsItem[];
};

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
  logo?: string;
  logoWidth?: number;
  logoHeight?: number;
  logoOnDark: boolean;
  logoScale: number;
  facts: FundFactRow[];
  externalSite?: string;
  otherFunds: { slug: string; name: string; nameEn: string; code: string }[];
  live: FundLiveData;
};

function formatDate(value: string, locale: string) {
  const date = new Date(value.includes("T") ? value : value.replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return value;
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return locale === "en"
    ? `${EN_MONTHS[month]} ${day}, ${year}`
    : `${year} оны ${MN_MONTHS[month]}ын ${day}`;
}

function formatNumber(value: number | string | null | undefined) {
  const number = typeof value === "string" ? numericValue(value) : value;
  if (number == null || !Number.isFinite(number)) return "—";
  return number.toLocaleString("en-US");
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function FundLiveSections({ fund }: { fund: FundDetailData }) {
  const { locale } = useLocale();
  const live = fund.live;
  const people = [...live.managers, ...live.committeeManagers];
  const hasPortfolio = live.portfolio.length > 0 || Boolean(live.portfolioChart?.labels?.length);
  const hasPerformance = live.performance.length > 0 || live.approach.length > 0;
  const hasResources = live.partners.length > 0 || live.documents.length > 0 || live.serviceNews.length > 0;

  if (people.length === 0 && !hasPortfolio && !hasPerformance && !hasResources) return null;

  const chart = live.portfolioChart;
  const chartLabels = chart?.labels ?? [];
  const chartData = chart?.datas ?? [];
  const chartColors = chart?.colors ?? [];
  const chartValues = chartData.map((value) => numericValue(String(value)) ?? 0).filter(Number.isFinite);
  const chartMax = Math.max(...chartValues, 1);

  return (
    <section className="theme-fade border-t hairline bg-surface">
      <div className="container-page space-y-20 py-20 md:py-24">
        {people.length > 0 && (
          <section>
            <Reveal>
              <p className="eyebrow text-accent">{pick(locale, "Удирдлагын баг", "Management team")}</p>
              <h2 className="t-h3 mt-4 max-w-xl text-balance text-fg">
                {pick(locale, "Сангийн менежмент", "Fund management")}
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {people.map((person, index) => {
                const image = uploadUrl(person.image);
                return (
                  <Reveal key={`${person.id}-${index}`} delay={index * 0.05}>
                    <article className="h-full rounded-2xl border border-[color:var(--c-line)] bg-card p-5">
                      <div className="flex items-center gap-4">
                        {image ? (
                          <Image
                            src={image}
                            alt={person.fullname}
                            width={56}
                            height={56}
                            className="h-14 w-14 rounded-full object-cover"
                          />
                        ) : (
                          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent/15 font-display text-sm text-accent">
                            {initials(person.fullname)}
                          </span>
                        )}
                        <div className="min-w-0">
                          <h3 className="font-display text-[1rem] text-fg">{person.fullname}</h3>
                          <p className="eyebrow mt-1 text-fg-subtle">{person.position}</p>
                        </div>
                      </div>
                      {person.description && (
                        <p className="t-small mt-5 text-fg-muted">{excerpt(person.description, 180)}</p>
                      )}
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </section>
        )}

        {hasPortfolio && (
          <section>
            <Reveal>
              <p className="eyebrow text-accent">{pick(locale, "Багцын бүтэц", "Portfolio")}</p>
              <h2 className="t-h3 mt-4 max-w-xl text-balance text-fg">
                {pick(locale, "Хөрөнгө оруулалтын бүтэц", "Investment structure")}
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
              {chartLabels.length ? (
                <Reveal className="rounded-2xl border border-[color:var(--c-line)] bg-card p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="eyebrow text-fg-subtle">{pick(locale, "Бүтцийн харьцаа", "Allocation")}</p>
                    <BarChart3 className="h-4 w-4 text-accent" strokeWidth={1.7} />
                  </div>
                  <div className="mt-7 flex h-48 items-end gap-2 border-b hairline pb-0">
                    {chartLabels.map((label, index) => {
                      const value = numericValue(String(chartData[index] ?? 0)) ?? 0;
                      const height = Math.max((value / chartMax) * 100, value > 0 ? 4 : 0);
                      const color = chartColors[index] || "var(--jade-400)";
                      return (
                        <div key={`${label}-${index}`} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2">
                          <span className="t-small text-fg-muted">{formatNumber(value)}%</span>
                          <div className="w-full max-w-12 rounded-t-lg" style={{ height: `${height}%`, background: color }} />
                          <span className="w-full truncate text-center text-[0.65rem] text-fg-subtle" title={label}>
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </Reveal>
              ) : null}
              {live.portfolio.length > 0 && (
                <Reveal delay={0.08} className="overflow-hidden rounded-2xl border border-[color:var(--c-line)] bg-card">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-4 border-b hairline px-5 py-4 text-[0.7rem] uppercase tracking-[0.12em] text-fg-subtle">
                    <span>{pick(locale, "Хөрөнгө", "Holding")}</span>
                    <span>{pick(locale, "Жин", "Weight")}</span>
                    <span>{pick(locale, "Өгөөж", "Return")}</span>
                  </div>
                  <div className="divide-y divide-[color:var(--c-line)]">
                    {live.portfolio.map((item) => (
                      <div key={item.id} className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-4 px-5 py-4">
                        <div className="min-w-0">
                          <p className="truncate font-display text-[0.95rem] text-fg">{item.bond}</p>
                          <p className="mt-1 truncate text-[0.72rem] text-fg-subtle">{item.sector?.name ?? "—"}</p>
                        </div>
                        <span className="t-small text-fg-muted">{formatNumber(item.bond_weight)}%</span>
                        <span className="t-small text-fg-muted">{formatNumber(item.yearly_profit)}%</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>
          </section>
        )}

        {hasPerformance && (
          <section className="grid gap-10 lg:grid-cols-2">
            {live.performance.length > 0 && (
              <div>
                <Reveal>
                  <p className="eyebrow text-accent">{pick(locale, "Гүйцэтгэл", "Performance")}</p>
                  <h2 className="t-h3 mt-4 text-fg">{pick(locale, "Сангийн үзүүлэлт", "Fund metrics")}</h2>
                </Reveal>
                <div className="mt-7 divide-y divide-[color:var(--c-line)] border-y border-[color:var(--c-line)]">
                  {live.performance.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-5 py-4">
                      <span className="t-small text-fg-muted">{item.name}</span>
                      <span className="font-display text-lg text-fg">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {live.approach.length > 0 && (
              <div>
                <Reveal>
                  <p className="eyebrow text-accent">{pick(locale, "Хөрөнгө оруулалтын аргачлал", "Approach")}</p>
                  <h2 className="t-h3 mt-4 text-fg">{pick(locale, "Бидний аргачлал", "Our approach")}</h2>
                </Reveal>
                <div className="mt-7 space-y-3">
                  {live.approach.map((item) => (
                    <article key={item.id} className="rounded-2xl border border-[color:var(--c-line)] bg-card p-5">
                      <h3 className="font-display text-[1rem] text-fg">{item.name}</h3>
                      <p className="t-small mt-3 text-fg-muted">{excerpt(item.text, 260)}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {hasResources && (
          <section className="grid gap-10 lg:grid-cols-3">
            {live.documents.length > 0 && (
              <div className="lg:col-span-1">
                <Reveal>
                  <p className="eyebrow text-accent">{pick(locale, "Файлууд", "Documents")}</p>
                  <h2 className="t-h3 mt-4 text-fg">{pick(locale, "Сангийн материал", "Fund resources")}</h2>
                </Reveal>
                <div className="mt-7 space-y-3">
                  {live.documents.map((document) => (
                    <a
                      key={document.id}
                      href={`https://ic-invest.mn/mn/service/document/download/${document.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-[color:var(--c-line)] bg-card p-4 transition-colors hover:border-accent/40"
                    >
                      <FileText className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.7} />
                      <span className="min-w-0 flex-1 truncate text-sm text-fg">{document.name}</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5" strokeWidth={1.7} />
                    </a>
                  ))}
                </div>
              </div>
            )}
            {live.partners.length > 0 && (
              <div>
                <Reveal>
                  <p className="eyebrow text-accent">{pick(locale, "Оролцогчид", "Partners")}</p>
                  <h2 className="t-h3 mt-4 text-fg">{pick(locale, "Хамтрагч байгууллагууд", "Our partners")}</h2>
                </Reveal>
                <div className="mt-7 grid grid-cols-2 gap-3">
                  {live.partners.map((partner) => {
                    const logo = uploadUrl(partner.logo);
                    const content = (
                      <div className="flex h-24 items-center justify-center rounded-xl border border-[color:var(--c-line)] bg-card p-4">
                        {logo ? (
                          <Image src={logo} alt={partner.name} width={150} height={64} className="max-h-12 w-auto object-contain" />
                        ) : (
                          <span className="text-center text-sm text-fg-muted">{partner.name}</span>
                        )}
                      </div>
                    );
                    return partner.website ? (
                      <a key={partner.id} href={partner.website} target="_blank" rel="noopener noreferrer" aria-label={partner.name}>
                        {content}
                      </a>
                    ) : (
                      <div key={partner.id}>{content}</div>
                    );
                  })}
                </div>
              </div>
            )}
            {live.serviceNews.length > 0 && (
              <div>
                <Reveal>
                  <p className="eyebrow text-accent">{pick(locale, "Мэдээ", "News")}</p>
                  <h2 className="t-h3 mt-4 text-fg">{pick(locale, "Сангийн мэдээ", "Fund news")}</h2>
                </Reveal>
                <div className="mt-7 space-y-3">
                  {live.serviceNews.map((item) => (
                    <article key={item.id} className="rounded-xl border border-[color:var(--c-line)] bg-card p-4">
                      <p className="eyebrow text-fg-subtle">
                        {item.published_at || item.created_at ? formatDate(item.published_at ?? item.created_at ?? "", locale) : ""}
                      </p>
                      <h3 className="mt-2 line-clamp-2 font-display text-[0.95rem] leading-snug text-fg">{item.title}</h3>
                      <p className="t-small mt-2 line-clamp-3 text-fg-muted">{excerpt(item.content, 150)}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </section>
  );
}

export function FundDetail({ fund }: { fund: FundDetailData }) {
  const { locale } = useLocale();
  const description = pick(locale, fund.descriptionMn, fund.descriptionEn);
  const paragraphs = description
    .split(/\n\s*\n/)
    .map((paragraph) => excerpt(paragraph, 900))
    .filter(Boolean);
  const blurb = pick(locale, fund.blurbMn, fund.blurbEn);
  const Icon = ICONS[fund.index % ICONS.length];

  return (
    <>
      {/* banner — same dark/grain treatment as the funds section on the homepage */}
      <section className="theme-fade relative overflow-hidden bg-surface-strong pb-24 pt-28 text-on-strong md:pt-36">
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

          <div className="mt-14 grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.82fr] lg:gap-20">
            <Reveal delay={0.05} className="order-2 lg:order-2">
              {!fund.logo ? (
                // no brand mark supplied yet for this fund — a clean
                // typographic treatment instead of a placeholder image or
                // (worse) another fund's logo
                <div className="relative flex h-[18rem] w-full items-center justify-center overflow-hidden rounded-[2rem] border border-accent-on-dark/25 bg-[radial-gradient(circle_at_50%_45%,rgba(111,191,163,0.16),rgba(255,255,255,0.025)_48%,transparent_72%)] shadow-[0_30px_90px_rgba(0,0,0,0.25)] p-10">
                  <span aria-hidden className="absolute right-7 top-7 font-display text-5xl text-on-strong/[0.06]">{String(fund.index + 1).padStart(2, "0")}</span>
                  <p className="relative text-balance text-center font-display text-[1.9rem] leading-tight text-on-strong">
                    {fund.name}
                  </p>
                </div>
              ) : fund.logoOnDark ? (
                <div className="relative flex h-[18rem] w-full items-center justify-center overflow-hidden rounded-[2rem] border border-accent-on-dark/25 bg-[radial-gradient(circle_at_50%_45%,rgba(111,191,163,0.16),rgba(255,255,255,0.025)_48%,transparent_72%)] shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
                  <span aria-hidden className="absolute right-7 top-7 font-display text-5xl text-on-strong/[0.06]">{String(fund.index + 1).padStart(2, "0")}</span>
                  <Image
                    src={fund.logo}
                    alt={fund.name}
                    fill
                    sizes="576px"
                    className="object-contain object-center p-10"
                    style={fund.logoScale !== 1 ? { transform: `scale(${fund.logoScale})` } : undefined}
                  />
                </div>
              ) : (
                // a plain white patch just big enough for the mark — no
                // rounded card edges, so it reads as the logo's own light
                // background rather than a boxed UI frame sitting behind it
                <div
                  className="relative flex h-[18rem] w-full items-center justify-center overflow-hidden rounded-[2rem] border border-accent-on-dark/25 bg-[radial-gradient(circle_at_50%_45%,rgba(111,191,163,0.16),rgba(255,255,255,0.025)_48%,transparent_72%)]"
                  style={{ background: "var(--bone-100)" }}
                >
                  <div className="relative h-28 w-72">
                    <Image
                      src={fund.logo}
                      alt={fund.name}
                      fill
                      sizes="288px"
                      className="object-contain object-center"
                    />
                  </div>
                </div>
              )}
            </Reveal>

            <div className="order-1 lg:order-1">
            <div className="flex items-center gap-2.5">
              <Icon className="h-4 w-4 text-accent-on-dark" strokeWidth={1.8} />
              <p className="eyebrow text-accent-on-dark">{fund.code}</p>
            </div>
            <h1 className="t-h2 mt-5 max-w-2xl text-balance text-on-strong">
              <SplitReveal text={fund.name} />
            </h1>
            <Reveal delay={0.12}>
              <p className="t-body mt-6 max-w-xl border-l-2 border-accent-on-dark/45 pl-5 text-pretty text-on-strong-muted">
                {pick(locale, fund.labelMn, fund.labelEn)}
              </p>
            </Reveal>

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
              className="rounded-lg bg-accent px-7 py-3 text-[0.9rem] font-medium text-accent-contrast transition-all duration-500 hover:-translate-y-0.5 hover:brightness-110"
            >
              {pick(locale, "Нэвтрэх", "Login")}
            </a>
            <Link
              href="/#contact"
              className="rounded-lg border border-[color:var(--c-line-strong)] px-7 py-3 text-[0.9rem] font-medium text-on-strong transition-all duration-500 hover:-translate-y-0.5 hover:border-accent-on-dark hover:bg-white/[0.04]"
            >
              {pick(locale, "Холбоо барих", "Contact us")}
            </Link>
            <Link
              href="#calculator"
              className="rounded-lg border border-[color:var(--c-line-strong)] px-7 py-3 text-[0.9rem] font-medium text-on-strong transition-all duration-500 hover:-translate-y-0.5 hover:border-accent-on-dark hover:bg-white/[0.04]"
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
        </div>
        </div>
      </section>

      {/* body — description */}
      <section className="theme-fade border-t hairline bg-surface">
        <div className="container-page py-20 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal>
                <p className="eyebrow text-accent">{pick(locale, "Сангийн тухай", "About this fund")}</p>
                <h2 className="t-h3 mt-5 max-w-xl text-balance text-fg">
                  {pick(locale, "Урт хугацааны үнэ цэнэ бүтээх хөрөнгө оруулалт", "Investing for long-term value")}
                </h2>
              </Reveal>
              <div className="mt-8 space-y-6">
                {paragraphs.map((p, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <p className={`${i === 0 ? "t-lead text-fg" : "t-body text-fg-muted"} max-w-prose text-pretty`}>{p}</p>
                  </Reveal>
                ))}
              </div>

            </div>

            <div className="lg:col-span-4">
              <Reveal delay={0.1}>
                <p className="eyebrow text-fg-subtle">{pick(locale, "Бусад сангууд", "Other funds")}</p>
                <div className="mt-6 flex flex-col gap-3">
                  {fund.otherFunds.map((f) => (
                    <Link
                      key={f.slug}
                      href={`/funds/${f.slug}`}
                      className="group flex items-center justify-between gap-4 rounded-xl border border-[color:var(--c-line-strong)] bg-surface-alt/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface-alt"
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
                <div className="relative overflow-hidden rounded-xl border border-[color:var(--c-line-strong)] bg-card p-7">
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

      <FundLiveSections fund={fund} />

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
