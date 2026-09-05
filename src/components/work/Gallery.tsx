"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LightboxModal } from "@/components/ui/LightboxModal";
import type { GalleryImage } from "@/content/schema";

export type GalleryProps = {
  images: GalleryImage[];
  title: string;
};

/**
 * Optional trailing gallery for featured case studies (CONTENT_MODEL.md) —
 * only renders when a project actually has gallery images.
 *
 * The open image is held here rather than per-thumbnail so the full-screen
 * view can step through the set with the arrow keys, wrapping at both ends.
 */
export function Gallery({ images, title }: GalleryProps) {
  const t = useTranslations("work.caseStudy");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null
          ? null
          : (current + delta + images.length) % images.length,
      ),
    [images.length],
  );

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(() => step(-1), [step]);
  const next = useCallback(() => step(1), [step]);

  if (images.length === 0) return null;

  const openImage = openIndex === null ? null : images[openIndex];
  const canStep = images.length > 1;

  return (
    <div id="gallery" className="mt-12">
      <h2
        data-testid="gallery-heading"
        className="mt-12 mb-4 text-h3 font-medium first:mt-0 md:text-h2-desktop"
      >
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            data-testid="gallery-thumb"
            onClick={() => setOpenIndex(index)}
            aria-label={`${t("expandImage")}: ${image.alt}`}
            className="relative aspect-[4/3] cursor-zoom-in border border-grid-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {openImage && (
        <LightboxModal
          src={openImage.src}
          alt={openImage.alt}
          onClose={close}
          onPrev={canStep ? prev : undefined}
          onNext={canStep ? next : undefined}
          position={
            canStep
              ? { current: (openIndex ?? 0) + 1, total: images.length }
              : undefined
          }
        />
      )}
    </div>
  );
}
