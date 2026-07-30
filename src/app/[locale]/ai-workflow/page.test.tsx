import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { AiWorkflowContent } from "./page";

describe("AiWorkflowContent", () => {
  it("renders the title, intro, and closing line", () => {
    render(<AiWorkflowContent />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByTestId("ai-workflow-title")).toBeInTheDocument();
    expect(screen.getByTestId("ai-workflow-intro")).toBeInTheDocument();
    expect(screen.getByTestId("ai-workflow-closing")).toBeInTheDocument();
  });

  it("renders the seven steps as a real ordered list", () => {
    render(<AiWorkflowContent />);

    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
    expect(list.children).toHaveLength(7);
  });

  it("renders the team callout as a heading + paragraph", () => {
    render(<AiWorkflowContent />);

    expect(screen.getByTestId("ai-workflow-team-heading")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(<AiWorkflowContent />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
