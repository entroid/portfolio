import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { GridOverlay } from "./GridOverlay";

describe("GridOverlay", () => {
  it("is hidden from the accessibility tree and ignores pointer events", () => {
    const { container } = render(<GridOverlay data-testid="grid" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute("aria-hidden", "true");
    expect(el.className).toContain("pointer-events-none");
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(<GridOverlay />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
