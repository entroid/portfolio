import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Button } from "./Button";

describe("Button", () => {
  it("renders a native button by default", () => {
    render(<Button>Send</Button>);
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
  });

  it("renders as a link when given an href", () => {
    render(<Button href="/work">Case Studies & Work</Button>);
    const link = screen.getByRole("link", { name: "Case Studies & Work" });
    expect(link).toHaveAttribute("href", "/work");
  });

  it("is keyboard-focusable", async () => {
    const user = userEvent.setup();
    render(<Button>Send</Button>);
    await user.tab();
    expect(screen.getByRole("button", { name: "Send" })).toHaveFocus();
  });

  it("renders bracket decoration for the secondary variant, hidden from the a11y tree", () => {
    render(<Button variant="secondary">work</Button>);
    const button = screen.getByRole("button", { name: "work" });
    const decorative = button.querySelectorAll('[aria-hidden="true"]');
    expect(decorative).toHaveLength(2);
    expect(decorative[0]).toHaveTextContent("[");
    expect(decorative[1]).toHaveTextContent("]");
  });

  it("does not render bracket decoration for the primary variant", () => {
    render(<Button variant="primary">Case Studies & Work</Button>);
    const button = screen.getByRole("button", { name: "Case Studies & Work" });
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
