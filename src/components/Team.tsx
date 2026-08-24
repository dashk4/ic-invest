"use client";

import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { SectionHead } from "./ui/SectionHead";
import { TEAM, type Member } from "@/lib/team";
import { useLocale, pick, type Locale } from "@/lib/locale";

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
    <section id="team" className="theme-fade section-y bg-surface">
      <div className="container-page">
        <SectionHead
          eyebrow={pick(locale, "Хамт олон", "Our team")}
          title={pick(locale, "Хөрөнгийн ард ажилладаг хүмүүс", "The people behind the capital")}
        />

        <div className="mt-16 space-y-14">
          {TEAM.map((group) => (
            <div key={group.mn}>
              <Reveal>
                <h3 className="eyebrow border-b hairline pb-4 text-fg-subtle">
                  {pick(locale, group.mn, group.en)}
                </h3>
              </Reveal>
              <RevealGroup className="grid grid-cols-1 gap-x-16 md:grid-cols-2">
                {group.members.map((m) => (
                  <RevealItem key={m.mn}>
                    <Person member={m} locale={locale} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
