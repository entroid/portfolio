import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The one remaining section of the home page (`/`), directly below the
 * Hero. Uses `<h2>` to continue the document outline started by the
 * Hero's `<h1>` — see DESIGN_SYSTEM.md's H2 spec (same tight tracking
 * direction as H1, smaller step).
 */
type AboutStat = {
  value: string;
  label: string;
  description: string;
};

export function AboutSection() {
  const t = useTranslations("home.about");
  const skills = t.raw("skills") as string[];
  const stats = t.raw("stats") as AboutStat[];

  return (
    <Section id="about">
      <Container className="max-w-[720px]">
        <Reveal>
          <h2 className="text-h2 font-mono font-extrabold tracking-h1 text-fg md:text-h2-desktop">
            {t("title")}
          </h2>
          <p
            data-testid="about-bio"
            className="mt-6 text-body text-muted md:text-body-desktop"
          >
            {t("bio")}
          </p>
          {skills.length > 0 && (
            <ul
              data-testid="about-skills"
              className="mt-8 flex flex-wrap items-center gap-y-2"
            >
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="font-mono text-label uppercase tracking-label text-accent after:mx-3 after:content-['•'] after:text-muted last:after:content-none md:text-label-desktop"
                >
                  {skill}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </Container>

      {stats.length > 0 && (
        <dl
          data-testid="about-stats"
          className="mt-12 grid grid-cols-1 gap-8 border-t border-grid-border pt-8 sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-h3 font-mono font-extrabold text-fg md:text-h3-desktop">
                {stat.value}
              </dt>
              <dd className="mt-2 font-mono text-label font-bold uppercase tracking-label text-fg md:text-label-desktop">
                {stat.label}
              </dd>
              <dd className="mt-1 font-mono text-label text-muted md:text-label-desktop">
                {stat.description}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </Section>
  );
}
