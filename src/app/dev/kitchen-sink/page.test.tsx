import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import KitchenSinkPage from "./page";

describe("KitchenSinkPage", () => {
  it("renders every primitive section", () => {
    render(<KitchenSinkPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Kitchen Sink" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Case Studies & Work")).toBeInTheDocument();
    expect(screen.getByText("work")).toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(<KitchenSinkPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
