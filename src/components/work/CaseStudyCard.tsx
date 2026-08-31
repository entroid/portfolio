import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import type { Project } from "@/content/lib";

export type CaseStudyCardProps = {
  project: Pick<Project, "meta" | "frontmatter">;
  /** Featured cards render larger, in a two-column grid. */
  featured?: boolean;
};

const bracket =
  "inline-block opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0";

/**
 * Whole card is the single interactive element (per DESIGN_SYSTEM.md:
 * "Project cards: same bracket/underline language + subtle lift"), so the
 * "view case study" bracket affordance is decorative text inside the link,
 * not a second nested link.
 *
 * The cover chip carries the headline metric where a project has one; role
 * moved down to the year line, so a project without results reads as one
 * clean image rather than a card missing an element.
 */
export function CaseStudyCard({
  project,
  featured = false,
}: CaseStudyCardProps) {
  const t = useTranslations("work.index");
  const { meta, frontmatter } = project;
  // The card surfaces one figure, not the whole results block: the first is
  // the strongest in every case study that has them.
  const headlineResult = frontmatter.results?.[0];

  return (
    <Link
      href={`/work/${meta.slug}`}
      className={cn(
        "case-study-card group block border border-grid-border bg-bg p-4 transition-colors duration-150 hover:border-accent-gradient focus-visible:border-accent-gradient focus-visible:outline-none md:p-5",
        featured ? "bg-surface" : "",
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden border border-grid-border bg-surface">
        <Image
          src={meta.coverImage}
          alt={meta.coverImageAlt}
          fill
          sizes={
            featured
              ? "(min-width: 768px) 50vw, 100vw"
              : "(min-width: 1024px) 33vw, 100vw"
          }
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-bg/30 transition-colors duration-150 group-hover:bg-bg/0" />
        {headlineResult && (
          <span
            data-testid="case-study-card-result"
            className="absolute right-3 bottom-3 max-w-[80%] border border-grid-border bg-bg/80 px-3 py-1.5 font-mono text-label leading-snug uppercase tracking-label md:text-label-desktop"
          >
            <span className="font-bold text-accent-2-text">
              {headlineResult.value}
            </span>{" "}
            <span className="text-muted">{headlineResult.label}</span>
          </span>
        )}
      </div>

      <span
        data-testid="case-study-year"
        className="mt-4 block font-mono text-label uppercase tracking-label text-accent-2-text"
      >
        {meta.year}
        {frontmatter.role && (
          <span data-testid="case-study-card-role" className="text-muted">
            {" · "}
            {frontmatter.role}
          </span>
        )}
      </span>
      <h3
        data-testid="case-study-title"
        className={cn(
          "mt-1 font-mono font-medium text-fg leading-h3 text-h3 ",
          featured ? "md:text-h3-desktop" : "",
        )}
      >
        {frontmatter.title}
      </h3>
      <p
        data-testid="case-study-summary"
        className="mt-3 text-body md:text-body-desktop text-muted"
      >
        {frontmatter.summary}
      </p>

      <span className="mt-4 inline-flex items-center gap-1 font-mono text-label uppercase tracking-label text-accent">
        <span aria-hidden="true" className={cn(bracket, "-translate-x-1")}>
          [
        </span>
        <span>{t("viewCaseStudy")}</span>
        <span aria-hidden="true" className={cn(bracket, "translate-x-1")}>
          ]
        </span>
      </span>
    </Link>
  );
}
