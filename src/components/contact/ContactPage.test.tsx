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
      expect.stringContaining(`mailto:${siteLinks.email}?subject=`),
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

  it("offers the CV in the language the page is read in", () => {
    renderWithIntl(<ContactPage />);
    expect(screen.getByTestId("contact-direct-cv")).toHaveAttribute(
      "href",
      siteLinks.cvPathEn,
    );

    renderWithIntl(<ContactPage />, { locale: "es" });
    expect(screen.getAllByTestId("contact-direct-cv")[1]).toHaveAttribute(
      "href",
      siteLinks.cvPathEs,
    );
  });

  it("spells out the address for machines with no mailto: handler", () => {
    renderWithIntl(<ContactPage />);
    expect(screen.getByTestId("contact-email-address")).toHaveTextContent(
      siteLinks.email,
    );
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(<ContactPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
