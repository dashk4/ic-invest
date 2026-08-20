"use client";

import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { SplitReveal } from "./ui/SplitReveal";
import { useLocale, pick } from "@/lib/locale";

const BOARD = [
  { mn: "Р. Пүрэв", mnTitle: "ТУЗ-ийн дарга", en: "Purev Ralgaa", enTitle: "Chairman of the Board" },
  { mn: "Б. Энхбат", mnTitle: "ТУЗ-ийн хараат бус гишүүн", en: "Enkhbat Batsukh", enTitle: "Board Member" },
  { mn: "С. Өнөр", mnTitle: "ТУЗ-ийн хараат бус гишүүн", en: "Unur Sukhbaatar", enTitle: "Board Member" },
];

const MANAGEMENT = [
  { mn: "Б. Мөнгөнзул", mnTitle: "Гүйцэтгэх захирал", en: "Mungunzul Badamvaanchig", enTitle: "CEO" },
  { mn: "Н. Буяндэлгэр", mnTitle: "Хөрөнгө оруулалт хариуцсан захирал", en: "Buyandelger Nyamkhuu", enTitle: "Head of Investment Team" },
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

function Person({ mn, mnTitle, en, enTitle }: { mn: string; mnTitle: string; en: string; enTitle: string }) {
  const { locale } = useLocale();
  const name = pick(locale, mn, en);
  return (
    <div className="group flex items-center gap-4 border-b hairline py-5">
      <div className="font-display flex h-12 w-12 shrink-0 items-center justify-center rounded-full border hairline text-sm text-fg transition-colors duration-500 group-hover:border-accent group-hover:bg-surface-strong group-hover:text-bronze-light">
        {initials(locale === "en" ? en : mn)}
      </div>
      <div>
        <p className="font-display text-lg text-fg">{name}</p>
        <p className="text-sm uppercase tracking-wide text-fg-muted">{pick(locale, mnTitle, enTitle)}</p>
      </div>
    </div>
  );
}

export function Team() {
  const { locale } = useLocale();

  return (
    <section id="team" className="theme-fade bg-surface py-24 md:py-32">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-accent">{pick(locale, "Хамт олон", "Our Team")}</p>
        </Reveal>
        <h2 className="font-display mt-4 max-w-lg text-balance text-4xl font-medium leading-tight text-fg md:text-5xl">
          <SplitReveal
            text={pick(locale, "Хөрөнгийн ард ажилладаг хүмүүс", "The people behind the capital")}
          />
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-16">
          <div>
            <Reveal>
              <h3 className="eyebrow text-fg-muted">
                {pick(locale, "Төлөөлөн удирдах зөвлөл", "Board of Directors")}
              </h3>
            </Reveal>
            <RevealGroup className="mt-6">
              {BOARD.map((p) => (
                <RevealItem key={p.mn}>
                  <Person {...p} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <div>
            <Reveal>
              <h3 className="eyebrow text-fg-muted">
                {pick(locale, "Удирдлагын баг", "Management Team")}
              </h3>
            </Reveal>
            <RevealGroup className="mt-6">
              {MANAGEMENT.map((p) => (
                <RevealItem key={p.mn}>
                  <Person {...p} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
