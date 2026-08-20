import Link from "next/link";
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
    "group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[0.95rem] font-medium transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";

  const solid = onDark
    ? "bg-accent-on-dark text-[color:var(--ink-900)] hover:brightness-110"
    : "bg-accent text-accent-contrast hover:brightness-110";

  const ghost = onDark
    ? "border border-[color:var(--c-line-strong)] text-on-strong hover:border-accent-on-dark hover:text-accent-on-dark"
    : "border hairline text-fg hover:border-accent hover:text-accent";

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} ${variant === "solid" ? solid : ghost}`}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
