import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "./Reveal";

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({
    matches,
    media: "(prefers-reduced-motion: reduce)",
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  } as unknown as MediaQueryList);
}

describe("Reveal", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders children immediately with no motion wrapper when reduced motion is on", () => {
    mockMatchMedia(true);
    render(
      <Reveal className="reveal-test">
        <p data-testid="child">Content</p>
      </Reveal>,
    );

    const wrapper = screen.getByTestId("child").parentElement;
    expect(wrapper).toHaveClass("reveal-test");
    expect(wrapper?.getAttribute("style")).toBeNull();
  });

  it("renders children inside an animated wrapper when motion is allowed", () => {
    mockMatchMedia(false);
    render(
      <Reveal className="reveal-test">
        <p data-testid="child">Content</p>
      </Reveal>,
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});
