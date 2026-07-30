import { createElement, type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type EyebrowProps = HTMLAttributes<HTMLElement> & {
  /** Element to render as. Defaults to `p`. */
  as?: ElementType;
};

/**
 * Section/hero eyebrow text (e.g. "UX/UI DESIGN · UI DEVELOPMENT"). Unlike
 * MonoLabel, this carries real content — not aria-hidden.
 *
 * Uses `createElement` instead of JSX for the dynamic `Tag`: with
 * `@react-three/fiber` in the dependency graph (Phase 3), its global
 * `JSX.IntrinsicElements` augmentation makes `<Tag>` unresolvable for a
 * generic `ElementType` — `createElement` isn't affected since it doesn't
 * go through JSX's intrinsic-element children-arity checks.
 */
export function Eyebrow({
  as: Tag = "p",
  className,
  children,
  ...rest
}: EyebrowProps) {
  return createElement(
    Tag,
    {
      className: cn(
        "eyebrow",
        "font-mono text-eyebrow uppercase tracking-eyebrow text-muted md:text-eyebrow-desktop",
        className,
      ),
      ...rest,
    },
    children,
  );
}
