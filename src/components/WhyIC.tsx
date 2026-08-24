"use client";

import { RevealGroup, RevealItem } from "./ui/Reveal";
import { SectionHead } from "./ui/SectionHead";
import { useLocale, pick } from "@/lib/locale";

const REASONS = [
  {
    n: "01",
    mnTitle: "Зах зээлийн гүнзгий мэдлэг",
    enTitle: "Deep market knowledge",
    mnText: "Монголын хөрөнгийн зах зээлд шилдэг туршлага нэвтрүүлсэн мэргэжлийн баг.",
    enText: "A team that brought international best practice into the Mongolian capital market.",
  },
  {
    n: "02",
    mnTitle: "Инновацлаг бүтээгдэхүүн",
    enTitle: "Innovative products",
    mnText: "Монголын анхны орон нутгийн ETF болон нөлөөллийн хөрөнгө оруулалтын сан.",
    enText: "Mongolia's first local ETF fund and its first impact investment fund.",
  },
  {
    n: "03",
    mnTitle: "Ил тод, шударга байдал",
    enTitle: "Transparent and fair",
    mnText: "Харилцагч, хамтрагч нартаа ил тод, шударга, урт хугацааны итгэлцлийг бий болгоно.",
    enText: "Transparency, fairness, and enduring trust with clients and partners.",
  },
  {
    n: "04",
    mnTitle: "Урт хугацааны түншлэл",
    enTitle: "Long-term partnership",
    mnText: "Хөрөнгө оруулагчийн санхүүгийн зорилгод тулгуурласан тогтвортой харилцаа.",
    enText: "Steady relationships built around each investor's own financial goals.",
  },
  {
    n: "05",
    mnTitle: "Тогтвортой хөгжил",
    enTitle: "Sustainability-driven",
    mnText: "Байгаль орчин, нийгэмд ээлтэй, урт хугацааны хөрөнгө оруулалт.",
    enText: "Environmentally and socially responsible long-term investing.",
  },
  {
    n: "06",
    mnTitle: "Зохицуулалттай байгууллага",
    enTitle: "Licensed institution",
    mnText: "Инвескор Ассет Менежмент ҮЦК — таны итгэмжит хамтрагч.",
    enText: "Invescore Asset Management SC LLC — your trusted partner.",
  },
];

export function WhyIC() {
  const { locale } = useLocale();

  return (
    <section className="theme-fade section-y bg-surface">
      <div className="container-page">
        <SectionHead
          eyebrow={pick(locale, "Яагаад IC?", "Why IC?")}
          title={pick(locale, "Ялгарах шалтгаанууд", "What sets us apart")}
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-x-12 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r) => (
            <RevealItem key={r.n} className="border-t hairline py-9">
              <span className="t-numeral text-sm text-accent">{r.n}</span>
              <h3 className="t-h3 mt-5 text-fg">{pick(locale, r.mnTitle, r.enTitle)}</h3>
              <p className="t-small mt-3 text-pretty text-fg-muted">
                {pick(locale, r.mnText, r.enText)}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
