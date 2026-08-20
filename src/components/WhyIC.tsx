"use client";

import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { SplitReveal } from "./ui/SplitReveal";
import { useLocale, pick } from "@/lib/locale";

const REASONS = [
  {
    n: "01",
    mnTitle: "Монголын зах зээлийн гүнзгий мэдлэг",
    enTitle: "Deep knowledge of the Mongolian market",
    mnText: "Монголын хөрөнгийн зах зээлд шилдэг туршлага нэвтрүүлсэн мэргэжлийн баг.",
    enText: "A professional team that introduced international best practice into the Mongolian capital market.",
  },
  {
    n: "02",
    mnTitle: "Инновацлаг бүтээгдэхүүн",
    enTitle: "Innovative products",
    mnText: "Монголын анхны орон нутгийн ETF сан болон нөлөөллийн хөрөнгө оруулалтын шийдлийг анх удаа нэвтрүүлсэн.",
    enText: "Launched Mongolia's first local ETF fund and its first impact investment fund.",
  },
  {
    n: "03",
    mnTitle: "Ил тод, шударга харилцаа",
    enTitle: "Transparent, fair dealing",
    mnText: "Харилцагч, хамтрагч нартаа ил тод, шударга, урт хугацааны итгэлцлийг бий болгоно.",
    enText: "Transparency, fairness, and building enduring trust with clients and partners.",
  },
  {
    n: "04",
    mnTitle: "Урт хугацааны түншлэл",
    enTitle: "Long-term partnership",
    mnText: "Хөрөнгө оруулагчдын санхүүгийн зорилгод тулгуурласан, тогтвортой харилцааг эрхэмлэнэ.",
    enText: "Steady relationships built around each investor's own financial goals.",
  },
  {
    n: "05",
    mnTitle: "Тогтвортой хөгжилд суурилсан хөрөнгө оруулалт",
    enTitle: "Sustainability-driven investing",
    mnText: "Байгаль орчин, нийгэмд ээлтэй, урт хугацааны хамтын ажиллагаанд суурилан ажиллана.",
    enText: "Pioneering environmentally and socially responsible long-term investments.",
  },
  {
    n: "06",
    mnTitle: "Зохицуулалттай, мэргэжлийн байгууллага",
    enTitle: "Licensed, professional institution",
    mnText: "Инвескор Ассет Менежмент ҮЦК — таны итгэмжит хамтрагч.",
    enText: "Invescore Asset Management SC LLC — your trusted partner.",
  },
];

export function WhyIC() {
  const { locale } = useLocale();

  return (
    <section className="theme-fade bg-surface-strong py-24 text-on-strong md:py-32">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-bronze-light">
            {pick(locale, "Яагаад IC?", "Why IC?")}
          </p>
        </Reveal>
        <h2 className="font-display mt-4 max-w-lg text-balance text-4xl font-medium leading-tight md:text-5xl">
          <SplitReveal text={pick(locale, "Ялгарах шалтгаанууд", "What sets us apart")} />
        </h2>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r) => (
            <RevealItem key={r.n} className="border-t border-line-strong pt-6">
              <span className="font-display text-sm text-bronze-light">{r.n}</span>
              <h3 className="font-display mt-4 text-xl font-medium leading-snug">
                {pick(locale, r.mnTitle, r.enTitle)}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-on-strong-muted">
                {pick(locale, r.mnText, r.enText)}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
