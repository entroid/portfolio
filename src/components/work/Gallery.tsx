import Image from "next/image";
import type { GalleryImage } from "@/content/schema";

export type GalleryProps = {
  images: GalleryImage[];
  title: string;
};

/**
 * Optional trailing gallery for featured case studies (CONTENT_MODEL.md) —
 * only renders when a project actually has gallery images.
 */
export function Gallery({ images, title }: GalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="mt-12 mb-4 text-h3 font-medium first:mt-0 md:text-h2-desktop">
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((image) => (
          <div
            key={image.src}
            className="relative aspect-[4/3] border border-grid-border"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
