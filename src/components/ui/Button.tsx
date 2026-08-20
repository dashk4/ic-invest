import Link from "next/link";
import type { ReactNode } from "react";
import { RollText } from "./RollText";

export function Button({
  href,
  children,
  variant = "solid",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  external?: boolean;
}) {
  const base =
    "group inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-base font-medium tracking-wide transition-all duration-400 ease-out hover:scale-[1.03] active:scale-[0.98]";
  const styles =
    variant === "solid"
      ? "bg-accent text-accent-contrast hover:bg-accent-light"
      : "border border-ivory/30 bg-transparent text-ivory hover:border-bronze-light";

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} ${styles}`}
    >
      <RollText hoverClassName={variant === "solid" ? "text-accent-contrast" : "text-bronze-light"}>
        {children}
      </RollText>
    </Link>
  );
}
