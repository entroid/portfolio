import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type EyebrowProps = HTMLAttributes<HTMLElement> & {
  /** Element to render as. Defaults to `p`. */
  as?: ElementType;
};

/**
 * Section/hero eyebrow text (e.g. "UX/UI DESIGN · UI DEVELOPMENT"). Unlike
 * MonoLabel, this carries real content — not aria-hidden.
 */
export function Eyebrow({
  as: Tag = "p",
  className,
  children,
  ...rest
}: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "font-mono text-eyebrow uppercase tracking-eyebrow text-muted md:text-eyebrow-desktop",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
