"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxModalProps = {
  src: string;
  alt: string;
  onClose: () => void;
  /** Wired by callers showing a set — enables the arrows and Left/Right keys. */
  onPrev?: () => void;
  onNext?: () => void;
  /** 1-based position within the set, shown as "3 / 5". */
  position?: { current: number; total: number };
};

const stepClassName =
  "pointer-events-auto absolute top-1/2 flex -translate-y-1/2 items-center justify-center border border-grid-border bg-bg p-2 text-fg transition-colors duration-150 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

/**
 * The full-screen view itself, split out of `Lightbox` so a set of images can
 * share one modal and step between them. `Lightbox` still owns the
 * single-image case; `Gallery` holds the open index for its own set.
 */
export function LightboxModal({
  src,
  alt,
  onClose,
  onPrev,
  onNext,
  position,
}: LightboxModalProps) {
  const t = useTranslations("work.caseStudy");

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev?.();
      if (event.key === "ArrowRight") onNext?.();
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, onPrev, onNext]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      data-testid="lightbox-modal"
      className="fixed inset-0 z-[100]"
    >
      <button
        type="button"
        aria-label={t("closeImage")}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-zoom-out bg-bg/95 backdrop-blur-sm"
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 md:p-12">
        <button
          type="button"
          data-testid="lightbox-close"
          aria-label={t("closeImage")}
          onClick={onClose}
          className="pointer-events-auto absolute top-4 right-4 flex cursor-zoom-out items-center justify-center border border-grid-border bg-bg p-2 text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <X aria-hidden="true" />
        </button>

        {onPrev && (
          <button
            type="button"
            data-testid="lightbox-prev"
            aria-label={t("previousImage")}
            onClick={onPrev}
            className={`${stepClassName} left-2 md:left-6`}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
        )}
        {onNext && (
          <button
            type="button"
            data-testid="lightbox-next"
            aria-label={t("nextImage")}
            onClick={onNext}
            className={`${stepClassName} right-2 md:right-6`}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="pointer-events-auto min-h-0 max-w-full flex-1 border border-grid-border object-cover md:flex-[unset] md:object-contain"
        />
        <p
          data-testid="lightbox-caption"
          className="pointer-events-auto shrink-0 text-center font-mono text-label text-fg"
        >
          {alt}
          {position && (
            <span data-testid="lightbox-position" className="ml-3 text-muted">
              {position.current} / {position.total}
            </span>
          )}
        </p>
      </div>
    </div>,
    document.body,
  );
}
