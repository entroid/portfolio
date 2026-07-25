import { describe, expect, it } from "vitest";
import { projectFrontmatterSchema, projectMetaSchema } from "./schema";

describe("projectMetaSchema", () => {
  it("accepts a valid meta object and defaults gallery to []", () => {
    const result = projectMetaSchema.parse({
      slug: "signal-desk",
      depth: "featured",
      order: 1,
      coverImage: "/images/work/signal-desk/cover.jpg",
    });
    expect(result.gallery).toEqual([]);
  });

  it("rejects an invalid depth", () => {
    expect(() =>
      projectMetaSchema.parse({
        slug: "signal-desk",
        depth: "medium",
        order: 1,
        coverImage: "/x.jpg",
      }),
    ).toThrow();
  });

  it("rejects a missing order", () => {
    expect(() =>
      projectMetaSchema.parse({
        slug: "signal-desk",
        depth: "featured",
        coverImage: "/x.jpg",
      }),
    ).toThrow();
  });
});

describe("projectFrontmatterSchema", () => {
  it("accepts frontmatter without role/context (other-depth projects)", () => {
    const result = projectFrontmatterSchema.parse({
      title: "Lumen CRM",
      summary: "A pipeline view redesign.",
    });
    expect(result.role).toBeUndefined();
    expect(result.context).toBeUndefined();
  });

  it("accepts frontmatter with role/context (featured projects)", () => {
    const result = projectFrontmatterSchema.parse({
      title: "Signal Desk",
      summary: "A dashboard redesign.",
      role: "Product designer",
      context: "An internal ops tool.",
    });
    expect(result.role).toBe("Product designer");
  });

  it("rejects frontmatter missing a title", () => {
    expect(() =>
      projectFrontmatterSchema.parse({ summary: "Missing a title." }),
    ).toThrow();
  });
});
