import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { siteLinks } from "@/lib/site-links";
import { ContactPage } from "./ContactPage";

describe("ContactPage", () => {
  it("renders the heading, the form, and direct links from site-links.ts", () => {
    renderWithIntl(<ContactPage />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByTestId("contact-name-input")).toBeInTheDocument();

    expect(screen.getByTestId("contact-direct-email")).toHaveAttribute(
      "href",
      `mailto:${siteLinks.email}`,
    );
    expect(screen.getByTestId("contact-direct-linkedin")).toHaveAttribute(
      "href",
      siteLinks.linkedin,
    );
    expect(screen.getByTestId("contact-direct-whatsapp")).toHaveAttribute(
      "href",
      siteLinks.whatsapp,
    );
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(<ContactPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
