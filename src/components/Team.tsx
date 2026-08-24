"use client";

import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { SectionHead } from "./ui/SectionHead";
import { useLocale, pick, type Locale } from "@/lib/locale";

type Member = { mn: string; mnTitle: string; en: string; enTitle: string; photo: string };

const BOARD: Member[] = [
  { mn: "Р. Пүрэв", mnTitle: "ТУЗ-ийн дарга", en: "Purev Ralgaa", enTitle: "Chairman of the Board", photo: "/team/purev-ralgaa.webp" },
  { mn: "Б. Энхбат", mnTitle: "ТУЗ-ийн хараат бус гишүүн", en: "Enkhbat Batsukh", enTitle: "Independent Board Member", photo: "/team/enkhbat-batsukh.webp" },
  { mn: "С. Өнөр", mnTitle: "ТУЗ-ийн хараат бус гишүүн", en: "Unur Sukhbaatar", enTitle: "Independent Board Member", photo: "/team/unur-sukhbaatar.webp" },
];

const MANAGEMENT: Member[] = [
  { mn: "Б. Мөнгөнзул", mnTitle: "Гүйцэтгэх захирал", en: "Mungunzul Badamvaanchig", enTitle: "Chief Executive Officer", photo: "/team/mungunzul-badamvaanchig.webp" },
  { mn: "Н. Буяндэлгэр", mnTitle: "Хөрөнгө оруулалт хариуцсан захирал", en: "Buyandelger Nyamkhuu", enTitle: "Head of Investment", photo: "/team/buyandelger-nyamkhuu.webp" },
  { mn: "О. Насанжаргал", mnTitle: "Ахлах хөрөнгө оруулалтын менежер", en: "Nasanjargal Odsuren", enTitle: "Senior Investment Manager", photo: "/team/nasanjargal-odsuren.webp" },
  { mn: "Г. Амарбаатар", mnTitle: "Хөрөнгө оруулалтын менежер", en: "Amarbaatar Ganbaatar", enTitle: "Investment Manager", photo: "/team/amarbaatar-ganbaatar.webp" },
  { mn: "Ү. Гончигболд", mnTitle: "Хөрөнгө оруулалтын менежер", en: "Gonchigbold Unenbat", enTitle: "Investment Manager", photo: "/team/gonchigbold-unenbat.webp" },
  { mn: "М. Даваажав", mnTitle: "Хуульч, комплаенсын менежер", en: "Davaajav Munkhjargal", enTitle: "Compliance Officer", photo: "/team/davaajav-munkhjargal.webp" },
  { mn: "С. Дэлгэрмаа", mnTitle: "Ерөнхий нягтлан бодогч", en: "Delgermaa Sangi-Ochir", enTitle: "General Accountant", photo: "/team/delgermaa-sangi-ochir.webp" },
];

function Person({ member, locale }: { member: Member; locale: Locale }) {
  const name = pick(locale, member.mn, member.en);
  return (
    <div className="group flex items-center gap-5 border-b hairline py-5">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-surface-sunken ring-1 ring-[color:var(--c-line)] transition-all duration-500 group-hover:ring-accent">
        <Image
          src={member.photo}
          alt={name}
          fill
          sizes="64px"
          className="object-cover object-top grayscale transition-all duration-700 group-hover:grayscale-0"
        />
      </div>
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
