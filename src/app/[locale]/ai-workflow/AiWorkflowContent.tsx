"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Tabs } from "@/components/ui/Tabs";
import { GridOverlay } from "@/components/ui/GridOverlay";

type Step = {
  lead: string;
  body: string;
};

function PrototypingTab() {
  const t = useTranslations("aiWorkflow.prototyping");
  const steps = t.raw("steps") as Step[];

  return (
    <>
      <Reveal>
        <ol className="flex flex-col gap-6">
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

      <p
        data-testid="ai-workflow-closing"
        className="mt-10 text-body text-muted md:text-body-desktop"
      >
        {t("closing")}
      </p>

      <Reveal className="mt-12 border border-grid-border p-6 md:p-8">
        <h2
          data-testid="ai-workflow-team-heading"
          className="text-h3 font-mono font-bold text-fg"
        >
          {t("team.heading")}
        </h2>
        <p className="mt-4 text-body text-muted md:text-body-desktop">
          {t("team.body")}
        </p>
      </Reveal>
    </>
  );
}

function FigmaToCodeTab() {
  return <div data-testid="ai-workflow-tab-figma-to-code" />;
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
  const t = useTranslations("aiWorkflow");

  return (
    <Section id="ai-workflow">
      <Container className="max-w-[840px]">
        <GridOverlay className="opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

        <h1
          data-testid="ai-workflow-title"
          className="text-h2 font-mono font-extrabold tracking-h1 text-fg md:text-h2-desktop"
        >
          {t("title")}
        </h1>

        <p
          data-testid="ai-workflow-intro"
          className="mt-6 text-body text-muted md:text-body-desktop"
        >
          {t("intro")}
        </p>

        <Tabs
          className="relative mt-10 bg-bg"
          items={[
            {
              id: "prototyping",
              label: t("tabs.prototyping"),
              content: <PrototypingTab />,
            },
            {
              id: "figmaToCode",
              label: t("tabs.figmaToCode"),
              content: <FigmaToCodeTab />,
            },
          ]}
        />
      </Container>
    </Section>
  );
}
