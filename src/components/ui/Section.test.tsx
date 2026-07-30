import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Section } from "./Section";

describe("Section", () => {
  it("renders as a <section> containing its children", () => {
    render(
      <Section>
        <p data-testid="child" />
      </Section>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByTestId("child").closest("section")).not.toBeNull();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(
      <Section aria-label="Example section">
        <p>content</p>
      </Section>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
