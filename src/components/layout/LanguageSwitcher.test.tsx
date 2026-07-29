import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { LanguageSwitcher } from "./LanguageSwitcher";

const replace = vi.fn();

// LanguageSwitcher calls usePathname/useRouter from our locale-aware
// "@/i18n/navigation" wrapper (next-intl's createNavigation), not raw
// next/navigation — mock that directly so we can assert what it's called
// with, and stub the current pathname per test.
let mockPathname = "/";

vi.mock("@/i18n/navigation", async (importActual) => ({
  ...(await importActual<typeof import("@/i18n/navigation")>()),
  usePathname: () => mockPathname,
  useRouter: () => ({
    push: vi.fn(),
    replace,
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

  it("switches locale while preserving the current route, including nested slugs", async () => {
    mockPathname = "/work/lumen-crm";
    const user = userEvent.setup();
    renderWithIntl(<LanguageSwitcher />);

    await user.click(screen.getByRole("button", { name: "ES" }));

    expect(replace).toHaveBeenCalledWith("/work/lumen-crm", { locale: "es" });
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(<LanguageSwitcher />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
