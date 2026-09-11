"use client";

import { HandshakeIcon, ImageIcon, Leaf, Sprout } from "lucide-react";
import { SectionHead } from "./ui/SectionHead";
import { Reveal } from "./ui/Reveal";
import { SplitReveal } from "./ui/SplitReveal";
import { TeamGrid } from "./ui/TeamGrid";
import { useLocale, pick } from "@/lib/locale";

const INTRO_PARAGRAPHS: { mn: string; en: string }[] = [
  {
    mn: "Инвескор Ассет Менежмент ХХК нь хөрөнгө оруулагчдын санхүүгийн зорилго, урт хугацааны үнэ цэнийг дэмжих мэргэжлийн хөрөнгө оруулалтын шийдлийг бий болгож, хөрөнгийн үр ашигтай удирдах чиглэлээр үйл ажиллагаа явуулдаг хөрөнгө оруулалтын менежментийн компани юм.",
    en: "Invescore Asset Management LLC is an asset management company that builds professional investment solutions supporting investors' financial goals and long-term value, focused on managing capital efficiently.",
  },
  {
    mn: "Бид 2022 онд Санхүүгийн зохицуулах хорооноос хөрөнгө оруулалтын менежментийн үйл ажиллагаа эрхлэх тусгай зөвшөөрөл авч, Монгол Улсын хөрөнгийн зах зээлд мэргэжлийн, ил тод, хариуцлагатай хөрөнгө оруулалтын менежментийн үйлчилгээг хөгжүүлэх зорилгоор үйл ажиллагаагаа өргөжүүлэн ажиллаж байна.",
    en: "In 2022, we received a license from the Financial Regulatory Commission to operate as an asset management company, and have since been expanding our operations to develop professional, transparent and accountable asset management services for Mongolia's capital market.",
  },
  {
    mn: "Бид хөрөнгө оруулагчдын хэрэгцээ, эрсдэлийн түвшин болон санхүүгийн зорилгод нийцсэн хөрөнгө оруулалтын бүтээгдэхүүн, шийдлийг хөгжүүлэхийн зэрэгцээ дотоод, гадаадын хөрөнгийн зах зээлийн боломжийг Монголын хөрөнгө оруулагчдад хүртээмжтэй хүргэхийг зорьдог.",
    en: "Alongside developing investment products and solutions matched to each investor's needs, risk tolerance and financial goals, we aim to make domestic and international capital market opportunities accessible to Mongolian investors.",
  },
  {
    mn: 'Энэ хүрээнд 2023 онд Монголын анхны биржээр арилжаалагддаг хөрөнгө оруулалтын сан болох "Инвескор Глобал Кью" санг зах зээлд нэвтрүүлж, Монголын хөрөнгө оруулагчдад дэлхийн тэргүүлэх компаниудад дотоодын хөрөнгийн зах зээлээр дамжуулан хөрөнгө оруулах шинэ боломжийг бий болгосон.',
    en: 'In 2023, we launched "Invescore Global Q" — Mongolia\'s first exchange-traded fund — giving Mongolian investors a new way to invest in the world\'s leading companies through the domestic capital market.',
  },
  {
    mn: "Өнөөдөр Инвескор Ассет Менежмент нь хамтын болон хувийн хөрөнгө оруулалтын сангуудыг удирдан, хөрөнгө оруулагчдын хэрэгцээнд нийцсэн бүтээгдэхүүн, үйлчилгээг хөгжүүлэхийн зэрэгцээ хөрөнгө оруулалтын судалгаа, эрсдэлийн удирдлага, мэргэжлийн засаглалд тулгуурласан хөрөнгө удирдлагын тогтолцоог тасралтгүй бэхжүүлэн ажиллаж байна.",
    en: "Today, Invescore Asset Management manages both mutual and private investment funds, developing products and services matched to investors' needs while continuously strengthening an asset management system built on investment research, risk management and professional governance.",
  },
  {
    mn: "Бидний зорилго бол хөрөнгө оруулагчдын итгэлийг урт хугацаанд хадгалж, эрсдэл болон өгөөжийн зохистой тэнцвэрийг хангах замаар тогтвортой үнэ цэнийг бий болгох, Монголын хөрөнгө оруулалтын салбарын хөгжилд бодит хувь нэмэр оруулах явдал юм.",
    en: "Our goal is to earn investors' trust for the long term, create sustainable value by maintaining a sound balance between risk and return, and make a real contribution to the development of Mongolia's investment industry.",
  },
];

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

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-5 lg:col-span-7">
            {INTRO_PARAGRAPHS.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="t-body text-pretty text-fg-muted">
                  {pick(locale, p.mn, p.en)}
                </p>
              </Reveal>
            ))}
            <Reveal delay={INTRO_PARAGRAPHS.length * 0.05}>
              <p className="font-display text-pretty text-[1.1rem] text-fg">
                {pick(
                  locale,
                  "Таны зорилго. Бидний туршлага. Хамтын үнэ цэнэ.",
                  "Your goals. Our experience. Shared value.",
                )}
              </p>
            </Reveal>
          </div>

          {/* Real office photo pending — placeholder keeps the two-column
              layout balanced until one is supplied. */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="flex aspect-[4/5] w-full items-center justify-center rounded-2xl border hairline bg-surface-sunken/60 lg:h-full lg:aspect-auto">
              <ImageIcon
                className="h-8 w-8 text-fg-subtle/40"
                strokeWidth={1.3}
              />
            </div>
          </Reveal>
        </div>

        <div id="vision" className="mt-24 scroll-mt-28">
          <Reveal>
            <p className="eyebrow text-accent">
              {pick(locale, "Алсын хараа", "Vision")}
            </p>
          </Reveal>
          <div className="mt-6 max-w-3xl border-l-2 border-accent/40 pl-6 md:pl-8">
            <p className="t-lead text-pretty text-fg">
              {pick(
                locale,
                "Хөрөнгө оруулагчдын зорилго, эрсдэлийн түвшинд хамгийн тохиромжтой хөрөнгө оруулалтыг санал болгох мэдлэг туршлагатай, чадварлаг баг хамт олон.",
                "A knowledgeable, capable team recommending the investment best suited to each investor's goals and risk tolerance.",
              )}
            </p>
          </div>
        </div>

        <div id="philosophy" className="mt-24 scroll-mt-28">
          <Reveal>
            <p className="eyebrow text-accent">
              {pick(locale, "Үнэт зүйл", "Values")}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-10 md:grid-cols-3 md:divide-x md:divide-[color:var(--c-line)]">
            <Reveal delay={0} className="md:pr-8 lg:pr-10">
              <HandshakeIcon className="h-5 w-5 text-accent" strokeWidth={1.6} />
              <h3 className="font-display mt-4 text-[1.1rem] text-fg">
                {pick(locale, "Найдвартай байдал", "Managing with trust")}
              </h3>
              <p className="t-small mt-3 text-pretty text-fg-muted">
                {pick(
                  locale,
                  "Харилцагч, хамтрагчиддаа ил тод, шударга, урт хугацааны итгэлцэл бий болгоно.",
                  "Transparency, fairness and enduring trust with clients and partners.",
                )}
              </p>
            </Reveal>

            <Reveal delay={0.08} className="md:px-8 lg:px-10">
              <Sprout className="h-5 w-5 text-accent" strokeWidth={1.6} />
              <h3 className="font-display mt-4 text-[1.1rem] text-fg">
                {pick(locale, "Тогтвортой хөгжил", "Sustainability at its core")}
              </h3>
              <p className="t-small mt-3 text-pretty text-fg-muted">
                {pick(
                  locale,
                  "Байгаль орчин, нийгэмд ээлтэй, урт хугацааны хамтын ажиллагаанд суурилан ажиллана.",
                  "Environmentally and socially responsible long-term investing.",
                )}
              </p>
            </Reveal>

            <Reveal delay={0.16} className="md:pl-8 lg:pl-10">
              <Leaf className="h-5 w-5 text-accent" strokeWidth={1.6} />
              <h3 className="font-display mt-4 text-[1.1rem] text-fg">
                {pick(locale, "Нөлөөллийн хөрөнгө оруулалт", "Impact investing")}
              </h3>
              <p className="t-small mt-3 text-pretty text-fg-muted">
                {pick(
                  locale,
                  "Байгаль орчин, нийгэм, засаглалын үзүүлэлтүүдэд эерэг нөлөөлөл үзүүлэх нөлөөллийн хөрөнгө оруулалтын стратегийг хэрэгжүүлэгч.",
                  "Integrating financial analysis with environmental, social and governance insight to find solutions that deliver both performance and tangible impact.",
                )}
              </p>
            </Reveal>
          </div>
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
