import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GridOverlay } from "@/components/ui/GridOverlay";
import { Crosshair } from "@/components/ui/Crosshair";
import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/content/lib";
import { CaseStudyCard } from "./CaseStudyCard";

export type WorkIndexProps = {
  projects: Pick<Project, "meta" | "frontmatter">[];
};

/**
 * Per DESIGN_SYSTEM.md's hierarchy rule, decoration (grid, crosshair) is
 * allowed on the /work index itself — it's the case study *body* that stays
 * quiet, not this listing page.
 */
export function WorkIndex({ projects }: WorkIndexProps) {
  const t = useTranslations("work.index");
  const featured = projects.filter((p) => p.meta.depth === "featured");
  const other = projects.filter((p) => p.meta.depth === "other");

  return (
    <Section id="work-index" className="relative overflow-hidden">
      <GridOverlay className="opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <Crosshair className="absolute top-8 right-8 h-6 w-6" />

      <Container className="relative">
        <Eyebrow as="p">{t("eyebrow")}</Eyebrow>
        <h1 className="mt-4 text-h1 font-mono font-extrabold tracking-h1 text-fg md:text-h1-desktop">
          {t("title")}
        </h1>
        <p
          data-testid="work-intro"
          className="mt-6 max-w-[60ch] text-body text-muted md:text-body-desktop"
        >
          {t("intro")}
        </p>

        {featured.length > 0 && (
          <Reveal className="mt-16" data-testid="work-featured">
            <h2 className="text-h2 font-mono font-bold text-fg md:text-h2-desktop">
              {t("featuredHeading")}
            </h2>
            <div className="mt-6 grid gap-8 md:grid-cols-2">
              {featured.map((project) => (
                <CaseStudyCard
                  key={project.meta.slug}
                  project={project}
                  featured
                />
              ))}
            </div>
          </Reveal>
        )}

        {other.length > 0 && (
          <Reveal className="mt-28" data-testid="work-other">
            <h2 className="text-h2 font-mono font-bold text-fg md:text-h2-desktop">
              {t("otherHeading")}
            </h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {other.map((project) => (
                <CaseStudyCard key={project.meta.slug} project={project} />
              ))}
            </div>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
