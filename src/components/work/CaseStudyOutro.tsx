import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonClassName } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { Project } from "@/content/lib";

export type CaseStudyOutroProps = {
  /** The next project in /work's reading order, or null at the end of a one-project site. */
  nextProject?: Pick<Project, "meta" | "frontmatter"> | null;
};

const arrow =
  "inline-block transition-transform duration-150 group-hover:translate-x-1 group-focus-visible:translate-x-1";

/**
 * Closing block for a case study. Finishing a case study is the point in
 * the site where a reader is most likely to want to make contact, so the
 * page offers that plus somewhere else to go, rather than ending on the
 * gallery with only the navbar as a way out.
 *
 * Uses next-intl's locale-aware `Link` with `buttonClassName` instead of
 * `Button` — same reason as the Hero CTA (see components/ui/Button.tsx).
 */
export function CaseStudyOutro({ nextProject }: CaseStudyOutroProps) {
  const t = useTranslations("work.outro");

  return (
    <div
      data-testid="case-study-outro"
      className="mt-20 border-t border-grid-border pt-10"
    >
      <h2 className="text-h2 font-mono font-bold text-fg md:text-h2-desktop">
        {t("title")}
      </h2>
      <p className="mt-4 max-w-[52ch] text-body text-muted md:text-body-desktop">
        {t("body")}
      </p>
      <Link
        href="/contact"
        data-testid="case-study-outro-cta"
        className={cn(buttonClassName.primary, "mt-8 inline-flex")}
      >
        {t("cta")}
      </Link>

      {nextProject && (
        <Link
          href={`/work/${nextProject.meta.slug}`}
          data-testid="case-study-next"
          className="group mt-12 flex flex-col gap-1 border-t border-grid-border pt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
        >
          <span className="font-mono text-label uppercase tracking-label text-muted md:text-label-desktop">
            {t("next")}
          </span>
          <span className="font-mono text-h3 leading-h3 text-fg transition-colors duration-150 group-hover:text-accent group-focus-visible:text-accent">
            {nextProject.frontmatter.title}{" "}
            <span aria-hidden="true" className={arrow}>
              →
            </span>
          </span>
        </Link>
      )}
    </div>
  );
}
