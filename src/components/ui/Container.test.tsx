import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Container } from "./Container";

describe("Container", () => {
  it("renders its children", () => {
    render(
      <Container>
        <p>content</p>
      </Container>,
    );
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("merges a custom className with the base styles", () => {
    render(<Container className="bg-surface" data-testid="container" />);
    expect(screen.getByTestId("container").className).toContain("bg-surface");
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(
      <Container>
        <p>content</p>
      </Container>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
