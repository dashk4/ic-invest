"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { NAV, type NavChild, type NavEntry } from "@/lib/nav";
import { pick, type Locale } from "@/lib/locale";

/**
 * Aceternity UI's navbar-menu interaction: a shared `layoutId` panel that
 * morphs between menu items on a spring. Transition values are the published
 * ones; framer-motion stands in for `motion/react`, and the panel is
 * recoloured for the dark glass header.
 */

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
}

function getHash() {
  return window.location.hash;
}

function isCurrentEntry(entry: NavEntry, pathname: string, hash: string) {
  if (entry.key === "home") return pathname === "/" && (!hash || hash === "#top");
  if (entry.key === "about") return pathname.startsWith("/about");
  if (entry.key === "funds") return pathname.startsWith("/funds") || hash === "#funds";
  if (entry.key === "news") return pathname.startsWith("/news");
  if (entry.key === "contact") return pathname === "/" && hash === "#contact";
  return false;
}

function FundMenuCard({ child, locale }: { child: NavChild; locale: Locale }) {
  const meta = child.fundMeta;
  if (!meta) return null;

  return (
    <a
      href={child.href}
      className="group/card flex min-h-32 items-center gap-4 rounded-2xl border border-white/[0.09] bg-white/[0.025] p-3 transition-[border-color,background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-accent-on-dark/35 hover:bg-accent-on-dark/[0.065] hover:shadow-[0_18px_38px_-28px_rgba(111,191,163,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-on-dark/70"
    >
      <span className="relative flex h-[92px] w-[132px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-black/[0.08] bg-[#f4f1eb] px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
        <Image
          src={meta.logo}
          alt={`${pick(locale, child.mn, child.en)} logo`}
          width={meta.logoWidth}
          height={meta.logoHeight}
          sizes="132px"
          className="h-auto max-h-[68px] w-full object-contain transition-transform duration-500 ease-out group-hover/card:scale-[1.08]"
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className="mb-2 flex items-start justify-between gap-3">
          <span className="text-[0.98rem] font-bold leading-snug text-on-strong transition-colors duration-300 group-hover/card:text-accent-on-dark">
            {pick(locale, child.mn, child.en)}
          </span>
          <ArrowUpRight
            aria-hidden
            className="mt-0.5 h-4 w-4 shrink-0 text-on-strong-muted transition-[color,transform] duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent-on-dark"
            strokeWidth={1.7}
          />
        </span>
        <span className="block text-[0.76rem] leading-relaxed text-on-strong-muted">
          {pick(locale, meta.categoryMn, meta.categoryEn)}
        </span>
      </span>
    </a>
  );
}

function FundsMegaMenu({ entry, locale }: { entry: NavEntry; locale: Locale }) {
  return (
    <div className="w-[min(790px,calc(100vw-3rem))] p-5">
      <div className="mb-4 flex items-end justify-between gap-8 px-1">
        <div>
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-accent-on-dark">
            {pick(locale, "Хөрөнгө оруулалтын сангууд", "Investment funds")}
          </p>
          <p className="mt-1 text-[0.78rem] text-on-strong-muted">
            {pick(
              locale,
              "Танд тохирох сангийн мэдээлэлтэй танилцана уу.",
              "Explore each fund and find the right fit.",
            )}
          </p>
        </div>
        <span className="whitespace-nowrap text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-on-strong-muted">
          05 {pick(locale, "сан", "funds")}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {entry.children?.map((child) => (
          <FundMenuCard key={child.mn} child={child} locale={locale} />
        ))}

        <a
          href={entry.href}
          className="group/all flex min-h-32 items-center justify-between gap-4 rounded-2xl border border-dashed border-accent-on-dark/25 bg-accent-on-dark/[0.035] px-6 transition-[border-color,background-color] duration-300 hover:border-accent-on-dark/50 hover:bg-accent-on-dark/[0.075] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-on-dark/70"
        >
          <span>
            <span className="block text-[0.72rem] font-bold uppercase tracking-[0.16em] text-accent-on-dark">
              {pick(locale, "Бүх сан", "All funds")}
            </span>
            <span className="mt-2 block max-w-[14rem] text-[0.82rem] leading-relaxed text-on-strong-muted">
              {pick(locale, "Сангуудыг нэг дор харьцуулж үзэх", "Compare all investment funds")}
            </span>
          </span>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent-on-dark/30 text-accent-on-dark transition-transform duration-300 group-hover/all:translate-x-1">
            <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={1.7} />
          </span>
        </a>
      </div>
    </div>
  );
}

