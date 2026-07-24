import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { Crosshair } from "./Crosshair";

describe("Crosshair", () => {
  it("is hidden from the accessibility tree", () => {
    const { container } = render(<Crosshair />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(<Crosshair />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
