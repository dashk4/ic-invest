"use client";

import { Layers, ShieldCheck, Users } from "lucide-react";
import { Counter } from "./ui/Counter";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { useLocale, pick } from "@/lib/locale";

const STATS = [
  {
    value: 5,
    raw: false,
    icon: Layers,
    mn: "Идэвхтэй хөрөнгө оруулалтын сан",
    en: "Active investment funds",
    subMn: "Хувийн, биржээр арилжаалагддаг, хамтын нээлттэй",
    subEn: "Private, exchange-traded and open-ended",
  },
  {
    value: 10,
    raw: false,
    icon: Users,
    mn: "Мэргэжлийн баг, ТУЗ-ийн хамт",
    en: "Professionals, board included",
    subMn: "Хөрөнгө оруулалт, эрсдэл, санхүүгийн чиглэлээр",
    subEn: "Across investment, risk and finance",
  },
  {
    value: 2022,
    raw: true,
    icon: ShieldCheck,
    mn: "СЗХ-ны тусгай зөвшөөрөл авсан",
    en: "Licensed by the FRC",
    subMn: "Гэрчилгээ №309/41, 2022.04.06",
    subEn: "Certificate No. 309/41, issued 6 April 2022",
  },
];

export function Stats() {
  const { locale } = useLocale();

  return (
    <section className="theme-fade relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,color-mix(in_srgb,var(--brand-navy)_7%,transparent),transparent_30rem)]" />
      <div className="container-page section-y relative">
        <div className="grid items-end gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-accent">
              {pick(locale, "Товч танилцуулга", "At a glance")}
            </p>
            <h2 className="mt-4 max-w-[18ch] font-display text-3xl leading-tight text-fg md:text-4xl">
              {pick(locale, "Биднийг илэрхийлэх гол үзүүлэлтүүд", "The figures behind our work")}
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8">
            <p className="t-body max-w-lg text-pretty text-fg-muted lg:justify-self-end">
              {pick(
                locale,
                "Туршлага, мэргэжлийн баг, зохицуулалттай үйл ажиллагааг нэг дороос.",
                "Experience, a professional team and regulated operations at a glance.",
              )}
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-10 grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
          {STATS.map((s, index) => {
            const Icon = s.icon;
            return (
              <RevealItem
                key={s.mn}
                className="surface-card group relative flex h-full min-h-[18rem] flex-col overflow-hidden rounded-[1.5rem] p-7 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-accent/35 md:p-8"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-4 -top-8 text-fg/[0.04] transition-colors duration-500 group-hover:text-accent/[0.08]"
                >
                  <Icon strokeWidth={1.2} className="h-32 w-32" />
                </span>

                <div className="relative flex items-center justify-between">
                  <span className="brand-icon flex h-11 w-11 items-center justify-center rounded-xl">
                    <Icon className="h-[19px] w-[19px]" strokeWidth={1.8} />
                  </span>
                  <span className="brand-chip rounded-full px-3 py-1.5 text-[0.68rem] font-bold tracking-[0.14em]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative mt-auto pt-12">
                  <div className="t-numeral text-5xl text-fg md:text-[4rem]">
                    {s.raw ? s.value : <Counter value={s.value} />}
                  </div>
                  <p className="t-small mt-4 max-w-[24ch] text-pretty text-fg-muted">
                    {pick(locale, s.mn, s.en)}
                  </p>
                  <p className="mt-2 max-w-[26ch] text-pretty text-[0.8rem] text-fg-subtle">
                    {pick(locale, s.subMn, s.subEn)}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
