import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { LanguageSwitcher } from "./LanguageSwitcher";

// next-intl's useRouter wraps Next's App Router useRouter(), which throws
// outside a mounted <AppRouterContext> — not present in these unit tests.
vi.mock("next/navigation", async (importActual) => ({
  ...(await importActual<typeof import("next/navigation")>()),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
}));

describe("LanguageSwitcher", () => {
  it("renders both locales with the current one marked", () => {
    renderWithIntl(<LanguageSwitcher />);
    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute(
      "aria-current",
      "true",
    );
    expect(screen.getByRole("button", { name: "ES" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(<LanguageSwitcher />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
