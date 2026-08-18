# Content Model

How case studies and site copy are authored, structured, validated, and
rendered. No CMS, no database — everything is a file in the repo, read at
build time (see [ARCHITECTURE.md](./ARCHITECTURE.md)).

## Three kinds of content

1. **Site copy** (nav labels, hero text, About paragraph, form labels, error
   messages) → `src/i18n/messages/{en,es}.json`, managed by `next-intl`.
2. **Work / case studies** → one folder per project under `src/content/work/`,
   split into shared metadata + per-locale body.
3. **One-off static pages** (currently just `/ai-workflow`) → copy lives in
   the `aiWorkflow.*` i18n message namespace (`src/i18n/messages/{en,es}.json`),
   consumed by `AiWorkflowContent.tsx`; no `content/` data file, no
   zod-schema/MDX pipeline. See "Static pages (AI Workflow)" below for why
   this doesn't get the same treatment as #2.

## Project types

Per the brief, there are two depths of project page, both living at
`/work/[slug]`:

- **Featured Case Study** (2–3 projects): full template — process,
  decisions, technical notes, results, inline images interleaved with text,
  optional trailing gallery.
- **Other work**: light template — enlarged image + extended description
  only, no process/results sections.

Both share the same routing and metadata schema, and the same header —
title, summary, cover image, and the optional role/responsibilities/context
block (`CaseStudyHeader`, rendered by both `CaseStudyTemplate` and
`OtherWorkTemplate`). The template used past the header is picked by the
`depth` field (see schema below), not by a separate route.

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

export const galleryImageSchema = z.object({
  src: z.string(), // path under /public/images/work/<slug>/
  alt: z.string(), // real, descriptive alt text — same rule as CaseStudyImage
});

export const resultSchema = z.object({
  value: z.string(), // the number/stat itself, e.g. "-30%"
  label: z.string(), // what it measures, e.g. "campaign creation time"
});

export const projectMetaSchema = z.object({
  slug: z.string(), // must match folder name — validated in a build script
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
  role: z.string().optional(), // required by convention for "featured"
  responsibilities: z.string().optional(), // shown only when present, any depth
  context: z.string().optional(), // required by convention for "featured"
  results: z.array(resultSchema).optional(), // real measured numbers only, no invented metrics
  resultsNote: z.string().optional(), // optional footnote below results, e.g. how the numbers were measured
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
```

`role`/`context` are optional at the schema level but **required by
convention** for `depth: "featured"` — enforce that as a build-time check
(fail the build if a featured project is missing them), not just a type
optional, so a missing field can't silently ship a thin featured case study.
`resultsNote` is fully optional and only rendered when a project supplies
it — e.g. a disclaimer on how the `results` numbers were measured.
`responsibilities` is always fully optional, on both depths — the header
renders only the role/responsibilities/context fields a project actually
supplies, so an "other" project can add a `role` without needing the rest,
and a featured one can skip `responsibilities` without a placeholder.

## MDX body conventions

- `en.mdx` / `es.mdx` start with YAML frontmatter (`title`, `summary`, and
  optionally `role`/`responsibilities`/`context` — required by convention
  for featured projects), then the body.
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

## Static pages (AI Workflow)

Not every page needs the content-as-data machinery above. `/ai-workflow`
(added 2026-07-24, see [PROJECT_BRIEF.md](./PROJECT_BRIEF.md#structural-revision--2026-07-24))
is a single, one-off static page — a title, an intro paragraph, a closing
line, and two tabs ("Prototyping" and "Figma to Code"), each with its own
seven numbered steps and a highlighted callout/closing subsection. It is
**not** a collection like case studies (no enumeration, no per-item schema,
no locale variants to keep in sync yet), so it deliberately skips the
zod-schema + MDX pipeline built for `/work`:

- Its copy lives in the `aiWorkflow.*` namespace of
  `src/i18n/messages/{en,es}.json` (title, intro, closing, `tabs.*` labels,
  and a `steps` array + `team`/`closing` block per tab), consumed via
  `useTranslations`/`t.raw("steps")` in `AiWorkflowContent.tsx` — not a
  `content/` data file. Introducing a generic "steps" data shape outside
  i18n for a page that will only ever have exactly one instance is
  premature abstraction.
- Each tab's seven steps render as a real semantic `<ol>` (ordered list —
  order is meaningful here), not a sequence of styled `<div>`s, per the
  accessibility rules in CODING_STANDARDS.md. Both tabs share one
  `StepsList` sub-component so numbering/typography can't drift between
  them.
- The "How does this fit into a team?" callout (Prototyping tab) and the
  closing-line callout (Figma to Code tab) both use the same bordered
  highlight treatment. Built inline for this page; only promote it to
  `components/ui/Callout.tsx` if a second use case actually shows up
  elsewhere — don't build the reusable version speculatively.
- **This page ships bilingual (EN/ES), like every other route.** An
  earlier draft shipped `/ai-workflow` English-only with the Spanish
  translation deferred (Hernán's call, 2026-07-24); that carve-out is
  superseded now that both tabs are fully translated.

## Shared site links

Contact/social links — email, LinkedIn, WhatsApp, GitHub, CV file path —
live in one place: `src/lib/site-links.ts`, plain exported constants (no
zod needed, this isn't user-authored content, it's site configuration).

Three consumers read from it: the persistent `Footer` (email, LinkedIn,
WhatsApp, always visible on every route), the `Navbar` (LinkedIn, GitHub,
CV), and the `/contact` page (email, LinkedIn, WhatsApp again, alongside the
form). Centralizing it means the footer and the contact page can never drift
out of sync with each other — update the phone number or LinkedIn handle
once, everywhere picks it up.

## i18n site copy

- `src/i18n/messages/en.json` and `es.json`, one flat-ish key namespace per
  route (`nav.*`, `footer.*`, `home.hero.*`, `home.about.*`, `work.*`,
  `contact.*`, `aiWorkflow.*`) — see "Static pages" above for the
  `aiWorkflow.*` shape.
- Both files must have the same keys at all times — enforce with a small
  script/test that diffs key sets and fails if they diverge (cheap, prevents
  the classic "added an English string, forgot Spanish" bug). This applies
  to `aiWorkflow.*` too, same as every other namespace.
- Locale switch preserves the current route (`/work/[slug]` in `es` ↔ same
  slug in `en`), via `next-intl`'s routing — a case study's `slug` is
  identical across locales (only its rendered `title`/body differ). Same
  for `/ai-workflow`: the route persists across the switch and both tabs
  render fully translated content in either locale.
