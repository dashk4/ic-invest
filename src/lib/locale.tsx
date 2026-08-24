"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "mn" | "en";

const LocaleContext = createContext<{
  locale: Locale;
  toggle: () => void;
} | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("mn");

  useEffect(() => {
    const stored = window.localStorage.getItem("ic-locale") as Locale | null;
    if (stored === "mn" || stored === "en") setLocale(stored);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("ic-locale", locale);
    document.documentElement.setAttribute("lang", locale);
  }, [locale]);

  return (
    <LocaleContext.Provider
      value={{
        locale,
        toggle: () => setLocale((l) => (l === "mn" ? "en" : "mn")),
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export function pick<T>(locale: Locale, mn: T, en: T): T {
  return locale === "en" ? en : mn;
}
