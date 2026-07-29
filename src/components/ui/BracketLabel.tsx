import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const bracket =
  "inline-block opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0";

/**
 * Shared "Secondary buttons / nav links" microinteraction (DESIGN_SYSTEM.md
 * Microinteractions: text wraps in brackets on hover/focus). The parent
 * link/button must carry `group` so `group-hover`/`group-focus-visible`
 * apply. Brackets stay in the DOM at rest (opacity 0) so no layout shift
 * occurs when they appear.
 */
export function BracketLabel({ children }: { children: ReactNode }) {
  return (
    <>
      <span aria-hidden="true" className={cn(bracket, "-translate-x-1")}>
        [
      </span>
      <span>{children}</span>
      <span aria-hidden="true" className={cn(bracket, "translate-x-1")}>
        ]
      </span>
    </>
  );
}
