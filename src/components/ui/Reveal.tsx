"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger successive reveals on the same page without a second effect per element. */
  delay?: number;
};

/**
 * Shared "Section entrance on scroll" primitive (DESIGN_SYSTEM.md
 * Microinteractions: fade + slide-up, ~400-500ms ease-out, `once: true` so
 * it never re-fires on scroll-back). `useReducedMotion` short-circuits to
 * the resting state with no transition, per the shared reduced-motion
 * contract every animated primitive in this codebase follows.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
