import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type SectionProps = HTMLAttributes<HTMLElement>;

/**
 * Vertical rhythm between major sections, per DESIGN_SYSTEM.md. Top padding
 * is lighter than bottom so a section heading sits closer to whatever
 * precedes it — the symmetric version pushed page openings (notably
 * /contact) below the fold.
 */
export function Section({ className, children, ...rest }: SectionProps) {
  return (
    <section
      className={cn("pt-14 pb-18 md:pt-24 md:pb-32", className)}
      {...rest}
    >
      {children}
    </section>
  );
}
