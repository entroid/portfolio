import { describe, expect, it } from "vitest";
import { projectFrontmatterSchema, projectMetaSchema } from "./schema";

describe("projectMetaSchema", () => {
  it("accepts a valid meta object and defaults gallery to []", () => {
    const result = projectMetaSchema.parse({
      slug: "signal-desk",
      depth: "featured",
      order: 1,
      coverImage: "/images/work/signal-desk/cover.jpg",
      coverImageAlt: "Signal Desk dashboard cover.",
      year: "2023",
    });
    expect(result.gallery).toEqual([]);
  });

  it("rejects a meta object missing coverImageAlt", () => {
    expect(() =>
      projectMetaSchema.parse({
        slug: "signal-desk",
        depth: "featured",
        order: 1,
        coverImage: "/x.jpg",
      }),
    ).toThrow();
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

  it("accepts gallery entries with src and alt", () => {
    const result = projectMetaSchema.parse({
      slug: "signal-desk",
      depth: "featured",
      order: 1,
      coverImage: "/x.jpg",
      coverImageAlt: "Descriptive cover alt text.",
      year: "2023",
      gallery: [{ src: "/gallery-1.jpg", alt: "Descriptive alt text." }],
    });
    expect(result.gallery).toEqual([
      { src: "/gallery-1.jpg", alt: "Descriptive alt text." },
    ]);
  });

  it("rejects a gallery entry missing alt", () => {
    expect(() =>
      projectMetaSchema.parse({
        slug: "signal-desk",
        depth: "featured",
        order: 1,
        coverImage: "/x.jpg",
        coverImageAlt: "Descriptive cover alt text.",
        year: "2023",
        gallery: [{ src: "/gallery-1.jpg" }],
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

  it("accepts frontmatter with role/responsibilities/context (featured projects)", () => {
    const result = projectFrontmatterSchema.parse({
      title: "Signal Desk",
      summary: "A dashboard redesign.",
      role: "Product designer",
      responsibilities: "UX/UI Design • Front-End Engineering",
      context: "An internal ops tool.",
    });
    expect(result.role).toBe("Product designer");
    expect(result.responsibilities).toBe(
      "UX/UI Design • Front-End Engineering",
    );
  });

  it("rejects frontmatter missing a title", () => {
    expect(() =>
      projectFrontmatterSchema.parse({ summary: "Missing a title." }),
    ).toThrow();
  });
});
