"use client";

import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { SplitReveal } from "./ui/SplitReveal";
import { useLocale, pick } from "@/lib/locale";

const PILLARS = [
  {
    n: "01",
    mnTitle: "Чадварлаг баг",
    enTitle: "A dedicated team",
    mnText:
      "Монголын хөрөнгийн зах зээлд шилдэг туршлага нэвтрүүлж, харилцагчдадаа үр өгөөж авчрахын төлөө мэдлэг, чадвар, туршлагаа хурцалж байх мэргэжлийн баг.",
    enText:
      "We are a team of dedicated professionals, channeling our passion and expertise to address the unique needs of our clients and introduce industry best practices into the Mongolian capital market.",
  },
  {
    n: "02",
    mnTitle: "Итгэмжтэй байдал",
    enTitle: "Managing with trust",
    mnText:
      "Инвескорын үндсэн үзэл баримтлалын дагуу харилцагч, хамтрагч нартаа ил тод, шударга, урт хугацааны итгэлцлийг бий болгоно.",
    enText:
      "Embodying the values and principles of the InvesCore Financial Group, with a focus on transparency, fairness, and building enduring trust with clients.",
  },
  {
    n: "03",
    mnTitle: "Тогтвортой хөгжил",
    enTitle: "Sustainability at its core",
    mnText:
      "Хөрөнгө оруулалтын ирээдүй нь байгаль орчин, нийгэмд ээлтэй, урт хугацааны хамтын ажиллагаанд суурилан ажиллана.",
    enText: "Pioneering environmentally and socially responsible long-term investments.",
  },
];

export function Philosophy() {
  const { locale } = useLocale();

  return (
    <section id="philosophy" className="theme-fade section-y bg-surface-alt">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          {/* sticky editorial column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="eyebrow text-accent">{pick(locale, "Бидний үнэт зүйл", "Our values")}</p>
              </Reveal>
              <h2 className="t-h2 mt-6 max-w-[12ch] text-balance text-fg">
                <SplitReveal text={pick(locale, "Бид хэрхэн ажилладаг вэ", "How we work")} />
              </h2>
              <Reveal delay={0.15}>
                <p className="t-body mt-8 max-w-sm text-pretty text-fg-muted">
                  {pick(
                    locale,
                    "Хөрөнгө оруулагчдын санхүүгийн зорилгод тулгуурласан, инновац шингээсэн үйлчилгээг хүргэж, зах зээлийг тэргүүлэгч байх нь бидний алсын хараа.",
                    "Lead the market by delivering innovative investment solutions aligned with each investor's financial goals."
                  )}
                </p>
              </Reveal>
            </div>
          </div>

          {/* scrolling list */}
          <RevealGroup className="lg:col-span-7" stagger={0.12}>
            {PILLARS.map((p) => (
              <RevealItem key={p.n}>
                <article className="group grid grid-cols-[auto_1fr] gap-6 border-t hairline py-10 first:border-t-0 first:pt-0 md:gap-10">
                  <span className="t-numeral pt-1 text-sm text-accent">{p.n}</span>
                  <div>
                    <h3 className="t-h3 text-fg">{pick(locale, p.mnTitle, p.enTitle)}</h3>
                    <p className="t-body mt-4 max-w-prose text-pretty text-fg-muted">
                      {pick(locale, p.mnText, p.enText)}
                    </p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
