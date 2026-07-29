import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const TITLE = "AI-Assisted Workflow";
const DESCRIPTION =
  "How Hernán Ainsa's design and development process is built around AI — from discovery to shipped interface.";

/**
 * English-only, same as the page body (see the bilingual exception noted
 * below) — both locale segments get identical metadata.
 */
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

type Step = {
  lead: string;
  body: string;
};

const steps: Step[] = [
  {
    lead: "Discovery — human-led.",
    body: "I start where AI can't: talking with stakeholders and users, looking at competitors and the market, getting a real feel for the problem. No rigid framework — I keep it loose and follow what each project actually needs.",
  },
  {
    lead: "Brief & direction.",
    body: "I turn that into a written functional brief and a visual direction — references, mood, constraints. This is what keeps everything that follows from going generic.",
  },
  {
    lead: "Design system & concept — Claude Design.",
    body: "With the brief as context, I generate a first design system and visual concept. I review it, keep what works, rework what doesn't.",
  },
  {
    lead: "Technical plan — Claude Code.",
    body: "Once the direction holds up, I move into Claude Code to define the tech stack, architecture, and a staged build plan. AI drafts it, I call it.",
  },
  {
    lead: "Build.",
    body: "Execution happens in stages, checkpoint by checkpoint. Result: a working first version, not a mockup.",
  },
  {
    lead: "Iterate.",
    body: "I test it, find what's off, and go back to whatever needs it — design, plan, or code.",
  },
  {
    lead: "Back to Figma.",
    body: "Once the build settles, I sync the design system back into Figma via MCP — so it can keep moving between Figma and code as the product grows, not stay frozen after v1.",
  },
];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Split from the default export so it can be unit-tested directly:
 * `setRequestLocale` (next-intl/server) resolves to a client-incompatible
 * stub outside a real RSC pipeline and throws under Vitest (jsdom has no
 * RSC renderer) — same issue Phase 3 hit with `getTranslations`. This
 * component itself reads no next-intl APIs, so it's safe to render on its
 * own in tests.
 */
export function AiWorkflowContent() {
  return (
    <Section>
      <Container className="max-w-[840px]">
        <h1 className="text-h2 font-mono font-extrabold tracking-h1 text-fg md:text-h2-desktop">
          AI-Assisted Workflow
        </h1>

        <p className="mt-6 text-body text-muted md:text-body-desktop">
          I don&apos;t just use AI to design faster — I built a process around
          it, one I keep refining. Here&apos;s how a project actually moves
          through my hands, from a rough idea to a shipped interface.
        </p>

        <Reveal>
          <ol className="mt-10 flex flex-col gap-6">
            {steps.map((step, index) => (
              <li
                key={step.lead}
                className="text-body text-muted md:text-body-desktop"
              >
                <span className="font-mono text-label text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>{" "}
                <span className="font-sans font-semibold text-fg">
                  {step.lead}
                </span>{" "}
                {step.body}
              </li>
            ))}
          </ol>
        </Reveal>

        <p className="mt-10 text-body text-muted md:text-body-desktop">
          At every step, I&apos;m the one deciding what and how it moves
          forward. AI does the heavy lifting — not the directing.
        </p>

        <Reveal className="mt-12 border border-grid-border p-6 md:p-8">
          <h2 className="text-h3 font-mono font-bold text-fg">
            How does this fit into a team?
          </h2>
          <p className="mt-4 text-body text-muted md:text-body-desktop">
            Strip away the specific tools and what&apos;s left is just good
            process: a written brief before anything gets built, a design system
            as the single source of truth, a review checkpoint between every
            stage. That works whether it&apos;s me and Claude, or a full team on
            Figma and Jira with no AI involved at all. The tools change. The
            discipline doesn&apos;t.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/**
 * English-only per PROJECT_BRIEF.md's 2026-07-24 structural revision —
 * copy is hardcoded rather than sourced from next-intl messages, and the
 * same content renders under both locale segments until a Spanish pass is
 * explicitly scheduled. See CONTENT_MODEL.md's "Static pages" section for
 * why this page also skips the content/ data layer entirely.
 */
export default async function AiWorkflowPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AiWorkflowContent />;
}
