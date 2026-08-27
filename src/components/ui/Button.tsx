import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function Button({
  href,
  children,
  variant = "solid",
  external = false,
  onDark = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  external?: boolean;
  onDark?: boolean;
}) {
  const base =
    "cta-button group inline-flex min-h-14 w-fit min-w-[12.5rem] items-center justify-between gap-4 rounded-[1.1rem] px-4 py-2.5 text-[1.05rem] font-semibold leading-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 md:min-w-[13rem] md:px-5 md:text-[1.15rem]";

  const solid = onDark
    ? "cta-button-solid cta-button-on-dark border border-accent-on-dark/70 bg-accent-on-dark text-[color:var(--ink-900)] hover:brightness-105"
    : "cta-button-solid cta-button-brand border border-action bg-action text-action-contrast hover:brightness-105";

  const ghost = onDark
    ? "cta-button-ghost border border-[color:var(--c-line-strong)] text-on-strong hover:border-accent-on-dark hover:text-accent-on-dark"
    : "cta-button-ghost border hairline text-fg hover:border-accent hover:text-accent";

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} ${variant === "solid" ? solid : ghost}`}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="cta-arrow relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.7rem] leading-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
      >
        <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
      </span>
    </Link>
  );
}
