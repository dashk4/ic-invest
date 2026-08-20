"use client";

import Image from "next/image";
import { useLocale, pick } from "@/lib/locale";

const LINKS = [
  { mn: "Бидний тухай", en: "About us", href: "#about" },
  { mn: "Хөрөнгө оруулалтын сан", en: "Investment Funds", href: "#funds" },
  { mn: "Судалгаа", en: "Insights", href: "#insights" },
  { mn: "Хамт олон", en: "Our Team", href: "#team" },
  { mn: "Холбоо барих", en: "Contact", href: "#contact" },
];

const SOCIAL = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100083224807975" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/invescore-asset-management-llc/" },
];

export function Footer() {
  const { locale } = useLocale();

  return (
    <footer className="theme-fade bg-surface-deep py-16 text-on-strong">
      <div className="container-page">
        <div className="flex flex-col gap-12 border-b border-line-strong pb-12 md:flex-row md:justify-between">
          <div>
            <Image
              src="/brand/white-logo_mn.svg"
              alt="IC Asset Management"
              width={132}
              height={41}
              className="h-8 w-auto"
            />
            <p className="mt-5 max-w-xs text-base leading-relaxed text-on-strong-muted">
              {pick(
                locale,
                'Таны итгэмжит хамтрагч "Инвескор Ассет Менежмент ҮЦК" ХХК.',
                'Your trusted partner "Invescore Asset Management SC" LLC.'
              )}
            </p>
            <div className="mt-6 flex gap-4">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow text-on-strong-muted hover:text-bronze-light"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-base text-on-strong-muted hover:text-bronze-light"
              >
                {pick(locale, l.mn, l.en)}
              </a>
            ))}
            <a
              href="https://system.ic-invest.mn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-on-strong-muted hover:text-bronze-light"
            >
              {pick(locale, "Нэвтрэх", "Login")}
            </a>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-3 text-sm text-on-strong-subtle sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()}{" "}
            {pick(locale, "Зохиогчийн эрх хуулиар хамгаалагдсан.", "All rights reserved.")}
          </p>
          <p>
            {pick(
              locale,
              "Улаанбаатар хот, Сүхбаатар дүүрэг, Парисийн гудамж 42, Ай Си Тауэр",
              "Parisian street 42, IC Tower, Sukhbaatar district, Ulaanbaatar, Mongolia"
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
