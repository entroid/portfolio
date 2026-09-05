import type { ComponentPropsWithoutRef } from "react";
import { Lightbox } from "@/components/ui/Lightbox";
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
}: CaseStudyImageProps) {
  return (
    <figure className={cn("my-8 w-full", className)}>
      <Lightbox
        src={src}
        alt={alt}
        width={width}
        height={height}
        imageClassName="w-full border border-[color:var(--color-grid-border)]"
      />
      <figcaption className="mt-2 font-mono text-label text-muted text-center">
        {alt}
      </figcaption>
    </figure>
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

/**
 * MDX bodies had no link styling: Tailwind's preflight makes a bare `<a>`
 * inherit colour and drop the underline, so a markdown link rendered as
 * plain text. External links open in a new tab so a case study isn't lost.
 */
function CaseStudyLink({
  href,
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const isExternal = typeof href === "string" && /^https?:/.test(href);

  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      className="text-accent underline underline-offset-4 transition-colors duration-150 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      {...props}
    >
      {children}
    </a>
  );
}

function CaseStudyParagraph({
  children,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className="text-body md:text-body-desktop text-muted leading-relaxed mb-3"
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
  a: CaseStudyLink,
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
  a: CaseStudyLink,
};
