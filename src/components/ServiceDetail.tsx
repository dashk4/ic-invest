"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { useLocale, pick } from "@/lib/locale";

export function ServiceDetail({
  icon,
  titleMn,
  titleEn,
}: {
  icon: ReactNode;
  titleMn: string;
  titleEn: string;
}) {
  const { locale } = useLocale();

  return (
    <section className="theme-fade min-h-svh bg-surface-alt pb-24 pt-36 md:pt-44">
      <div className="container-page max-w-3xl">
        <Reveal>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-[0.85rem] text-fg-muted transition-colors duration-300 hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            {pick(locale, "Үйлчилгээ", "Services")}
          </Link>
        </Reveal>

        <Reveal delay={0.08}>
          <span className="brand-icon mt-8 flex h-11 w-11 items-center justify-center rounded-xl">
            {icon}
          </span>
        </Reveal>

        <Reveal delay={0.14}>
          <h1 className="t-h2 mt-6 max-w-xl text-balance text-fg">
            {pick(locale, titleMn, titleEn)}
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="t-body mt-6 max-w-xl text-pretty text-fg-muted">
            {pick(
              locale,
              "Энэ үйлчилгээний дэлгэрэнгүй мэдээлэл удахгүй нэмэгдэнэ.",
              "Detailed information about this service is coming soon.",
            )}
          </p>
        </Reveal>

        <Reveal delay={0.26} className="mt-10">
          <Link
            href="/#contact"
            className="rounded-lg bg-accent px-7 py-3 text-[0.9rem] font-medium text-accent-contrast transition-all duration-500 hover:-translate-y-0.5 hover:brightness-110"
          >
            {pick(locale, "Холбоо барих", "Contact us")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
