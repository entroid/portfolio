import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Tabs } from "./Tabs";

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({
    matches,
    media: "(prefers-reduced-motion: reduce)",
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  } as unknown as MediaQueryList);
}

const items = [
  { id: "one", label: "One", content: <p data-testid="panel-one">First</p> },
  { id: "two", label: "Two", content: <p data-testid="panel-two">Second</p> },
  {
    id: "three",
    label: "Three",
    content: <p data-testid="panel-three">Third</p>,
  },
];

describe("Tabs", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders a tablist with a tab per item, defaulting to the first as active", () => {
    mockMatchMedia(true);
    render(<Tabs items={items} />);

    expect(screen.getByRole("tablist")).toBeInTheDocument();
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(3);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(tabs[1]).toHaveAttribute("aria-selected", "false");
    expect(screen.getByTestId("panel-one")).toBeInTheDocument();
    expect(screen.queryByTestId("panel-two")).not.toBeInTheDocument();
  });

  it("switches the active panel on click", async () => {
    mockMatchMedia(true);
    const user = userEvent.setup();
    render(<Tabs items={items} />);

    await user.click(screen.getByRole("tab", { name: "Two" }));

    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByTestId("panel-two")).toBeInTheDocument();
    expect(screen.queryByTestId("panel-one")).not.toBeInTheDocument();
  });

  it("supports arrow key, Home, and End navigation", async () => {
    mockMatchMedia(true);
    const user = userEvent.setup();
    render(<Tabs items={items} />);

    screen.getByRole("tab", { name: "One" }).focus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Two" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Three" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Three" })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    await user.keyboard("{Home}");
    expect(screen.getByRole("tab", { name: "One" })).toHaveFocus();

    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Three" })).toHaveFocus();
  });

  it("has no automatically detectable accessibility violations", async () => {
    mockMatchMedia(true);
    const { container } = render(<Tabs items={items} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
