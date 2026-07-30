import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
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

    expect(screen.getByTestId("ai-workflow-team-heading")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(<AiWorkflowContent />, {
      locale: "en",
    });
    expect(await axe(container)).toHaveNoViolations();
  });
});
