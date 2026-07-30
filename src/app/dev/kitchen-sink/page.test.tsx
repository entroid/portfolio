import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import KitchenSinkPage from "./page";

describe("KitchenSinkPage", () => {
  it("renders every primitive section", () => {
    render(<KitchenSinkPage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 }).length).toBeGreaterThan(
      0,
    );
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link").length).toBeGreaterThan(0);
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(<KitchenSinkPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
