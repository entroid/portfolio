"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

export type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger successive reveals on the same page without a second effect per element. */
  delay?: number;
  "data-testid"?: string;
};

/**
 * Shared "Section entrance on scroll" primitive (DESIGN_SYSTEM.md
 * Microinteractions: fade + slide-up, ~400-500ms ease-out, `once: true` so
 * it never re-fires on scroll-back). `useReducedMotion` short-circuits to
 * the resting state with no transition, per the shared reduced-motion
 * contract every animated primitive in this codebase follows.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  "data-testid": testId,
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div data-testid={testId} className={cn("reveal", className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      data-testid={testId}
      className={cn("reveal", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
