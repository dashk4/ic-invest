/**
 * Mirrors the live ic-invest.mn menu tree (labels and grouping taken from the
 * MN and EN navs on the real site). Targets are remapped onto this one-page
 * layout; anything this page has no section for stays a link to the main site.
 */
export type NavChild = {
  mn: string;
  en: string;
  href: string;
  external?: boolean;
};

export type NavEntry = {
  key: string;
  mn: string;
  en: string;
  href: string;
  children?: NavChild[];
};

export const NAV: NavEntry[] = [
  {
    key: "about",
    mn: "Бидний тухай",
    en: "About us",
    href: "#about",
    children: [
      { mn: "Алсын хараа", en: "Vision", href: "#about" },
      { mn: "Үнэт зүйл", en: "Values", href: "#philosophy" },
      { mn: "Хамт олон", en: "Our Team", href: "#team" },
    ],
  },
  {
    key: "funds",
    mn: "Хөрөнгө оруулалтын сан",
    en: "Investment funds",
    href: "#funds",
  },
  {
    key: "investors",
    mn: "Хөрөнгө оруулагчдад",
    en: "Investor relations",
    href: "#insights",
    children: [
      { mn: "Мэдээлэл", en: "Announcement", href: "#insights" },
      { mn: "Судалгаа", en: "Market outlook", href: "#insights" },
    ],
  },
  {
    key: "contact",
    mn: "Холбоо барих",
    en: "Contact us",
    href: "#contact",
    children: [
      { mn: "Санал хүсэлт", en: "Request", href: "#contact" },
      {
        mn: "Ажлын байр",
        en: "Job offer",
        href: "https://ic-invest.mn/mn/contact-us#workplace",
        external: true,
      },
    ],
  },
];
