import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider, THEME_NO_FLASH_SCRIPT } from "@/lib/theme";
import { LocaleProvider } from "@/lib/locale";
import { SmoothScroll } from "@/components/SmoothScroll";

const display = Cormorant_Garamond({
  variable: "--font-display-src",
  subsets: ["cyrillic", "latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans-src",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IC Asset Management | Инвескор Ассет Менежмент ҮЦК",
  description:
    "Монголын хөрөнгийн зах зээлд мэргэжлийн удирдлага, судалгаанд суурилсан хөрөнгө оруулалтын шийдэл хүргэдэг Инвескор Ассет Менежмент ҮЦК.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="mn"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-fg">
        <Script id="theme-no-flash" strategy="beforeInteractive">
          {THEME_NO_FLASH_SCRIPT}
        </Script>
        <ThemeProvider>
          <LocaleProvider>
            <SmoothScroll />
            {children}
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
