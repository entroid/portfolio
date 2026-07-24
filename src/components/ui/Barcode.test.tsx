import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { Barcode } from "./Barcode";

describe("Barcode", () => {
  it("is hidden from the accessibility tree", () => {
    const { container } = render(<Barcode />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("renders more than one bar", () => {
    const { container } = render(<Barcode />);
    expect(container.querySelectorAll("rect").length).toBeGreaterThan(1);
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(<Barcode />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
