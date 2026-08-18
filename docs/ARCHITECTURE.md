# Architecture

Technical stack and the reasoning behind each choice. Read this before
starting any implementation module. Source requirements: [PROJECT_BRIEF.md](./PROJECT_BRIEF.md).

## Guiding constraints

- **No backend.** Contact form posts to FormSubmit; content is static files
  read at build time. Nothing here should introduce a database, API routes
  with server-side state, or auth.
- **Static-first.** Every route should be statically generated (`generateStaticParams`
  for `/work/[slug]`) — there's no per-request dynamic data.
- **Showcase quality.** This repo is itself a portfolio piece for a
  Design Engineer role. Prioritize readable, conventional code over clever
  code. Depth of polish > breadth of features.
- **Bilingual by construction.** Every route and every piece of copy exists
  in `es` and `en` from the first commit that introduces it — not bolted on
  later. `/ai-workflow` previously carved out an English-only exception
  (decided 2026-07-24); that exception is superseded — its content (both
  the "Prototyping" and "Figma to Code" tabs) is now fully translated via
  the `aiWorkflow.*` i18n message namespace, like every other route.

## Routes

Multi-route structure (revised 2026-07-24 — see
[PROJECT_BRIEF.md](./PROJECT_BRIEF.md#structural-revision--2026-07-24) for
why this supersedes the earlier single-page-with-anchors approach). All
routes below live under the `[locale]` segment (`en`/`es`) except where noted.

| Route          | Content                                                              | Notes                                                                                                                |
| -------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `/`            | Hero + About only                                                    | No anchors — Hero's CTA and the nav's "Work" link both navigate to `/work` as a real route transition, not a scroll. |
| `/work`        | Work index: Featured Case Studies + Other Work grid                  | Was a home-page section; now its own route.                                                                          |
| `/work/[slug]` | Case study detail (featured or other-depth template)                 | Unchanged from the original content model.                                                                           |
| `/ai-workflow` | AI-Assisted Workflow page (new — see IMPLEMENTATION_PLAN.md Phase 7) | Two tabs (Prototyping, Figma to Code), fully bilingual.                                                              |
| `/contact`     | Contact form + direct links (email, LinkedIn, WhatsApp)              | Was a home-page section; now its own route. The same direct links also appear in the persistent footer — see below.  |

Persistent nav (every route): **Start, Work, AI Workflow, Contact** — in
that order — plus the profile photo, LinkedIn/GitHub/CV links, and the
language switcher from the original brief's Navbar spec.

Persistent footer (every route): email, LinkedIn, and WhatsApp links are
always visible, independent of `/contact` — reaching Hernán shouldn't
require finding a specific page first. Both the footer and the `/contact`
page read from the same `src/lib/site-links.ts` constants (see folder
structure below) so the two never drift out of sync.

## Stack

| Concern            | Choice                                                    | Why                                                                                                                                                                                                                                                                                                        |
| ------------------ | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework          | Next.js 16 (App Router, Turbopack), React 19              | Static export-friendly, RSC by default, current standard for a Next.js-focused showcase. (Scaffolded 2026-07-23 via `create-next-app@latest`, which resolved to Next 16 — this doc originally assumed 15; 16 is what actually shipped.)                                                                    |
| React Compiler     | Enabled (`reactCompiler: true` in `next.config.ts`)       | Scaffolded on by default with Next 16 + React 19; auto-memoizes components, removing most manual `useMemo`/`useCallback` — keep it on rather than opting out.                                                                                                                                              |
| Language           | TypeScript, `strict: true`                                | Non-negotiable for a "good practices" showcase.                                                                                                                                                                                                                                                            |
| Package manager    | pnpm                                                      | Fast, disk-efficient, strict node_modules (catches phantom-dependency bugs that npm/yarn hide).                                                                                                                                                                                                            |
| Styling            | Tailwind CSS v4 + CSS variables                           | Design tokens (color/type/spacing from the brief) map directly to `@theme` tokens; utility-first keeps one-off retrofuturist decoration (grids, crosshairs) fast to build without a growing custom-CSS file.                                                                                               |
| 3D / hero sphere   | react-three-fiber + drei + three                          | Real WebGL wireframe sphere with authentic rotation/lighting/parallax — matches the brief's "signal detected" concept better than a CSS/SVG approximation. Loaded via `next/dynamic` (`ssr: false`), code-split off the main bundle, with a static SVG/CSS fallback for reduced-motion and no-WebGL cases. |
| Motion (non-3D)    | Motion (motion/react, formerly Framer Motion)             | Scroll-triggered fade+slide-up section transitions, card/link hover states that CSS can't express cleanly (staggered reveals). Respects `prefers-reduced-motion` globally via a single hook.                                                                                                               |
| i18n               | next-intl                                                 | Explicitly named in the brief as the lightweight option; App Router-native `[locale]` segment routing + typed message catalogs.                                                                                                                                                                            |
| Content            | Local files, JSON metadata + MDX body, read at build time | See [CONTENT_MODEL.md](./CONTENT_MODEL.md). No CMS, matches "content as code" requirement.                                                                                                                                                                                                                 |
| Content validation | Zod                                                       | Validates project metadata shape at build time; a malformed case study fails the build instead of shipping broken markup.                                                                                                                                                                                  |
| Forms              | react-hook-form + Zod resolver, submit to FormSubmit      | Front-end validation as required; FormSubmit needs no backend.                                                                                                                                                                                                                                             |
| Fonts              | `next/font/google`: JetBrains Mono + Inter                | Both available on Google Fonts, self-hosted automatically by `next/font` (no external request, no layout shift).                                                                                                                                                                                           |
| Icons              | lucide-react                                              | Small footprint, tree-shakeable, covers the handful of utility icons needed (external link, download, menu).                                                                                                                                                                                               |
| Analytics          | `@vercel/analytics`                                       | Explicitly the "basic analytics" option named as in-scope.                                                                                                                                                                                                                                                 |
| Hosting            | Vercel                                                    | Implied by Vercel Analytics; zero-config for Next.js, free preview deployments per PR.                                                                                                                                                                                                                     |
| Testing            | Vitest + React Testing Library + jest-axe                 | Standard tier (confirmed 2026-07-23): component/unit tests + automated a11y assertions. No Playwright/e2e in v1 — see [CODING_STANDARDS.md](./CODING_STANDARDS.md#testing) for the upgrade path.                                                                                                           |
| Linting/formatting | ESLint (`next/core-web-vitals` + `jsx-a11y`), Prettier    | Catches a11y issues at write-time, not just in CI.                                                                                                                                                                                                                                                         |
| Git hooks          | Husky + lint-staged + commitlint (Conventional Commits)   | Enforces format/lint on commit and a readable git history — cheap, visible "good practices" signal on GitHub.                                                                                                                                                                                              |
| CI                 | GitHub Actions                                            | `lint` → `typecheck` → `test` → `build` on every PR.                                                                                                                                                                                                                                                       |

## Why these were left out (see PROJECT_BRIEF §10 for the brief's own out-of-scope list)

- **Storybook**: nice-to-have for a component-heavy design system, but adds
  a second build pipeline to maintain for a single-consumer site. Revisit
  only if the UI primitive library (Phase 1) grows large enough to justify it.
- **Contentlayer**: effectively unmaintained; `next-mdx-remote/rsc` covers
  the same need (compile MDX at build/request time, RSC-compatible) without
  the dependency risk.
- **Playwright/e2e in v1**: adds real setup and maintenance cost; the brief's
  interactive surface (nav, language switch, contact form) is small enough
  that component tests + manual QA cover it for a personal site. Documented
  as the first thing to add if this repo keeps evolving past v1.

## High-level folder structure

```
src/
  app/
    [locale]/
      layout.tsx          # root layout: fonts, providers, grain/grid overlays, Navbar + Footer
      page.tsx            # home: Hero + About only
      work/
        page.tsx           # /work index: Featured + Other grid
        [slug]/page.tsx     # case study detail
      ai-workflow/
        page.tsx           # AI Workflow content lives directly here — single
                           # static page, no reusable sub-components needed
                           # (see CONTENT_MODEL.md)
      contact/page.tsx
    sitemap.ts
    robots.ts
  components/
    ui/                    # primitives: Button, MonoLabel, Eyebrow, Container,
                           # Section, GridOverlay, Crosshair, Barcode, WireframeIcon
    layout/                # Navbar (primary nav + profile/social/CV links),
                           # Footer (persistent contact links), LanguageSwitcher
    hero/                  # WireframeSphere (r3f), HeroSection
    sections/              # AboutSection (home page only)
    work/                  # CaseStudyCard, CaseStudyTemplate, OtherWorkTemplate,
                           # Gallery, WorkIndex (the /work route's grid — moved
                           # here from sections/ since it's no longer a home
                           # page section but the whole route's content)
    contact/               # ContactForm, ContactPage (the /contact route's
                           # composition: form + direct links — moved here from
                           # sections/ for the same reason as WorkIndex)
  content/
    work/<slug>/
      index.ts             # shared metadata (zod-validated): slug, featured, order, cover, gallery
      en.mdx               # localized frontmatter (title, summary, role) + body
      es.mdx
    schema.ts               # zod schemas
    lib.ts                  # getAllProjects(), getProjectBySlug(), etc.
  i18n/
    messages/en.json
    messages/es.json
    routing.ts, request.ts  # next-intl config
  lib/
    site-links.ts           # shared contact/social links (email, LinkedIn,
                            # WhatsApp, GitHub, CV path) — single source read
                            # by Navbar, Footer, and the /contact page
    cn() helper, constants, reduced-motion hook
  styles/globals.css         # Tailwind entry + @theme tokens + CSS variables
public/
  cv/, images/
docs/
.github/workflows/ci.yml
```

Rationale for `content/` living under `src/` rather than repo root: it's
imported by application code via typed helpers (`lib.ts`), not consumed by
any external tool, so it belongs with the rest of the source.

Rationale for `WorkIndex`/`ContactPage` moving out of `components/sections/`:
when Work and Contact were home-page sections, grouping them together made
sense. Now that each is a standalone route, they belong next to the other
components that serve that same route (`CaseStudyCard` alongside `WorkIndex`,
`ContactForm` alongside `ContactPage`) — `components/sections/` shrinks back
to just `AboutSection`, the one piece of content that's still genuinely a
section of another page (`/`) rather than a page of its own.

## Open items to confirm before/while building

- Final list and slugs of featured vs. "other" projects (real content).
- FormSubmit target email + one-time activation (FormSubmit requires a
  confirmation click on the first real submission to that address).
- Domain name for production deployment (affects `metadataBase`, sitemap,
  OG images).
