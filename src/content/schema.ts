import { z } from "zod";

export const galleryImageSchema = z.object({
  src: z.string(), // path under /public/images/work/<slug>/
  alt: z.string(), // real, descriptive alt text — see CODING_STANDARDS.md
});

export type GalleryImage = z.infer<typeof galleryImageSchema>;

export const resultSchema = z.object({
  value: z.string(), // the number/stat itself, e.g. "-30%"
  label: z.string(), // what it measures, e.g. "campaign creation time"
});

export type Result = z.infer<typeof resultSchema>;

export const projectMetaSchema = z.object({
  slug: z.string(), // must match folder name — validated in lib.ts
  depth: z.enum(["featured", "other"]),
  order: z.number(), // display order within its depth group
  coverImage: z.string(), // path under /public/images/work/<slug>/
  coverImageAlt: z.string(), // real, descriptive alt text for coverImage
  gallery: z.array(galleryImageSchema).default([]),
});

export type ProjectMeta = z.infer<typeof projectMetaSchema>;

// Localized frontmatter, parsed out of each en.mdx / es.mdx
export const projectFrontmatterSchema = z.object({
  title: z.string(),
  summary: z.string(), // one-line card summary
  role: z.string().optional(), // required by convention for "featured" — see lib.ts
  responsibilities: z.string().optional(), // shown only when present, any depth
  context: z.string().optional(), // required by convention for "featured" — see lib.ts
  results: z.array(resultSchema).optional(), // real measured numbers only — see CONTENT_MODEL.md
  resultsNote: z.string().optional(), // optional footnote below results, e.g. how the numbers were measured
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
