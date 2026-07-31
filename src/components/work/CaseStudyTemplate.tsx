import type { ReactElement } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { GridOverlay } from "@/components/ui/GridOverlay";
import type { Project } from "@/content/lib";
import { Gallery } from "./Gallery";

export type CaseStudyTemplateProps = {
  project: Pick<Project, "meta" | "frontmatter"> & { content: ReactElement };
};

/**
 * Full template for `depth: "featured"` projects. Per DESIGN_SYSTEM.md's
 * hierarchy rule, the body itself stays quiet — no crosshair/mono-label
 * decoration here, unlike the /work index. `GridOverlay` is the one
 * exception: it fades out via a mask before the body content starts, same
 * header treatment as hero/contact/ai-workflow.
 */
export function CaseStudyTemplate({ project }: CaseStudyTemplateProps) {
  const t = useTranslations("work.caseStudy");
  const { meta, frontmatter, content } = project;

  return (
    <Section id="case-study" className="relative overflow-hidden">
      <GridOverlay className="opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <Container className="relative max-w-[840px] bg-bg">
        <h1
          data-testid="case-study-heading"
          className="text-h1 font-mono font-extrabold tracking-h1 text-fg md:text-h1-desktop leading-h1"
        >
          {frontmatter.title}
        </h1>
        <p className="mt-4 text-body text-muted md:text-body-desktop">
          {frontmatter.summary}
        </p>

        <dl className="mt-8 grid gap-6 border-t border-b border-grid-border py-6 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-label uppercase tracking-label text-muted">
              {t("role")}
            </dt>
            <dd
              data-testid="case-study-role"
              className="mt-1 text-body text-fg"
            >
              {frontmatter.role}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-label uppercase tracking-label text-muted">
              {t("context")}
            </dt>
            <dd
              data-testid="case-study-context"
              className="mt-1 text-body text-fg"
            >
              {frontmatter.context}
            </dd>
          </div>
        </dl>

        {frontmatter.results && frontmatter.results.length > 0 && (
          <dl
            data-testid="case-study-results"
            className="flex flex-col items-center gap-6 border-b border-grid-border py-6 text-center sm:flex-row sm:justify-center sm:gap-16"
          >
            {frontmatter.results.map((result) => (
              <div key={result.label}>
                <dt className="font-mono font-extrabold text-accent-2 text-h3-desktop">
                  {result.value}
                </dt>
                <dd className="mt-1 font-mono text-label uppercase tracking-label text-muted">
                  {result.label}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div data-testid="case-study-content" className="mt-8">
          {content}
        </div>

        <Gallery images={meta.gallery} title={t("gallery")} />
      </Container>
    </Section>
  );
}
