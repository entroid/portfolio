import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";
import type { Project } from "@/content/lib";

export type FeaturedWorkProps = {
  projects: Pick<Project, "meta" | "frontmatter">[];
};

const arrow =
  "inline-block transition-transform duration-150 group-hover:translate-x-1 group-focus-visible:translate-x-1";

/**
 * Featured case studies on the home page, below About. The home page used
 * to make its whole case in prose and hand off to `/work` through a single
 * button — this puts the work itself in front of readers who never take
 * that click. Cards are the same `CaseStudyCard` the /work index uses, in
 * its three-up (non-featured) size.
 */
export function FeaturedWork({ projects }: FeaturedWorkProps) {
  const t = useTranslations("home.featured");

  if (projects.length === 0) return null;

  return (
    <Section id="featured-work">
      <Container>
        <Reveal>
          <h2 className="text-h2 font-mono font-extrabold tracking-h1 text-fg md:text-h2-desktop">
            {t("heading")}
          </h2>

          <div
            data-testid="home-featured"
            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project) => (
              <CaseStudyCard key={project.meta.slug} project={project} />
            ))}
          </div>

          <Link
            href="/work"
            data-testid="home-featured-all"
            className="group mt-10 inline-flex items-center gap-2 font-mono text-cta uppercase tracking-cta text-accent transition-colors duration-150 hover:text-fg focus-visible:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
          >
            {t("all")}
            <span aria-hidden="true" className={arrow}>
              →
            </span>
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
