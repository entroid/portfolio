import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Button } from "./Button";

describe("Button", () => {
  it("renders a native button by default", () => {
    render(<Button data-testid="btn">Send</Button>);
    const el = screen.getByTestId("btn");
    expect(el.tagName).toBe("BUTTON");
  });

  it("renders as a link when given an href", () => {
    render(
      <Button href="/work" data-testid="btn">
        Case Studies & Work
      </Button>,
    );
    const link = screen.getByTestId("btn");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/work");
  });

  it("is keyboard-focusable", async () => {
    const user = userEvent.setup();
    render(<Button data-testid="btn">Send</Button>);
    await user.tab();
    expect(screen.getByTestId("btn")).toHaveFocus();
  });

  it("renders bracket decoration for the secondary variant, hidden from the a11y tree", () => {
    render(
      <Button variant="secondary" data-testid="btn">
        work
      </Button>,
    );
    const button = screen.getByTestId("btn");
    const decorative = button.querySelectorAll('[aria-hidden="true"]');
    expect(decorative).toHaveLength(2);
  });

  it("does not render bracket decoration for the primary variant", () => {
    render(
      <Button variant="primary" data-testid="btn">
        Case Studies & Work
      </Button>,
    );
    const button = screen.getByTestId("btn");
    expect(button.querySelectorAll('[aria-hidden="true"]')).toHaveLength(0);
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(
      <>
        <Button variant="primary">Case Studies & Work</Button>
        <Button variant="secondary" href="/work">
          work
        </Button>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
