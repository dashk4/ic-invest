"use client";

import Image from "next/image";
import { useLocale, pick } from "@/lib/locale";
import { RollText } from "./ui/RollText";
import { TradingViewTickerTape } from "./TradingViewTickerTape";

const LINKS = [
  { mn: "Бидний тухай", en: "About us", href: "/about" },
  { mn: "Хөрөнгө оруулалтын сан", en: "Our funds", href: "/#funds" },
  { mn: "Хамт олон", en: "Our team", href: "/about#team" },
  { mn: "Холбоо барих", en: "Contact", href: "/#contact" },
];

const SOCIAL = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100083224807975" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/invescore-asset-management-llc/" },
];

export function Footer() {
  const { locale } = useLocale();

  return (
    <footer className="footer-with-ticker theme-fade bg-surface-deep pt-20 pb-10 text-on-strong">
      <TradingViewTickerTape />
      <div className="container-page">
        <div className="grid grid-cols-1 gap-12 border-b border-[color:var(--c-line-strong)] pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Image
              src="/brand/white-logo_mn.svg"
              alt="IC Asset Management"
              width={132}
              height={41}
              className="h-8 w-auto"
            />
            <p className="t-body mt-6 max-w-xs text-pretty text-on-strong-muted">
              {pick(
                locale,
                "Таны итгэмжит хамтрагч — “Инвескор Ассет Менежмент ҮЦК” ХХК.",
                "Your trusted partner — Invescore Asset Management SC LLC."
              )}
            </p>
          </div>

          <nav className="lg:col-span-4">
            <p className="eyebrow text-on-strong-subtle">{pick(locale, "Хуудсууд", "Pages")}</p>
            <ul className="mt-6 space-y-3">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="group inline-flex t-small text-on-strong-muted">
                    <RollText hoverClassName="text-accent-on-dark">
                      {pick(locale, l.mn, l.en)}
                    </RollText>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow text-on-strong-subtle">{pick(locale, "Холбоос", "Elsewhere")}</p>
            <ul className="mt-6 space-y-3">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex t-small text-on-strong-muted"
                  >
                    <RollText hoverClassName="text-accent-on-dark">{s.label}</RollText>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://system.ic-invest.mn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex t-small text-on-strong-muted"
                >
                  <RollText hoverClassName="text-accent-on-dark">
                    {pick(locale, "Нэвтрэх", "Login")}
                  </RollText>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 text-[0.8rem] text-on-strong-subtle sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()}{" "}
            {pick(locale, "Зохиогчийн эрх хуулиар хамгаалагдсан.", "All rights reserved.")}
          </p>
          <p>
            {pick(
              locale,
              "Улаанбаатар, Сүхбаатар дүүрэг, Парисийн гудамж 42, Ай Си Тауэр",
              "Parisian street 42, IC Tower, Sukhbaatar district, Ulaanbaatar"
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
