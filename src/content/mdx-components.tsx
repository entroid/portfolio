import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type CaseStudyImageProps = ComponentPropsWithoutRef<"img"> & {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

/**
 * Every use is validated at build time (src/content/lib.ts) to have a
 * real, non-trivial `alt` — see CONTENT_MODEL.md.
 */
export function CaseStudyImage({
  src,
  alt,
  width = 1600,
  height = 900,
  className,
  ...props
}: CaseStudyImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        "my-8 w-full border border-[color:var(--color-grid-border)]",
        className,
      )}
      {...props}
    />
  );
}

function CaseStudyHeading2({
  children,
  ...props
}: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className="mt-12 mb-4 text-h3 md:text-h2-desktop font-medium first:mt-0"
      {...props}
    >
      {children}
    </h2>
  );
}

function CaseStudyHeading3({
  children,
  ...props
}: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3 className="mt-8 mb-3 text-h3 md:text-h3-desktop font-medium" {...props}>
      {children}
    </h3>
  );
}

function CaseStudyParagraph({
  children,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className="text-body md:text-body-desktop text-muted leading-relaxed"
      {...props}
    >
      {children}
    </p>
  );
}

export const caseStudyMdxComponents = {
  CaseStudyImage,
  h2: CaseStudyHeading2,
  h3: CaseStudyHeading3,
  p: CaseStudyParagraph,
};

/**
 * "Other work" bodies skip process/results-style headings entirely (per
 * CONTENT_MODEL.md) — enforced structurally by not registering the
 * heading-driven layout components here, rather than trusting authors to
 * omit `## `-style headings in the MDX source.
 */
export const otherWorkMdxComponents = {
  CaseStudyImage,
  p: CaseStudyParagraph,
};
