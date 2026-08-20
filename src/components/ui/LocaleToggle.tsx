"use client";

import { useLocale } from "@/lib/locale";

export function LocaleToggle({ light = false }: { light?: boolean }) {
  const { locale, toggle } = useLocale();

  return (
    <button
      onClick={toggle}
      aria-label="Хэл солих / Switch language"
      className={`eyebrow relative flex h-9 items-center rounded-full border p-1 transition-colors duration-500 ${
        light ? "border-[color:var(--c-line-strong)]" : "hairline"
      }`}
    >
      {(["mn", "en"] as const).map((l) => (
        <span
          key={l}
          className={`relative z-10 flex h-7 w-8 items-center justify-center rounded-full transition-colors duration-500 ${
            locale === l
              ? light
                ? "bg-accent-on-dark text-[color:var(--ink-900)]"
                : "bg-accent text-accent-contrast"
              : light
                ? "text-on-strong-subtle"
                : "text-fg-subtle"
          }`}
        >
          {l.toUpperCase()}
        </span>
      ))}
    </button>
  );
}