function CompactMenu({ entry, locale }: { entry: NavEntry; locale: Locale }) {
  return (
    <div className="flex flex-col space-y-4 p-4">
      {entry.children?.map((child) => {
        const Icon = child.icon;
        return (
          <a
            key={child.mn}
            href={child.href}
            target={child.external ? "_blank" : undefined}
            rel={child.external ? "noopener noreferrer" : undefined}
            className="group/link flex items-center gap-3 text-[0.95rem] text-on-strong-muted transition-colors duration-300 hover:text-accent-on-dark"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[color:var(--c-line-strong)] bg-white/[0.04] transition-colors duration-300 group-hover/link:border-accent-on-dark/40 group-hover/link:bg-accent-on-dark/10">
              <Icon className="h-[15px] w-[15px]" strokeWidth={1.6} />
            </span>
            {pick(locale, child.mn, child.en)}
          </a>
        );
      })}
    </div>
  );
}

export function NavMenu({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();
  const hash = useSyncExternalStore(subscribeToHash, getHash, () => "");

  return (
    <nav
      onMouseLeave={() => setActive(null)}
      // self-stretch keeps the whole header row inside the nav's box, so the
      // pointer stays within it on the way down to a panel
      className="hidden h-full items-center gap-2 lg:flex xl:gap-3"
    >
      {NAV.map((entry) => (
        <MenuItem
          key={entry.key}
          entry={entry}
          locale={locale}
          active={active}
          setActive={setActive}
          isCurrent={isCurrentEntry(entry, pathname, hash)}
        />
      ))}
    </nav>
  );
}

function MenuItem({
  entry,
  locale,
  active,
  setActive,
  isCurrent,
}: {
  entry: NavEntry;
  locale: Locale;
  active: string | null;
  setActive: (v: string | null) => void;
  isCurrent: boolean;
}) {
  const isOpen = active === entry.key && !!entry.children;

  return (
    <div
      onMouseEnter={() => setActive(entry.key)}
      className="relative flex h-full items-center"
    >
      <a
        href={entry.href}
        aria-current={isCurrent ? "page" : undefined}
        className={`relative z-10 flex items-center whitespace-nowrap rounded-full border px-3 py-2 text-[0.82rem] font-bold tracking-[0.035em] transition-[color,border-color,background-color,box-shadow] duration-300 xl:px-4 ${
          isCurrent
            ? "border-accent-on-dark/65 bg-accent-on-dark/[0.13] text-accent-on-dark shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_24px_-18px_rgba(111,191,163,0.9)]"
            : "border-white/[0.12] bg-white/[0.02] text-on-strong shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-white/[0.24] hover:bg-white/[0.045]"
        }`}
      >
        {pick(locale, entry.mn, entry.en)}
      </a>

      {active !== null && isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {/* the published component offsets by 1.2rem; here that gap sits
              outside the nav and drops the hover, so the padding carries it */}
          <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-5">
            <motion.div
              layoutId="active"
              transition={transition}
              /* solid rather than translucent: over the light theme's page
                 surface even 5% transmission let headings ghost through */
              className="overflow-hidden rounded-2xl border border-[color:var(--c-line-strong)] bg-[color:var(--ink-900)] shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)]"
            >
              <motion.div layout className="h-full w-max">
                {entry.key === "funds" ? (
                  <FundsMegaMenu entry={entry} locale={locale} />
                ) : (
                  <CompactMenu entry={entry} locale={locale} />
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
