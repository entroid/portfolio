"use client";

import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonClassName } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Tabs } from "@/components/ui/Tabs";
import { GridOverlay } from "@/components/ui/GridOverlay";
import { siteLinks } from "@/lib/site-links";
import { cn } from "@/lib/cn";

type Step = {
  lead: string;
  body: string;
};

type DiagramNode = {
  label: string;
  microLabel: string;
};

/**
 * Shared between both tabs, so it lives above the tab selector rather than
 * inside PrototypingTab/FigmaToCodeTab. Deliberately plain `div`s, not an
 * `ol`/`ul` — page.test.tsx/page.composition.test.tsx query the 7-step tab
 * panel via `getByRole("list")`, which requires exactly one list on the
 * page.
 */
function WorkflowDiagram() {
  const t = useTranslations("aiWorkflow.workflow");
  const nodes = t.raw("diagram") as DiagramNode[];
  const helpsItems = t.raw("helps.items") as string[];
  const doesntItems = t.raw("doesnt.items") as string[];

  return (
    <Reveal className="mt-16">
      {/* <h2 className="text-h3 font-mono font-bold text-fg md:text-h3-desktop">
        {t("heading")}
      </h2> */}

      {/* Mobile: each node (box + label below it) stacked, arrow rotated as a divider. */}
      <div className="mt-8 flex flex-col items-center gap-3 md:hidden">
        {nodes.map((node, index) => {
          const isLast = index === nodes.length - 1;
          return (
            <div key={node.label} className="w-full">
              <div
                className={cn(
                  "border px-4 py-3 text-center transition-[border-color,border-image] duration-150",
                  isLast
                    ? "border-accent-gradient"
                    : "border-grid-border hover:border-accent-gradient",
                )}
              >
                <p
                  className={cn(
                    "font-mono text-label font-bold uppercase tracking-label text-fg",
                  )}
                >
                  {node.label}
                </p>
              </div>
              <p className="mt-2 text-center font-sans text-label text-muted">
                {node.microLabel}
              </p>
              {!isLast && (
                <p aria-hidden className="mt-3 text-center text-muted">
                  &darr;
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/*
        Desktop: boxes + arrows share one row so the arrows sit at the
        vertical center of the (label-free, equal-height) boxes; labels
        live in a second row below, with a matching invisible spacer where
        each arrow was so the label columns stay aligned to their boxes.
      */}
      <div className="mt-8 hidden md:block">
        <div className="flex items-center">
          {nodes.map((node, index) => {
            const isLast = index === nodes.length - 1;
            return (
              <Fragment key={node.label}>
                <div
                  className={cn(
                    "flex-1 border px-4 py-3 text-center transition-[border-color,border-image] duration-150",
                    isLast
                      ? "text-accent"
                      : "border-grid-border hover:text-accent",
                  )}
                >
                  <p
                    className={cn(
                      "font-mono text-label-desktop font-bold uppercase tracking-label text-fg",
                      isLast ? "text-accent" : "hover:text-accent",
                    )}
                  >
                    {node.label}
                  </p>
                </div>
                {!isLast && (
                  <span aria-hidden className="px-2 text-muted">
                    &rsaquo;
                  </span>
                )}
              </Fragment>
            );
          })}
        </div>
        <div className="mt-2 flex items-start">
          {nodes.map((node, index) => {
            const isLast = index === nodes.length - 1;
            return (
              <Fragment key={node.label}>
                <p className="flex-1 text-center font-sans text-label-desktop text-muted">
                  {node.microLabel}
                </p>
                {!isLast && (
                  <span aria-hidden className="px-2 text-transparent">
                    &rsaquo;
                  </span>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-label text-muted md:text-label-desktop italic">
        {t("contextLine")}
      </p>

      <div className="mt-10 grid grid-cols-1 divide-y divide-grid-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <div className="pb-8 sm:pr-8 sm:pb-0">
          <h2 className="font-mono text-label font-bold uppercase tracking-label text-fg md:text-label-desktop">
            {t("helps.heading")}
          </h2>
          <div className="mt-4 flex flex-col gap-2">
            {helpsItems.map((item) => (
              <p
                key={item}
                className="text-body text-muted md:text-body-desktop"
              >
                <span aria-hidden className="text-accent">
                  +
                </span>{" "}
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="pt-8 sm:pt-0 sm:pl-8">
          <h2 className="font-mono text-label font-bold uppercase tracking-label text-fg md:text-label-desktop">
            {t("doesnt.heading")}
          </h2>
          <div className="mt-4 flex flex-col gap-2">
            {doesntItems.map((item) => (
              <p
                key={item}
                className="text-body text-muted md:text-body-desktop"
              >
                <span aria-hidden className="text-red-500">
                  &ndash;
                </span>{" "}
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-8 text-body text-muted md:text-body-desktop">
        {t("closing")}
      </p>
    </Reveal>
  );
}

function StepsList({ steps }: { steps: Step[] }) {
  return (
    <ol className="flex flex-col gap-6">
      {steps.map((step, index) => (
        <li
          key={step.lead}
          className="text-body text-muted md:text-body-desktop"
        >
          <span className="font-mono text-body text-accent-2-text md:text-body-desktop">
            {String(index + 1).padStart(2, "0")}
          </span>{" "}
          <span className="font-sans font-semibold text-fg">{step.lead}</span>{" "}
          {step.body}
        </li>
      ))}
    </ol>
  );
}

/**
 * The page's one piece of first-hand evidence: the reader is already on a
 * site built by the process the page describes, and the source is public.
 */
function BuiltWithThis() {
  const t = useTranslations("aiWorkflow.builtWith");

  return (
    <Reveal className="mt-12 border border-grid-border p-6 md:p-8">
      <p
        data-testid="ai-workflow-built-with"
        className="text-body text-muted md:text-body-desktop"
      >
        {t("body")}
      </p>
      <a
        href={siteLinks.repo}
        target="_blank"
        rel="noreferrer"
        data-testid="ai-workflow-repo"
        className="group mt-4 inline-flex items-center gap-2 font-mono text-cta uppercase tracking-cta text-accent transition-colors duration-150 hover:text-fg focus-visible:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
      >
        {t("link")}
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-150 group-hover:translate-x-1 group-focus-visible:translate-x-1"
        >
          →
        </span>
      </a>
    </Reveal>
  );
}

/** Closes the page under both tab panels, centered. */
function WorkflowCta() {
  const t = useTranslations("aiWorkflow.cta");

  return (
    <Reveal className="mt-16 flex flex-col items-center gap-4 text-center">
      <p
        data-testid="ai-workflow-cta-body"
        className="text-body text-fg md:text-body-desktop"
      >
        {t("body")}
      </p>
      <Link
        href="/contact"
        data-testid="ai-workflow-cta"
        className={cn(buttonClassName.primary, "inline-flex")}
      >
        {t("button")}
      </Link>
    </Reveal>
  );
}

function PrototypingTab() {
  const t = useTranslations("aiWorkflow.prototyping");
  const steps = t.raw("steps") as Step[];

  return (
    <>
      <Reveal>
        <StepsList steps={steps} />
      </Reveal>

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
  const t = useTranslations("aiWorkflow.figmaToCode");
  const steps = t.raw("steps") as Step[];

  return (
    <div data-testid="ai-workflow-tab-figma-to-code">
      <Reveal>
        <StepsList steps={steps} />
      </Reveal>

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
    </div>
  );
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

        <p
          data-testid="ai-workflow-closing"
          className="mt-4 text-body text-muted md:text-body-desktop"
        >
          {t("closing")}
        </p>

        <WorkflowDiagram />

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

        <BuiltWithThis />

        <WorkflowCta />
      </Container>
    </Section>
  );
}
