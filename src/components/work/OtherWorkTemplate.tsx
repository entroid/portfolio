import type { ReactElement } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import type { Project } from "@/content/lib";

export type OtherWorkTemplateProps = {
  project: Pick<Project, "meta" | "frontmatter"> & { content: ReactElement };
};

/**
 * Light template for `depth: "other"` projects — enlarged cover image +
 * extended description only, no process/results sections (CONTENT_MODEL.md).
 * Stays quiet like CaseStudyTemplate — no decorative overlays.
 */
export function OtherWorkTemplate({ project }: OtherWorkTemplateProps) {
  const { meta, frontmatter, content } = project;

  return (
    <Section id="other-work">
      <Container className="max-w-[720px]">
        <h1 className="text-h1 font-mono font-extrabold tracking-h1 text-fg md:text-h1-desktop">
          {frontmatter.title}
        </h1>
        <p className="mt-4 text-body text-muted md:text-body-desktop">
          {frontmatter.summary}
        </p>

        <div className="relative mt-8 aspect-[16/9] border border-grid-border">
          <Image
            src={meta.coverImage}
            alt={meta.coverImageAlt}
            fill
            sizes="(min-width: 768px) 720px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-8">{content}</div>
      </Container>
    </Section>
  );
}
