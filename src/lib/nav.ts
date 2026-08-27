import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Eye,
  Gem,
  MessageSquare,
  PieChart,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

/**
 * Mirrors the live ic-invest.mn menu tree (labels and grouping taken from the
 * MN and EN navs on the real site). Targets are remapped onto this one-page
 * layout; anything this page has no section for stays a link to the main site.
 */
export type NavChild = {
  mn: string;
  en: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
  fundMeta?: {
    categoryMn: string;
    categoryEn: string;
    logo: string;
    logoWidth: number;
    logoHeight: number;
  };
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
    key: "home",
    mn: "Нүүр",
    en: "Home",
    href: "/",
  },
  {
    key: "about",
    mn: "Бидний тухай",
    en: "About us",
    href: "/about",
    children: [
      { mn: "Алсын хараа", en: "Vision", href: "/about#vision", icon: Eye },
      { mn: "Үнэт зүйл", en: "Values", href: "/about#philosophy", icon: Gem },
      { mn: "Хамт олон", en: "Our Team", href: "/about#team", icon: Users },
    ],
  },
  {
    key: "funds",
    mn: "Хөрөнгө оруулалтын сан",
    en: "Investment funds",
    href: "/#funds",
    children: [
      {
        mn: "Мобисан",
        en: "Mobisan",
        href: "/funds/mbs",
        icon: Briefcase,
        fundMeta: {
          categoryMn: "Хувийн хөрөнгө оруулалтын сан",
          categoryEn: "Private investment fund",
          logo: "/brand/Mobi-Fund_Red_Logo_PNG.png",
          logoWidth: 1311,
          logoHeight: 560,
        },
      },
      {
        mn: '"Инвескор РИ Сайкл"',
        en: "Invescore RI Cycle",
        href: "/funds/ric",
        icon: ShieldCheck,
        fundMeta: {
          categoryMn: "Хувийн хөрөнгө оруулалтын сан",
          categoryEn: "Private investment fund",
          logo: "/brand/Ricycle_Logo_PNG-removebg-preview.png",
          logoWidth: 612,
          logoHeight: 408,
        },
      },
      {
        mn: "Инвескор Глобал Кью",
        en: "Invescore Global Q",
        href: "/funds/etf",
        icon: TrendingUp,
        fundMeta: {
          categoryMn: "Биржээр арилжаалагддаг хамтын сан",
          categoryEn: "Exchange-traded fund",
          logo: "/brand/Ungut-full.png",
          logoWidth: 3000,
          logoHeight: 800,
        },
      },
      {
        mn: "И Эс Пи Ирээдүй",
        en: "E-Fund",
        href: "/funds/mf",
        icon: Users,
        fundMeta: {
          categoryMn: "Хамтын нээлттэй хөрөнгө оруулалтын сан",
          categoryEn: "Open-ended mutual fund",
          logo: "/brand/E-Fund%20hevtee.png",
          logoWidth: 710,
          logoHeight: 194,
        },
      },
      {
        mn: '"Вертикор Экъюти"',
        en: "Vertikor Equity",
        href: "/funds/veq",
        icon: PieChart,
        fundMeta: {
          categoryMn: "Хувийн хөрөнгө оруулалтын сан",
          categoryEn: "Private investment fund",
          logo: "/brand/pocket-fund.png",
          logoWidth: 1006,
          logoHeight: 248,
        },
      },
    ],
  },
  {
    key: "news",
    mn: "Мэдээ, мэдээлэл",
    en: "News & insights",
    href: "/news",
  },
  {
    key: "contact",
    mn: "Холбоо барих",
    en: "Contact us",
    href: "/#contact",
    children: [
      { mn: "Санал хүсэлт", en: "Request", href: "/#contact", icon: MessageSquare },
      {
        mn: "Ажлын байр",
        en: "Job offer",
        href: "/#workplace",
        icon: Briefcase,
      },
    ],
  },
];
