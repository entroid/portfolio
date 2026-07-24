import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { MonoLabel } from "./MonoLabel";

describe("MonoLabel", () => {
  it("renders its text but hides it from the accessibility tree", () => {
    const { container } = render(<MonoLabel>SIG-004</MonoLabel>);
    const el = container.querySelector("span");
    expect(el).toHaveTextContent("SIG-004");
    expect(el).toHaveAttribute("aria-hidden", "true");
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(<MonoLabel>N43.28 W72.01</MonoLabel>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
