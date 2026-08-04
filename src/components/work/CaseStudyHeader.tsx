import { useTranslations } from "next-intl";
import type { Project } from "@/content/lib";
import { CaseStudyImage } from "@/content/mdx-components";

export type CaseStudyHeaderProps = {
  project: Pick<Project, "meta" | "frontmatter">;
};

/**
 * Title, summary, cover image, and the optional role/responsibilities/
 * context block — shared by both CaseStudyTemplate (featured) and
 * OtherWorkTemplate (other), per CONTENT_MODEL.md. Each detail field is
 * independently optional: a project can supply any subset (or none) and
 * only the supplied fields render.
 */
export function CaseStudyHeader({ project }: CaseStudyHeaderProps) {
  const t = useTranslations("work.caseStudy");
  const { meta, frontmatter } = project;
  const hasRoleColumn = frontmatter.role || frontmatter.responsibilities;

  return (
    <>
      <h1
        data-testid="case-study-heading"
        className="text-h1 font-mono font-extrabold tracking-h1 text-fg md:text-h1-desktop leading-h1"
      >
        {frontmatter.title}
      </h1>
      <p className="mt-4 text-body text-muted md:text-body-desktop">
        {frontmatter.summary}
      </p>

      {meta.coverImage && (
        <CaseStudyImage src={meta.coverImage} alt={meta.coverImageAlt} />
      )}

      {(hasRoleColumn || frontmatter.context) && (
        <dl className="mt-8 grid gap-6 border-t border-b border-grid-border py-6 sm:grid-cols-2">
          {hasRoleColumn && (
            <div>
              {frontmatter.role && (
                <>
                  <dt className="font-mono text-label uppercase tracking-label text-muted">
                    {t("role")}
                  </dt>
                  <dd
                    data-testid="case-study-role"
                    className="mt-1 text-body text-fg"
                  >
                    {frontmatter.role}
                  </dd>
                </>
              )}

              {frontmatter.responsibilities && (
                <>
                  <dt
                    className={
                      frontmatter.role
                        ? "mt-4 font-mono text-label uppercase tracking-label text-muted"
                        : "font-mono text-label uppercase tracking-label text-muted"
                    }
                  >
                    {t("responsibilities")}
                  </dt>
                  <dd
                    data-testid="case-study-responsibilities"
                    className="mt-1 text-body text-fg"
                  >
                    {frontmatter.responsibilities}
                  </dd>
                </>
              )}
            </div>
          )}

          {frontmatter.context && (
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
          )}
        </dl>
      )}
    </>
  );
}
