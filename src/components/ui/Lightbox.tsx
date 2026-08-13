"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export type LightboxProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
};

/**
 * Wraps a thumbnail image so clicking it opens a full-size view in a
 * portal-rendered modal. Used for every case-study image (cover, inline
 * MDX images, gallery) per DESIGN_SYSTEM.md's zero-radius, dark-palette
 * conventions — no rounded corners, border-only chrome.
 */
export function Lightbox({
  src,
  alt,
  width = 1600,
  height = 900,
  fill = false,
  sizes,
  className,
  imageClassName,
}: LightboxProps) {
  const t = useTranslations("work.caseStudy");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        data-testid="lightbox-trigger"
        onClick={() => setOpen(true)}
        aria-label={t("expandImage")}
        className={cn(
          "block cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg w-full",
          className,
        )}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className={imageClassName}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={imageClassName}
          />
        )}
      </button>

      {open &&
        createPortal(
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
              onClick={() => setOpen(false)}
              className="absolute inset-0 h-full w-full cursor-zoom-out bg-bg/95 backdrop-blur-sm"
            />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 md:p-12">
              <button
                type="button"
                data-testid="lightbox-close"
                aria-label={t("closeImage")}
                onClick={() => setOpen(false)}
                className="pointer-events-auto absolute top-4 right-4 flex cursor-zoom-out items-center justify-center border border-grid-border bg-bg p-2 text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <X aria-hidden="true" />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="pointer-events-auto min-h-0 max-w-full flex-1 md:flex-[unset] border border-grid-border object-cover md:object-contain"
              />
              <p
                data-testid="lightbox-caption"
                className="pointer-events-auto shrink-0 text-center font-mono text-label text-fg"
              >
                {alt}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
