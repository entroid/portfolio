import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Eyebrow } from "./Eyebrow";

describe("Eyebrow", () => {
  it("renders as a paragraph by default, visible to the accessibility tree", () => {
    render(<Eyebrow>UX/UI Design · UI Development</Eyebrow>);
    const el = screen.getByText("UX/UI Design · UI Development");
    expect(el.tagName).toBe("P");
    expect(el).not.toHaveAttribute("aria-hidden");
  });

  it("renders as a different element via the `as` prop", () => {
    render(<Eyebrow as="span">Label</Eyebrow>);
    expect(screen.getByText("Label").tagName).toBe("SPAN");
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(<Eyebrow>Case Studies</Eyebrow>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
