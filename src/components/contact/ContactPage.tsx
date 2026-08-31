import { useLocale, useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClassName } from "@/components/ui/Button";
import { siteLinks } from "@/lib/site-links";
import { cn } from "@/lib/cn";
import { ContactForm } from "./ContactForm";
import { GridOverlay } from "@/components/ui/GridOverlay";

const secondaryLinkClassName =
  "group inline-flex items-center font-mono text-label uppercase tracking-label text-muted transition-colors duration-150 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg md:text-label-desktop";

/**
 * The three direct channels carry the primary button treatment and the form
 * doesn't: a recruiter reaching a stranger is far likelier to use email or
 * LinkedIn — both of which leave a record on their side and take an
 * attachment — than to type into a form that gives them nothing back. The
 * form stays as the fallback it actually is.
 */
export function ContactPage() {
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  const cvPath = locale === "es" ? siteLinks.cvPathEs : siteLinks.cvPathEn;
  // Pre-set subject so the sender skips one decision, and so inbound from the
  // site is recognisable in the inbox.
  const mailto = `mailto:${siteLinks.email}?subject=${encodeURIComponent(
    t("direct.emailSubject"),
  )}`;

  return (
    <Section id="contact">
      <Container className="max-w-[720px]">
        <GridOverlay className="opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

        <h1 className="text-h1 font-mono font-extrabold tracking-h1 text-fg md:text-h1-desktop">
          {t("title")}
        </h1>
        <p className="mt-5 text-body text-muted md:text-body-desktop">
          {t("intro")}
        </p>

        <Reveal className="mt-8" delay={0.1}>
          <nav
            aria-label={t("direct.title")}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href={mailto}
              data-testid="contact-direct-email"
              className={cn(buttonClassName.primary, "inline-flex")}
            >
              {tFooter("email")}
            </a>
            <a
              href={siteLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              data-testid="contact-direct-linkedin"
              className={cn(buttonClassName.primary, "inline-flex")}
            >
              {tFooter("linkedin")}
            </a>
            <a
              href={siteLinks.whatsapp}
              target="_blank"
              rel="noreferrer"
              data-testid="contact-direct-whatsapp"
              className={cn(buttonClassName.primary, "inline-flex")}
            >
              {tFooter("whatsapp")}
            </a>
          </nav>

          {/* Plenty of corporate machines have no mail client bound to
              mailto:, where the button above does nothing. The address is
              spelled out and select-all so it can always be copied. */}
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span
              data-testid="contact-email-address"
              className="cursor-text font-mono text-label tracking-label text-muted select-all md:text-label-desktop"
            >
              {siteLinks.email}
            </span>
            {/* Serves the CV in whichever language the page is being read in. */}
            <a
              href={cvPath}
              download
              data-testid="contact-direct-cv"
              className={secondaryLinkClassName}
            >
              <BracketLabel>{tNav("cv")}</BracketLabel>
            </a>
          </div>
        </Reveal>

        <Reveal className="mt-6 border-t border-grid-border pt-5">
          <ContactForm />
        </Reveal>
      </Container>
    </Section>
  );
}
