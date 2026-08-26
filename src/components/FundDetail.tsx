"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { SplitReveal } from "./ui/SplitReveal";
import { Counter } from "./ui/Counter";
import { useLocale, pick } from "@/lib/locale";

export type FundFactRow = { labelMn: string; labelEn: string; value: string; numeric: number | null };

export type FundDetailData = {
  sid: number;
  slug: string;
  code: string;
  labelMn: string;
  labelEn: string;
  name: string;
  descriptionMn: string;
  descriptionEn: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  facts: FundFactRow[];
  externalSite?: string;
  otherFunds: { slug: string; name: string; code: string }[];
};

export function FundDetail({ fund }: { fund: FundDetailData }) {
  const { locale } = useLocale();
  const description = pick(locale, fund.descriptionMn, fund.descriptionEn);
  const paragraphs = description.split("\n\n").filter(Boolean);

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
              className="link-underline eyebrow text-on-strong-subtle transition-colors duration-300 hover:text-accent-on-dark"
            >
              ← {pick(locale, "Хөрөнгө оруулалтын сан", "Our funds")}
            </Link>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <Reveal delay={0.05}>
                <div
                  className="inline-flex h-20 items-center rounded-2xl px-7 py-4"
                  style={{ background: "var(--bone-100)" }}
                >
                  <div className="relative h-full w-40">
                    <Image
                      src={fund.logo}
                      alt={fund.name}
                      fill
                      sizes="200px"
                      className="object-contain object-left"
                    />
                  </div>
                </div>
              </Reveal>

              <p className="eyebrow mt-8 text-accent-on-dark">{fund.code}</p>
              <h1 className="t-h2 mt-4 max-w-[22ch] text-balance text-on-strong">
                <SplitReveal text={fund.name} />
              </h1>
              <Reveal delay={0.12}>
                <p className="t-body mt-6 max-w-xl text-pretty text-on-strong-muted">
                  {pick(locale, fund.labelMn, fund.labelEn)}
                </p>
              </Reveal>

              <Reveal delay={0.18} className="mt-9 flex flex-wrap items-center gap-3">
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

            {fund.facts.length > 0 && (
              <div className="lg:col-span-4">
                <RevealGroup className="flex flex-col divide-y divide-[color:var(--c-line-strong)] rounded-2xl border border-[color:var(--c-line-strong)] bg-white/[0.03] p-2">
                  {fund.facts.map((f) => (
                    <RevealItem key={f.labelMn} className="px-5 py-5">
                      <p className="eyebrow text-on-strong-subtle">{pick(locale, f.labelMn, f.labelEn)}</p>
                      <p className="t-numeral mt-2 text-2xl text-on-strong">
                        {f.numeric != null ? (
                          <Counter value={f.numeric} decimals={f.numeric % 1 !== 0 ? 2 : 0} />
                        ) : (
                          f.value
                        )}
                      </p>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            )}
          </div>
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
            </div>

            <div className="lg:col-span-4">
              <Reveal delay={0.1}>
                <p className="eyebrow text-fg-subtle">{pick(locale, "Бусад сангууд", "Other funds")}</p>
                <ul className="mt-6 space-y-1">
                  {fund.otherFunds.map((f) => (
                    <li key={f.slug} className="border-t hairline first:border-t-0">
                      <Link
                        href={`/funds/${f.slug}`}
                        className="group flex items-center justify-between gap-4 py-4"
                      >
                        <span>
                          <span className="eyebrow block text-fg-subtle">{f.code}</span>
                          <span className="t-small mt-1 block max-w-[22ch] text-pretty text-fg">{f.name}</span>
                        </span>
                        <span
                          aria-hidden
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border hairline text-fg-subtle transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:border-accent group-hover:text-accent"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
