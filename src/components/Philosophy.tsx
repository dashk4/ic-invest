"use client";

import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { SplitReveal } from "./ui/SplitReveal";
import { useLocale, pick } from "@/lib/locale";

const PILLARS = [
  {
    n: "01",
    mnTitle: "Чадварлаг баг",
    enTitle: "Dedicated team",
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
      "Embodying the values and principles of The InvesCore Financial Group, with a focus on transparency, fairness, and building enduring trust with clients.",
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
    <section id="philosophy" className="theme-fade bg-surface py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow text-accent">
                {pick(locale, "Бидний үнэт зүйл", "Our Values")}
              </p>
            </Reveal>
            <h2 className="font-display mt-4 max-w-lg text-balance text-4xl font-medium leading-tight text-fg md:text-5xl">
              <SplitReveal text={pick(locale, "Бид хэрхэн ажилладаг вэ", "How we work")} />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-base leading-relaxed text-fg-muted">
              {pick(
                locale,
                "Хөрөнгө оруулагчдын санхүүгийн зорилгод тулгуурлсан, инновац шингээсэн үйлчилгээг хүргэж, зах зээлийг тэргүүлэгч байх нь бидний алсын хараа.",
                "Lead the market by delivering innovative investment solutions aligned with investor's financial goals."
              )}
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {PILLARS.map((p) => (
            <RevealItem
              key={p.n}
              className="card-lift glow-ring group relative overflow-hidden rounded-3xl border hairline bg-surface-alt/50 p-9"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition-colors duration-700 group-hover:bg-accent/25" />
              <span className="font-display text-sm text-accent">{p.n}</span>
              <h3 className="font-display mt-5 text-2xl font-medium text-fg">
                {pick(locale, p.mnTitle, p.enTitle)}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-fg-muted">
                {pick(locale, p.mnText, p.enText)}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
