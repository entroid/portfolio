"use client";

import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

export type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

export type TabsProps = {
  items: TabItem[];
  className?: string;
  "data-testid"?: string;
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

/**
 * WAI-ARIA Tabs pattern with automatic activation: Arrow Left/Right moves
 * focus and switches the active tab in one step, Home/End jump to the
 * first/last tab. Only the active panel is rendered to the DOM (not just
 * visually hidden), so pages composing this don't need to worry about
 * inactive-panel content duplicating headings or list items.
 */
export function Tabs({ items, className, "data-testid": testId }: TabsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const reducedMotion = useReducedMotion();
  const baseId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeIndex = items.findIndex((item) => item.id === activeId);
  const activeItem = items[activeIndex];

  function focusTab(index: number) {
    const item = items[index];
    if (!item) return;
    setActiveId(item.id);
    tabRefs.current[item.id]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusTab((activeIndex + 1) % items.length);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusTab((activeIndex - 1 + items.length) % items.length);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(items.length - 1);
        break;
    }
  }

  return (
    <div data-testid={testId} className={cn("tabs", className)}>
      <div role="tablist" className="flex border-b border-grid-border">
        {items.map((item) => {
          const selected = item.id === activeId;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[item.id] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              data-testid={`tab-${item.id}`}
              onClick={() => setActiveId(item.id)}
              onKeyDown={handleKeyDown}
              className={cn(
                "-mb-px flex-1 border-b-2 pb-3 text-center font-mono text-cta tracking-cta uppercase transition-colors duration-150 cursor-pointer",
                focusRing,
                selected
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-fg",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {activeItem &&
        (reducedMotion ? (
          <div
            role="tabpanel"
            id={`${baseId}-panel-${activeItem.id}`}
            aria-labelledby={`${baseId}-tab-${activeItem.id}`}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- WAI-ARIA Tabs pattern: panel must be focusable when its content has no focusable elements of its own.
            tabIndex={0}
            data-testid={`tabpanel-${activeItem.id}`}
            className="mt-8"
          >
            {activeItem.content}
          </div>
        ) : (
          <motion.div
            key={activeItem.id}
            role="tabpanel"
            id={`${baseId}-panel-${activeItem.id}`}
            aria-labelledby={`${baseId}-tab-${activeItem.id}`}
            tabIndex={0}
            data-testid={`tabpanel-${activeItem.id}`}
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {activeItem.content}
          </motion.div>
        ))}
    </div>
  );
}
