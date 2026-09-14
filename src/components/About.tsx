"use client";

import Image from "next/image";
import { HandshakeIcon, Leaf, Sprout } from "lucide-react";
import { SectionHead } from "./ui/SectionHead";
import { Reveal } from "./ui/Reveal";
import { SplitReveal } from "./ui/SplitReveal";
import { TeamGrid } from "./ui/TeamGrid";
import { useLocale, pick } from "@/lib/locale";

const INTRO_HEADING = {
  mn: "Таны санхүүгийн зорилгод нийцсэн хөрөнгө удирдлага",
  en: "Asset Management Built Around Your Financial Goals",
};

const INTRO_PARAGRAPHS: { mn: string; en: string }[] = [
  {
    mn: '"Инвескор Ассет Менежмент" ХХК нь хөрөнгө оруулагчдын санхүүгийн зорилгод нийцсэн мэргэжлийн хөрөнгө оруулалтын шийдлийг хөгжүүлж, эрсдэл ба өгөөжийн зохистой тэнцвэрт тулгуурлан урт хугацааны үнэ цэн бүтээхийг зорьдог хөрөнгө оруулалтын менежментийн компани юм.',
    en: "Invescore Asset Management LLC is an asset management company that develops professional investment solutions matched to investors' financial goals, building long-term value on a sound balance of risk and return.",
  },
  {
    mn: "Бид 2022 онд Санхүүгийн зохицуулах хорооноос хөрөнгө оруулалтын менежментийн үйл ажиллагаа эрхлэх тусгай зөвшөөрөл авч, Монголын хөрөнгийн зах зээлд мэргэжлийн, ил тод, хариуцлагатай хөрөнгө удирдлагын үйлчилгээг хөгжүүлэх сууриа тавьсан. Түүнээс хойш дотоодын болон олон улсын хөрөнгийн зах зээлийн боломжийг хөрөнгө оруулагчдад хүргэх бүтээгдэхүүн, үйлчилгээг үе шаттайгаар хөгжүүлэн ажиллаж байна.",
    en: "In 2022, we received a license from the Financial Regulatory Commission to operate as an asset management company, laying the foundation for professional, transparent and accountable asset management services in Mongolia's capital market. Since then, we have been developing products and services in phases to bring domestic and international capital market opportunities to investors.",
  },
  {
    mn: 'Энэ хүрээнд 2023 онд Монголын анхны биржээр арилжаалагддаг хөрөнгө оруулалтын сан болох "Инвескор Глобал Кью" санг үүсгэн байгуулж, Монголын хөрөнгө оруулагчдад дотоодын хөрөнгийн зах зээлээр дамжуулан дэлхийн тэргүүлэх компаниудад хөрөнгө оруулах боломжийг нээсэн.',
    en: 'As part of this, in 2023 we established "Invescore Global Q" — Mongolia\'s first exchange-traded fund — opening a way for Mongolian investors to invest in the world\'s leading companies through the domestic capital market.',
  },
  {
    mn: '"Инвескор Ассет Менежмент" нь хамтын болон хувийн хөрөнгө оруулалтын сангуудыг удирдаж, хөрөнгө оруулагчдын хэрэгцээ, эрсдэлийн түвшин, санхүүгийн зорилгод нийцсэн хөрөнгө оруулалтын бүтээгдэхүүн, шийдлийг хөгжүүлэн ажиллаж байна. Бид хөрөнгө оруулалтын судалгаа, эрсдэлийн удирдлага, мэргэжлийн засаглалд тулгуурлан хөрөнгө удирдлагын тогтолцоогоо тасралтгүй бэхжүүлж байна.',
    en: "Today, Invescore Asset Management manages both mutual and private investment funds, developing investment products and solutions matched to investors' needs, risk tolerance and financial goals. We continuously strengthen our asset management framework, built on investment research, risk management and professional governance.",
  },
  {
    mn: "Бидний зорилго бол хөрөнгө оруулагчдын урт хугацааны итгэлийг бэхжүүлж, эрсдэл ба өгөөжийн зохистой тэнцвэрт тулгуурлан тогтвортой үнэ цэн бүтээхийн зэрэгцээ Монголын хөрөнгө оруулалтын салбарын хөгжилд бодит хувь нэмэр оруулах явдал юм.",
    en: "Our goal is to strengthen investors' trust over the long term, create sustainable value grounded in a sound balance of risk and return, and make a real contribution to the development of Mongolia's investment industry.",
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

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="font-display max-w-2xl text-pretty text-[1.15rem] uppercase leading-snug tracking-wide text-fg md:text-[1.3rem]">
                {pick(locale, INTRO_HEADING.mn, INTRO_HEADING.en)}
              </h2>
            </Reveal>
            <div className="mt-6 space-y-4">
              {INTRO_PARAGRAPHS.map((p, i) => (
                <Reveal key={i} delay={0.05 + i * 0.05}>
                  <p className="t-small text-pretty text-fg-muted">
                    {pick(locale, p.mn, p.en)}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="group relative aspect-[3/2] w-full overflow-hidden rounded-2xl border hairline bg-surface-sunken">
              <Image
                src="/brand/ic-tower-clean.png"
                alt="IC Tower"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1600ms] ease-out motion-reduce:transition-none group-hover:scale-[1.045]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100 motion-reduce:transition-none"
              />
            </div>
          </Reveal>
        </div>

        <div id="vision" className="mt-24 scroll-mt-28">
          <Reveal>
            <p className="eyebrow text-[0.85rem] tracking-[0.14em] text-accent">
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
            <p className="eyebrow text-[0.85rem] tracking-[0.14em] text-accent">
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
