import type { ReactElement } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { GridOverlay } from "@/components/ui/GridOverlay";
import type { Project } from "@/content/lib";
import { Gallery } from "./Gallery";
import { CaseStudyOutro } from "./CaseStudyOutro";
import { CaseStudyHeader } from "./CaseStudyHeader";

export type CaseStudyTemplateProps = {
  project: Pick<Project, "meta" | "frontmatter"> & { content: ReactElement };
  nextProject?: Pick<Project, "meta" | "frontmatter"> | null;
};

/**
 * Full template for `depth: "featured"` projects. Per DESIGN_SYSTEM.md's
 * hierarchy rule, the body itself stays quiet — no crosshair/mono-label
 * decoration here, unlike the /work index. `GridOverlay` is the one
 * exception: it fades out via a mask before the body content starts, same
 * header treatment as hero/contact/ai-workflow.
 */
export function CaseStudyTemplate({
  project,
  nextProject,
}: CaseStudyTemplateProps) {
  const t = useTranslations("work.caseStudy");
  const { meta, frontmatter, content } = project;

  return (
    <Section id="case-study" className="relative overflow-hidden">
      <GridOverlay className="opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <Container className="relative max-w-[840px] bg-bg">
        <CaseStudyHeader project={project} />

        {frontmatter.results && frontmatter.results.length > 0 && (
          <div className="border-b border-grid-border py-6">
            <dl
              data-testid="case-study-results"
              className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-center sm:gap-16"
            >
              {frontmatter.results.map((result) => (
                <div key={result.label}>
                  <dt className="font-mono font-extrabold text-accent-2 text-h2-desktop">
                    {result.value}
                  </dt>
                  <dd className="mt-1 font-mono text-label uppercase tracking-label ">
                    {result.label}
                  </dd>
                </div>
              ))}
            </dl>

            {frontmatter.resultsNote && (
              <p
                data-testid="case-study-results-note"
                className="mt-4 text-center font-mono text-label text-muted md:text-label-desktop"
              >
                {frontmatter.resultsNote}
              </p>
            )}
          </div>
        )}

        <div data-testid="case-study-content" className="mt-8">
          {content}
        </div>

        <Gallery images={meta.gallery} title={t("gallery")} />

        <CaseStudyOutro nextProject={nextProject} />
      </Container>
    </Section>
  );
}
