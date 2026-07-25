import { z } from "zod";

export const projectMetaSchema = z.object({
  slug: z.string(), // must match folder name — validated in lib.ts
  depth: z.enum(["featured", "other"]),
  order: z.number(), // display order within its depth group
  coverImage: z.string(), // path under /public/images/work/<slug>/
  gallery: z.array(z.string()).default([]),
});

export type ProjectMeta = z.infer<typeof projectMetaSchema>;

// Localized frontmatter, parsed out of each en.mdx / es.mdx
export const projectFrontmatterSchema = z.object({
  title: z.string(),
  summary: z.string(), // one-line card summary
  role: z.string().optional(), // omitted for "other" depth
  context: z.string().optional(), // omitted for "other" depth
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
