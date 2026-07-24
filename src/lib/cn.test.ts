import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("joins class names, dropping falsy values", () => {
    expect(cn("a", false, undefined, "b")).toBe("a b");
  });

  it("resolves conflicting Tailwind utilities, keeping the last one", () => {
    expect(cn("p-1", "p-2")).toBe("p-2");
  });

  it("keeps custom font-size tokens alongside a text-color utility", () => {
    // Regression test: without the custom classGroups extension in cn.ts,
    // tailwind-merge doesn't recognize "label" as a font-size suffix and
    // misclassifies it as a text-color conflict with "text-accent",
    // silently dropping "text-label".
    expect(cn("text-label", "text-accent")).toBe("text-label text-accent");
  });

  it("keeps custom tracking tokens distinct from each other", () => {
    expect(cn("tracking-h1", "tracking-eyebrow")).toBe("tracking-eyebrow");
  });
});
