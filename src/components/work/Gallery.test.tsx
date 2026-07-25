import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Gallery } from "./Gallery";

describe("Gallery", () => {
  it("renders nothing when there are no images", () => {
    const { container } = render(<Gallery images={[]} title="Gallery" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders every image with its own descriptive alt text", () => {
    render(
      <Gallery
        images={[
          { src: "/a.png", alt: "Alpha screen" },
          { src: "/b.png", alt: "Beta screen" },
        ]}
        title="Gallery"
      />,
    );
    expect(screen.getByAltText("Alpha screen")).toBeInTheDocument();
    expect(screen.getByAltText("Beta screen")).toBeInTheDocument();
  });

  it("renders the section title as a heading", () => {
    render(
      <Gallery images={[{ src: "/a.png", alt: "Alpha" }]} title="Gallery" />,
    );
    expect(
      screen.getByRole("heading", { name: "Gallery" }),
    ).toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(
      <Gallery images={[{ src: "/a.png", alt: "Alpha" }]} title="Gallery" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
