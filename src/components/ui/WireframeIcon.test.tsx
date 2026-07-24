import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { WireframeIcon } from "./WireframeIcon";

describe("WireframeIcon", () => {
  it("is hidden from the accessibility tree", () => {
    const { container } = render(<WireframeIcon />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(<WireframeIcon />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
