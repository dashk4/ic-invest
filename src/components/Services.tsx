"use client";

import Link from "next/link";
import { Compass, Landmark } from "lucide-react";
import { SectionHead } from "./ui/SectionHead";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import { useLocale, pick } from "@/lib/locale";

const SERVICES = [
  {
    slug: "investment-advisory",
    icon: Compass,
    mn: "Хөрөнгө оруулалтын мэргэшсэн зөвлөх үйлчилгээ",
    en: "Professional Investment Advisory",
  },
  {
    slug: "securities-trust",
    icon: Landmark,
    mn: "Үнэт цаас итгэмжлэх удирдах",
    en: "Securities Trust Management",
  },
];

export function Services() {
  const { locale } = useLocale();

  return (
    <section className="theme-fade min-h-svh bg-surface-alt pb-24 pt-36 md:pt-44">
      <div className="container-page">
        <SectionHead
          eyebrow={pick(locale, "Үйлчилгээ", "Services")}
          title={pick(
            locale,
            "Танд санал болгож буй үйлчилгээ",
            "Services we offer",
          )}
        />

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <RevealItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col justify-between gap-8 rounded-2xl border hairline bg-card p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
                >
                  <span className="brand-icon flex h-11 w-11 items-center justify-center rounded-xl">
                    <Icon className="h-[19px] w-[19px]" strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="font-display block text-[1.15rem] leading-snug text-fg">
                      {pick(locale, service.mn, service.en)}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[0.85rem] text-accent">
                      {pick(locale, "Дэлгэрэнгүй", "Learn more")}
                      <span
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
