"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

const DEFAULT_THEME: Theme = "dark";
const COOKIE_NAME = "ic-theme";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
} | null>(null);

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function persist(theme: Theme) {
  window.localStorage.setItem(COOKIE_NAME, theme);
  // localStorage is scoped per-port as well as per-host: a dev server that
  // lands on a different port (a stale process holding 3000, say) looks like
  // the theme silently reset. A cookie is host-scoped only, so it survives
  // that. Written alongside localStorage rather than instead of it, since
  // cookies ride on every request and localStorage does not.
  document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  useEffect(() => {
    const stored = window.localStorage.getItem(COOKIE_NAME) as Theme | null;
    const initial = stored ?? (readCookie(COOKIE_NAME) as Theme | null) ?? DEFAULT_THEME;
    setTheme(initial);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    persist(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggle: () => setTheme((t) => (t === "light" ? "dark" : "light")),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export const THEME_NO_FLASH_SCRIPT = `
(function () {
  try {
    var cookieMatch = document.cookie.match(/(?:^|; )ic-theme=([^;]*)/);
    var stored = localStorage.getItem("ic-theme") || (cookieMatch && decodeURIComponent(cookieMatch[1]));
    var theme = stored || "${DEFAULT_THEME}";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;
