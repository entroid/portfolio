import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type SectionProps = HTMLAttributes<HTMLElement>;

/** Generous vertical rhythm between major sections, per DESIGN_SYSTEM.md. */
export function Section({ className, children, ...rest }: SectionProps) {
  return (
    <section className={cn("py-24 md:py-32", className)} {...rest}>
      {children}
    </section>
  );
}
