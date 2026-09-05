import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { siteLinks } from "@/lib/site-links";
import { AiWorkflowContent } from "./AiWorkflowContent";

describe("AiWorkflowContent", () => {
  it("renders the title, intro, and closing line", () => {
    renderWithIntl(<AiWorkflowContent />, { locale: "en" });

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByTestId("ai-workflow-title")).toBeInTheDocument();
    expect(screen.getByTestId("ai-workflow-intro")).toBeInTheDocument();
    expect(screen.getByTestId("ai-workflow-closing")).toBeInTheDocument();
  });

  it("renders the seven steps as a real ordered list", () => {
    renderWithIntl(<AiWorkflowContent />, { locale: "en" });

    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
    expect(list.children).toHaveLength(7);
  });

  it("renders the team callout as a heading + paragraph", () => {
    renderWithIntl(<AiWorkflowContent />, { locale: "en" });

    const heading = screen.getByTestId("ai-workflow-team-heading");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H2");
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(<AiWorkflowContent />, {
      locale: "en",
    });
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no accessibility violations in the Prompting panel either", async () => {
    const user = userEvent.setup();
    const { container } = renderWithIntl(<AiWorkflowContent />, {
      locale: "en",
    });

    // Only the active panel is in the DOM, so the default-panel axe run
    // above never sees this markup.
    await user.click(screen.getByRole("tab", { name: "Prompting" }));
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders the three-tab tablist defaulting to Prototyping", () => {
    renderWithIntl(<AiWorkflowContent />, { locale: "en" });

    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(3);
    expect(screen.getByRole("tab", { name: "Prototyping" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Figma to Code" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
    expect(screen.getByRole("tab", { name: "Prompting" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  it("switches to the Prompting panel, with its four-block structure and prompt example", async () => {
    const user = userEvent.setup();
    renderWithIntl(<AiWorkflowContent />, { locale: "en" });

    await user.click(screen.getByRole("tab", { name: "Prompting" }));

    const panel = screen.getByTestId("ai-workflow-tab-prompting");
    expect(panel).toBeInTheDocument();

    const heading = screen.getByTestId("ai-workflow-prompting-heading");
    expect(heading.tagName).toBe("H2");
    expect(heading).toHaveTextContent("What a strong prompt still needs");

    // The four blocks are the scannable payload of this tab; a dropped one
    // would break the structure the copy is arguing for.
    for (const label of ["The task", "Guardrails", "Done when", "Let it run"]) {
      expect(panel).toHaveTextContent(label);
    }

    // The standing setup is what makes the prompt short; the example is
    // misleading without it, so it has to render alongside.
    expect(screen.getByTestId("ai-workflow-prompt-context")).toHaveTextContent(
      "Before the prompt",
    );
    expect(panel).toHaveTextContent("the team’s coding standards");
    expect(panel).toHaveTextContent("the design system rules");

    const example = screen.getByTestId("ai-workflow-prompt-example");
    expect(example.tagName).toBe("PRE");
    expect(example).toHaveTextContent("TASK");
    expect(example).toHaveTextContent("GUARDRAILS");
    expect(example).toHaveTextContent("DONE WHEN");
    expect(example).toHaveTextContent("Pull the component from Figma over MCP");

    // This tab is deliberately the light one: no artefact, no team box, no
    // case link. Those belong to the two process tabs.
    expect(
      screen.queryByTestId("ai-workflow-team-heading"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("ai-workflow-proto-artifact"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("ai-workflow-figma-artifact"),
    ).not.toBeInTheDocument();
  });

  it("switches to the Figma to Code panel when its tab is activated", async () => {
    const user = userEvent.setup();
    renderWithIntl(<AiWorkflowContent />, { locale: "en" });

    await user.click(screen.getByRole("tab", { name: "Figma to Code" }));

    expect(
      screen.getByTestId("ai-workflow-tab-figma-to-code"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("ai-workflow-closing")).toBeInTheDocument();
    // Both process tabs carry their own team box; assert this is the
    // Figma-to-Code one rather than the Prototyping panel's.
    expect(screen.getByTestId("ai-workflow-team-heading")).toHaveTextContent(
      "Handoff Process",
    );

    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
    expect(list.children).toHaveLength(7);
  });

  it("points at its own source as evidence for the process it describes", () => {
    renderWithIntl(<AiWorkflowContent />, { locale: "en" });

    expect(screen.getByTestId("ai-workflow-built-with")).toHaveTextContent(
      "This site was designed and built with the workflow above",
    );
    expect(screen.getByTestId("ai-workflow-repo")).toHaveAttribute(
      "href",
      siteLinks.repo,
    );
  });

  it("points each tab at the case study where that process actually ran", async () => {
    const user = userEvent.setup();
    renderWithIntl(<AiWorkflowContent />, { locale: "en" });

    expect(screen.getByTestId("ai-workflow-proto-case")).toHaveAttribute(
      "href",
      "/en/work/kier-studio",
    );

    await user.click(screen.getByRole("tab", { name: "Figma to Code" }));
    expect(screen.getByTestId("ai-workflow-figma-case")).toHaveAttribute(
      "href",
      "/en/work/hardrock-marketing-planner",
    );
  });

  it("gives each tab the artefact whose provenance matches it", async () => {
    const user = userEvent.setup();
    renderWithIntl(<AiWorkflowContent />, { locale: "en" });

    // This repo was built with the prototyping flow, so its context layer
    // is the evidence for that tab, not for the Figma one.
    const proto = screen.getByTestId("ai-workflow-proto-artifact");
    expect(proto.tagName).toBe("FIGURE");
    expect(
      screen.getByRole("img", { name: /DESIGN_SYSTEM\.md/ }),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("ai-workflow-figma-artifact"),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Figma to Code" }));

    expect(
      screen.getByTestId("ai-workflow-figma-artifact"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /Variables panel/ }),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("ai-workflow-proto-artifact"),
    ).not.toBeInTheDocument();
  });

  it("closes the page with a single contact CTA below every tab panel", async () => {
    const user = userEvent.setup();
    renderWithIntl(<AiWorkflowContent />, { locale: "en" });

    expect(screen.getByTestId("ai-workflow-cta")).toHaveAttribute(
      "href",
      "/en/contact",
    );

    // Switching tabs must not duplicate or drop it.
    await user.click(screen.getByRole("tab", { name: "Figma to Code" }));
    expect(screen.getAllByTestId("ai-workflow-cta")).toHaveLength(1);

    await user.click(screen.getByRole("tab", { name: "Prompting" }));
    expect(screen.getAllByTestId("ai-workflow-cta")).toHaveLength(1);
  });
});
