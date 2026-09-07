"use client";

import Image from "next/image";
import { TEAM } from "@/lib/team";
import { pick, type Locale } from "@/lib/locale";

/**
 * The roster, kept in its three real groups rather than one flat list. Cards
 * used to open an expanded profile on click; nothing was behind that click
 * (the CMS publishes no bios), so the photos are now plain portraits.
 */
export function TeamGrid({ locale }: { locale: Locale }) {
  return (
    <div className="mt-16 space-y-14">
      {TEAM.map((group) => (
        <div key={group.mn}>
          <h3 className="eyebrow border-b hairline pb-4 text-fg-subtle">
            {pick(locale, group.mn, group.en)}
          </h3>
          <ul className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {group.members.map((m) => (
              <li key={m.mn} className="group">
                {/* Keep the clipping on a stable wrapper so every portrait
                    stays inside the same rounded frame. */}
                <div className="overflow-hidden rounded-2xl ring-1 ring-[color:var(--c-line)] transition-colors duration-500 group-hover:ring-accent">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-transparent">
                    <Image
                      src={m.photo}
                      alt={pick(locale, m.mn, m.en)}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="h-full w-full object-cover object-top grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                      style={
                        m.photoZoom
                          ? {
                              transform: `scale(${m.photoZoom})`,
                              transformOrigin: "50% 0%",
                            }
                          : undefined
                      }
                    />
                  </div>
                </div>

                <p className="font-display mt-4 text-[1.25rem] leading-snug text-fg">
                  {pick(locale, m.mn, m.en)}
                </p>
                <p className="t-small mt-1 text-pretty text-fg-muted">
                  {pick(locale, m.mnTitle, m.enTitle)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
