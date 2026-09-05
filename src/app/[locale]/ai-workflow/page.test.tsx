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

  it("renders a Prototyping/Figma to Code tablist defaulting to Prototyping", () => {
    renderWithIntl(<AiWorkflowContent />, { locale: "en" });

    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Prototyping" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Figma to Code" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  it("switches to the Figma to Code panel when its tab is activated", async () => {
    const user = userEvent.setup();
    renderWithIntl(<AiWorkflowContent />, { locale: "en" });

    await user.click(screen.getByRole("tab", { name: "Figma to Code" }));

    expect(
      screen.getByTestId("ai-workflow-tab-figma-to-code"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("ai-workflow-closing")).toBeInTheDocument();
    // Both tabs carry their own team box; assert this is the Figma-to-Code
    // one rather than the Prototyping panel's.
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

  it("shows the context-layer artefact alongside the Figma-to-Code steps", async () => {
    const user = userEvent.setup();
    renderWithIntl(<AiWorkflowContent />, { locale: "en" });

    // It belongs to step 02 of that tab, so it must not leak into the other.
    expect(
      screen.queryByTestId("ai-workflow-artifact"),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Figma to Code" }));

    const figure = screen.getByTestId("ai-workflow-artifact");
    expect(figure.tagName).toBe("FIGURE");
    expect(
      screen.getByRole("img", { name: /DESIGN_SYSTEM\.md/ }),
    ).toBeInTheDocument();
  });

  it("closes the page with a single contact CTA below both tab panels", async () => {
    const user = userEvent.setup();
    renderWithIntl(<AiWorkflowContent />, { locale: "en" });

    expect(screen.getByTestId("ai-workflow-cta")).toHaveAttribute(
      "href",
      "/en/contact",
    );

    // Switching tabs must not duplicate or drop it.
    await user.click(screen.getByRole("tab", { name: "Figma to Code" }));
    expect(screen.getAllByTestId("ai-workflow-cta")).toHaveLength(1);
  });
});
