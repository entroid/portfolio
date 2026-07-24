import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Section } from "./Section";

describe("Section", () => {
  it("renders as a <section> containing its children", () => {
    render(
      <Section>
        <p>content</p>
      </Section>,
    );
    expect(screen.getByText("content")).toBeInTheDocument();
    expect(screen.getByText("content").closest("section")).not.toBeNull();
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
