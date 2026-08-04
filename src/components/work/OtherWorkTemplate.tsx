import type { ReactElement } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { GridOverlay } from "@/components/ui/GridOverlay";
import type { Project } from "@/content/lib";
import { CaseStudyHeader } from "./CaseStudyHeader";

export type OtherWorkTemplateProps = {
  project: Pick<Project, "meta" | "frontmatter"> & { content: ReactElement };
};

/**
 * Light template for `depth: "other"` projects — shares the same header
 * (title, summary, cover image, optional role/responsibilities/context)
 * as CaseStudyTemplate, but skips the process/results sections
 * (CONTENT_MODEL.md). Stays quiet like CaseStudyTemplate — no
 * crosshair/mono-label decoration. `GridOverlay` is the one exception,
 * same header treatment as CaseStudyTemplate/hero/contact/ai-workflow.
 */
export function OtherWorkTemplate({ project }: OtherWorkTemplateProps) {
  const { content } = project;

  return (
    <Section id="other-work" className="relative overflow-hidden">
      <GridOverlay className="opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <Container className="relative max-w-[720px] bg-bg">
        <CaseStudyHeader project={project} />

        <div data-testid="other-work-content" className="mt-8">
          {content}
        </div>
      </Container>
    </Section>
  );
}
