import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Eye,
  Gem,
  Megaphone,
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
    // the old standalone "Хөрөнгө оруулагчдад" (investor relations) nav item
    // folded in here as "Мэдээ, мэдээлэл" — its Мэдээлэл/Судалгаа children
    // both pointed at the same /#insights anchor anyway, so one entry covers it
    children: [
      { mn: "Мобисан", en: "Mobisan", href: "/funds/mbs", icon: Briefcase },
      { mn: '"Инвескор РИ Сайкл"', en: "Invescore RI Cycle", href: "/funds/ric", icon: ShieldCheck },
      { mn: "Инвескор Глобал Кью", en: "Invescore Global Q", href: "/funds/etf", icon: TrendingUp },
      { mn: "И Эс Пи Ирээдүй", en: "E-Fund", href: "/funds/mf", icon: Users },
      { mn: '"Вертикор Экъюти"', en: "Vertikor Equity", href: "/funds/veq", icon: PieChart },
      { mn: "Мэдээ, мэдээлэл", en: "News & insights", href: "/#insights", icon: Megaphone },
    ],
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
        href: "https://ic-invest.mn/mn/contact-us#workplace",
        icon: Briefcase,
        external: true,
      },
    ],
  },
];
