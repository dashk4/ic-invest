"use client";

import { useLocale } from "@/lib/locale";

export function LocaleToggle({ light = false }: { light?: boolean }) {
  const { locale, toggle } = useLocale();

  return (
    <button
      onClick={toggle}
      aria-label="Хэл солих / Switch language"
      className={`eyebrow relative flex h-9 items-center gap-1 rounded-full border px-1 transition-colors ${
        light ? "border-ivory/30" : "border-line"
      }`}
    >
      {(["mn", "en"] as const).map((l) => (
        <span
          key={l}
          className={`relative z-10 flex h-7 w-8 items-center justify-center rounded-full transition-colors duration-300 ${
            locale === l
              ? light
                ? "bg-ivory text-navy-deep"
                : "bg-accent text-accent-contrast"
              : light
                ? "text-ivory/60"
                : "text-fg-muted"
          }`}
        >
          {l.toUpperCase()}
        </span>
      ))}
    </button>
  );
}
