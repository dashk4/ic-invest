"use client";

import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { SectionHead } from "./ui/SectionHead";
import { useLocale, pick, type Locale } from "@/lib/locale";

type Member = { mn: string; mnTitle: string; en: string; enTitle: string };

const BOARD: Member[] = [
  { mn: "Р. Пүрэв", mnTitle: "ТУЗ-ийн дарга", en: "Purev Ralgaa", enTitle: "Chairman of the Board" },
  { mn: "Б. Энхбат", mnTitle: "ТУЗ-ийн хараат бус гишүүн", en: "Enkhbat Batsukh", enTitle: "Independent Board Member" },
  { mn: "С. Өнөр", mnTitle: "ТУЗ-ийн хараат бус гишүүн", en: "Unur Sukhbaatar", enTitle: "Independent Board Member" },
];

const MANAGEMENT: Member[] = [
  { mn: "Б. Мөнгөнзул", mnTitle: "Гүйцэтгэх захирал", en: "Mungunzul Badamvaanchig", enTitle: "Chief Executive Officer" },
  { mn: "Н. Буяндэлгэр", mnTitle: "Хөрөнгө оруулалт хариуцсан захирал", en: "Buyandelger Nyamkhuu", enTitle: "Head of Investment" },
  { mn: "О. Насанжаргал", mnTitle: "Ахлах хөрөнгө оруулалтын менежер", en: "Nasanjargal Odsuren", enTitle: "Senior Investment Manager" },
  { mn: "Г. Амарбаатар", mnTitle: "Хөрөнгө оруулалтын менежер", en: "Amarbaatar Ganbaatar", enTitle: "Investment Manager" },
  { mn: "Ү. Гончигболд", mnTitle: "Хөрөнгө оруулалтын менежер", en: "Gonchigbold Unenbat", enTitle: "Investment Manager" },
  { mn: "М. Даваажав", mnTitle: "Хуульч, комплаенсын менежер", en: "Davaajav Munkhjargal", enTitle: "Compliance Officer" },
  { mn: "С. Дэлгэрмаа", mnTitle: "Ерөнхий нягтлан бодогч", en: "Delgermaa Sangi-Ochir", enTitle: "General Accountant" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p.replace(".", "").charAt(0))
    .join("");
}

function Person({ member, locale }: { member: Member; locale: Locale }) {
  const name = pick(locale, member.mn, member.en);
  return (
    <div className="group flex items-baseline gap-5 border-b hairline py-6">
      <span className="t-numeral w-9 shrink-0 text-[0.8rem] text-fg-subtle transition-colors duration-500 group-hover:text-accent">
        {initials(locale === "en" ? member.en : member.mn)}
      </span>
      <div className="min-w-0">
        <p className="font-display text-[1.35rem] leading-snug text-fg">{name}</p>
        <p className="t-small mt-1 text-fg-muted">{pick(locale, member.mnTitle, member.enTitle)}</p>
      </div>
    </div>
  );
}

export function Team() {
  const { locale } = useLocale();

  return (
    <section id="team" className="theme-fade section-y bg-surface-alt">
      <div className="container-page">
        <SectionHead
          eyebrow={pick(locale, "Хамт олон", "Our team")}
          title={pick(locale, "Хөрөнгийн ард ажилладаг хүмүүс", "The people behind the capital")}
        />

        <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <h3 className="eyebrow border-b hairline pb-4 text-fg-subtle">
                {pick(locale, "Төлөөлөн удирдах зөвлөл", "Board of Directors")}
              </h3>
            </Reveal>
            <RevealGroup>
              {BOARD.map((p) => (
                <RevealItem key={p.mn}>
                  <Person member={p} locale={locale} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div>
            <Reveal>
              <h3 className="eyebrow border-b hairline pb-4 text-fg-subtle">
                {pick(locale, "Удирдлагын баг", "Management team")}
              </h3>
            </Reveal>
            <RevealGroup>
              {MANAGEMENT.map((p) => (
                <RevealItem key={p.mn}>
                  <Person member={p} locale={locale} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
