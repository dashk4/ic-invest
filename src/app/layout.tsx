import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider, THEME_NO_FLASH_SCRIPT } from "@/lib/theme";
import { LocaleProvider } from "@/lib/locale";

const manrope = localFont({
  src: [
    { path: "./fonts/Manrope-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "./fonts/Manrope-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/Manrope-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Manrope-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Manrope-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Manrope-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Manrope-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-manrope-src",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "IC Asset Management | Инвескор Ассет Менежмент ХХК",
  description:
    "Монголын хөрөнгийн зах зээлд мэргэжлийн удирдлага, судалгаанд суурилсан хөрөнгө оруулалтын шийдэл хүргэдэг Инвескор Ассет Менежмент ХХК.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="mn"
      suppressHydrationWarning
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-fg">
        {/*
          Next/React hoists <link> tags rendered anywhere in the tree into
          <head>. These two origins are on the critical path for a slow
          connection: cms.ic-invest.mn is where every fund/news image and
          all live CMS data comes from, and the TradingView ticker tape sits
          in the footer of every page. Without a hint, the DNS lookup + TLS
          handshake for each only starts once the browser parses the actual
          <img>/<iframe> tag referencing it; preconnect does that work in
          parallel with everything else instead of adding it in sequence.
        */}
        <link rel="preconnect" href="https://cms.ic-invest.mn" />
        <link rel="preconnect" href="https://www.tradingview-widget.com" />
        <Script id="theme-no-flash" strategy="beforeInteractive">
          {THEME_NO_FLASH_SCRIPT}
        </Script>
        <ThemeProvider>
          <LocaleProvider>{children}</LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
