# Content Model

How case studies and site copy are authored, structured, validated, and
rendered. No CMS, no database — everything is a file in the repo, read at
build time (see [ARCHITECTURE.md](./ARCHITECTURE.md)).

## Two kinds of content

1. **Site copy** (nav labels, hero text, About paragraph, section headings,
   form labels, error messages) → `src/i18n/messages/{en,es}.json`, managed
   by `next-intl`.
2. **Work / case studies** → one folder per project under `src/content/work/`,
   split into shared metadata + per-locale body.

## Project types

Per the brief, there are two depths of project page, both living at
`/work/[slug]`:

- **Featured Case Study** (2–3 projects): full template — context, role,
  process, decisions, technical notes, results, inline images interleaved
  with text, optional trailing gallery.
- **Other work**: light template — enlarged image + extended description
  only, no process/results sections.

Both share the same routing and metadata schema; the template used is picked
by the `depth` field (see schema below), not by a separate route.

## Folder structure

```
src/content/work/
  <slug>/
    index.ts       # shared, locale-independent metadata (validated with zod)
    en.mdx         # English frontmatter (localized fields) + MDX body
    es.mdx         # Spanish frontmatter (localized fields) + MDX body
```

Why metadata is split this way: fields like `featured`, `order`, `slug`,
image paths, and `depth` must be **identical across locales** — a project
can't be "featured" in English and "other" in Spanish. Keeping those in one
non-localized `index.ts` makes that class of bug structurally impossible,
instead of relying on two JSON files staying in sync by convention.

## Schema (zod)

`src/content/schema.ts`:

```ts
import { z } from "zod";

export const projectMetaSchema = z.object({
  slug: z.string(), // must match folder name — validated in a build script
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
```

`role`/`context` are optional at the schema level but **required by
convention** for `depth: "featured"` — enforce that as a build-time check
(fail the build if a featured project is missing them), not just a type
optional, so a missing field can't silently ship a thin featured case study.

## MDX body conventions

- `en.mdx` / `es.mdx` start with YAML frontmatter (`title`, `summary`, and
  for featured projects `role`/`context`), then the body.
- Body content for featured case studies follows the brief's structure as
  MDX headings + prose, with images imported and placed **inline**, next to
  the paragraph that discusses them — not batched at the end:

  ```mdx
  ## Process

  Short paragraph on the process...

  <CaseStudyImage src="/images/work/my-project/wireframe-v2.png" alt="..." />

  Next design decision paragraph...
  ```

- A trailing `## Gallery` section is optional, only for loose states/details
  that don't fit the narrative — not a dumping ground.
- Every `<CaseStudyImage>` requires a real, descriptive `alt` (non-empty,
  non-filename) — this is enforced by a lightweight lint/test check (see
  [CODING_STANDARDS.md](./CODING_STANDARDS.md)), since alt text quality
  can't be caught by TypeScript.
- "Other work" MDX bodies skip `## Process`/`## Results`-style headings
  entirely — just the extended description prose. Enforce structurally by
  giving `OtherWorkTemplate` a simpler MDX component set that doesn't
  register those heading-driven layout components, rather than trusting
  authors to omit them.

## Rendering

- `next-mdx-remote/rsc` compiles MDX server-side (RSC-compatible, works with
  static generation) — see rationale in ARCHITECTURE.md.
- `getAllProjects(locale)` / `getProjectBySlug(slug, locale)` in
  `src/content/lib.ts` read the filesystem, validate metadata with the zod
  schemas above, parse frontmatter, and return typed objects. Any validation
  failure throws at build time with the offending slug/locale — content
  errors must be loud, not silently skipped.
- `generateStaticParams` in `app/[locale]/work/[slug]/page.tsx` enumerates
  all slugs so every case study is statically generated at build time.

## Results/metrics honesty rule

Per the brief: **no invented numbers**. The `Results` section of a featured
case study must be written in qualitative terms unless a real measured
metric exists. This is a content-authoring rule, not a technical one, but
worth stating here since it directly shapes the MDX body template (no
"metric card" component that implies a number belongs there).

## Images

- Real product screenshots/mockups live under `public/images/work/<slug>/`.
- All rendered through `next/image` for optimization; `coverImage` and
  gallery entries use fixed/known dimensions where possible to avoid layout
  shift.
- Featured project cover = a collage (2–4 key screens, device frame
  optional) — treat this as a single pre-composed image asset (produced in
  Figma/design tooling) rather than trying to assemble a collage live in
  the browser from multiple images; simpler, matches "content is the
  protagonist" and avoids a fragile layout component for something that's
  really a design asset.

## i18n site copy

- `src/i18n/messages/en.json` and `es.json`, one flat-ish key namespace per
  section (`nav.*`, `hero.*`, `about.*`, `work.*`, `contact.*`).
- Both files must have the same keys at all times — enforce with a small
  script/test that diffs key sets and fails if they diverge (cheap, prevents
  the classic "added an English string, forgot Spanish" bug).
- Locale switch preserves the current route (`/work/[slug]` in `es` ↔ same
  slug in `en`), via `next-intl`'s routing — a case study's `slug` is
  identical across locales (only its rendered `title`/body differ).
