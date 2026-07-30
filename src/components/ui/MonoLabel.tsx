import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type MonoLabelProps = HTMLAttributes<HTMLSpanElement>;

/**
 * Decorative coordinate/timestamp/code-style text (e.g. "N43.28 W72.01",
 * "SIG-004"). Purely decorative per DESIGN_SYSTEM.md — always aria-hidden,
 * never the sole carrier of information.
 */
export function MonoLabel({ className, children, ...rest }: MonoLabelProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "mono-label",
        "font-mono text-label tracking-label text-muted md:text-label-desktop",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
