import type { ReactElement } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import type { Project } from "@/content/lib";
import { Gallery } from "./Gallery";

export type CaseStudyTemplateProps = {
  project: Pick<Project, "meta" | "frontmatter"> & { content: ReactElement };
};

/**
 * Full template for `depth: "featured"` projects. Per DESIGN_SYSTEM.md's
 * hierarchy rule, the body itself stays quiet — no grid/crosshair/mono-label
 * decoration here, unlike the /work index.
 */
export function CaseStudyTemplate({ project }: CaseStudyTemplateProps) {
  const t = useTranslations("work.caseStudy");
  const { meta, frontmatter, content } = project;

  return (
    <Section>
      <Container className="max-w-[720px]">
        <h1 className="text-h1 font-mono font-extrabold tracking-h1 text-fg md:text-h1-desktop">
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
            <dd className="mt-1 text-body text-fg">{frontmatter.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-label uppercase tracking-label text-muted">
              {t("context")}
            </dt>
            <dd className="mt-1 text-body text-fg">{frontmatter.context}</dd>
          </div>
        </dl>

        <div className="mt-8">{content}</div>

        <Gallery images={meta.gallery} title={t("gallery")} />
      </Container>
    </Section>
  );
}
