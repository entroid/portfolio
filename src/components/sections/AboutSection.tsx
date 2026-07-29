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
export function AboutSection() {
  const t = useTranslations("home.about");
  const skills = t.raw("skills") as string[];

  return (
    <Section>
      <Container className="max-w-[720px]">
        <Reveal>
          <h2 className="text-h2 font-mono font-extrabold tracking-h1 text-fg md:text-h2-desktop">
            {t("title")}
          </h2>
          <p className="mt-6 text-body text-muted md:text-body-desktop">
            {t("bio")}
          </p>
          {skills.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="font-mono text-label uppercase tracking-label text-muted md:text-label-desktop"
                >
                  {skill}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </Container>
    </Section>
  );
}
