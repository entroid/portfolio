import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "@/test/renderWithIntl";
import { CaseStudyImage } from "./mdx-components";

describe("CaseStudyImage", () => {
  it("renders a figcaption with the alt text", () => {
    renderWithIntl(
      <CaseStudyImage
        src="/images/work/x/shot.jpg"
        alt="Dashboard showing three correlated failures"
      />,
    );

    expect(
      screen.getByText("Dashboard showing three correlated failures"),
    ).toBeInTheDocument();
  });
});
