import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { AiWorkflowContent } from "./page";

describe("AiWorkflowContent", () => {
  it("renders the title, intro, and closing line", () => {
    render(<AiWorkflowContent />);

    expect(
      screen.getByRole("heading", { level: 1, name: "AI-Assisted Workflow" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/I don't just use AI to design faster/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/AI does the heavy lifting — not the directing\./),
    ).toBeInTheDocument();
  });

  it("renders the seven steps as a real ordered list", () => {
    render(<AiWorkflowContent />);

    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
    expect(list.children).toHaveLength(7);
    expect(screen.getByText("Discovery — human-led.")).toBeInTheDocument();
    expect(screen.getByText("Back to Figma.")).toBeInTheDocument();
  });

  it("renders the team callout as a heading + paragraph", () => {
    render(<AiWorkflowContent />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "How does this fit into a team?",
      }),
    ).toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(<AiWorkflowContent />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
