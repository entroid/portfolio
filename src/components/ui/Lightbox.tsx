"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { LightboxModal } from "./LightboxModal";

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
 * portal-rendered modal. Used for standalone case-study images (cover,
 * inline MDX images) per DESIGN_SYSTEM.md's zero-radius, dark-palette
 * conventions — no rounded corners, border-only chrome.
 *
 * The gallery does not use this: a set needs one modal that can step
 * between images, so `Gallery` owns that state and renders
 * `LightboxModal` directly.
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

  return (
    <>
      <button
        type="button"
        data-testid="lightbox-trigger"
        onClick={() => setOpen(true)}
        aria-label={t("expandImage")}
        className={cn(
          "block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
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

      {open && (
        <LightboxModal src={src} alt={alt} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
