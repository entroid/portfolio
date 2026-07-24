import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { siteLinks } from "@/lib/site-links";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders email, LinkedIn, and WhatsApp links from site-links.ts", () => {
    renderWithIntl(<Footer />);
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      `mailto:${siteLinks.email}`,
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      siteLinks.linkedin,
    );
    expect(screen.getByRole("link", { name: "WhatsApp" })).toHaveAttribute(
      "href",
      siteLinks.whatsapp,
    );
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(<Footer />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
