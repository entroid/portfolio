import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { Grain } from "./Grain";

describe("Grain", () => {
  it("is hidden from the accessibility tree and ignores pointer events", () => {
    const { container } = render(<Grain />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute("aria-hidden", "true");
    expect(el.className).toContain("pointer-events-none");
  });

  it("uses a unique filter id per instance", () => {
    const { container } = render(
      <>
        <Grain />
        <Grain />
      </>,
    );
    const ids = Array.from(container.querySelectorAll("filter")).map((el) =>
      el.getAttribute("id"),
    );
    expect(new Set(ids).size).toBe(2);
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(<Grain />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
