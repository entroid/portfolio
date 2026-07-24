# Implementation Plan

Incremental modules, each sized to be handed to one agent session (or worked
on in one sitting) and landed as its own PR. Work roughly in order —
dependencies are noted per phase. Check a phase's box when its Definition of
Done is met and merged.

How to use this with agents: point a fresh session at this file, tell it
which phase to do, and have it read [ARCHITECTURE.md](./ARCHITECTURE.md),
[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md), [CONTENT_MODEL.md](./CONTENT_MODEL.md)
and [CODING_STANDARDS.md](./CODING_STANDARDS.md) as needed for that phase's
scope. Each phase below lists exactly which of those docs matter most.

- [x] Phase 0 — Project scaffolding & tooling
- [ ] Phase 1 — Design tokens & UI primitives
- [ ] Phase 2 — Layout shell, i18n routing & navigation
- [ ] Phase 3 — Hero section
- [ ] Phase 4 — About section
- [ ] Phase 5 — Content layer (schema, MDX pipeline, seed content)
- [ ] Phase 6 — Work listing + case study pages
- [ ] Phase 7 — Contact section
- [ ] Phase 8 — Motion & interaction polish pass
- [ ] Phase 9 — i18n content completion (full ES/EN parity)
- [ ] Phase 10 — SEO, metadata & analytics
- [ ] Phase 11 — Testing & QA hardening
- [ ] Phase 12 — Deployment & docs finalization

Parallelizable: Phase 1 (UI primitives) and Phase 5 (content schema/pipeline)
touch disjoint code and can run concurrently once Phase 0 is merged. Phase 9
and Phase 10 can also overlap. Everything else has a real dependency on the
phase(s) before it.

---

### Phase 0 — Project scaffolding & tooling ✅ done (2026-07-23)

**Depends on:** nothing. **Docs:** ARCHITECTURE.md, CODING_STANDARDS.md.

Notes from actually doing this phase: `create-next-app@latest` resolved to
**Next.js 16** (not 15 as ARCHITECTURE.md originally assumed — updated) with
React Compiler enabled by default; kept both. `globals.css` tokens were
filled with the real confirmed values from DESIGN_SYSTEM.md rather than left
empty, since they were already known — Phase 1 still owns building the
actual UI primitives that consume them. `eslint-plugin-jsx-a11y` had to be
merged as rules-only (`{ rules: jsxA11y.flatConfigs.strict.rules }`), since
`eslint-config-next` already registers the plugin itself and redeclaring it
throws a config error. `pnpm lint` runs with `--max-warnings=0` — the
default eslint-config-next treats things like unused vars as warnings, which
would otherwise pass CI silently.

Scope:

- `create-next-app` (TypeScript, App Router, ESLint, Tailwind) as the base,
  then adjust to match the stack table in ARCHITECTURE.md.
- pnpm as package manager (`pnpm-lock.yaml`, engines field in `package.json`
  pinning Node version).
- Tailwind v4 configured, `globals.css` with an empty `@theme` block ready
  for Phase 1 to fill in.
- ESLint (`next/core-web-vitals` + `eslint-plugin-jsx-a11y`), Prettier,
  `.editorconfig`.
- Husky + lint-staged (pre-commit: lint --fix + format staged files) +
  commitlint (`commit-msg` hook, Conventional Commits config).
- Vitest + React Testing Library + jest-axe wired up with one placeholder
  passing test, so the pattern exists before real components do.
- `.github/workflows/ci.yml`: install (pnpm, cached) → lint → typecheck
  (`tsc --noEmit`) → test → build. Runs on PR and push to main.
- `.env.example` (even if empty/minimal — e.g. `NEXT_PUBLIC_FORMSUBMIT_EMAIL`
  placeholder).
- `.gitignore`, `LICENSE` (confirm choice with Hernán — MIT is the
  conventional default for a portfolio repo), root `README.md` skeleton
  (filled out properly in Phase 12).
- Empty folder skeleton matching the structure in ARCHITECTURE.md
  (`src/components/{ui,layout,hero,sections,work,contact}`, `src/content`,
  `src/i18n`, `src/lib`).

Definition of Done:

- `pnpm install && pnpm lint && pnpm typecheck && pnpm test && pnpm build`
  all pass from a clean clone.
- A trivial commit with a bad message is rejected by commitlint; a commit
  with lint errors is blocked by the pre-commit hook (verify both by hand,
  don't just assume config is correct).
- CI is green on the initial PR.

---

### Phase 1 — Design tokens & UI primitives

**Depends on:** Phase 0. **Docs:** DESIGN_SYSTEM.md.

Scope:

- All color/typography/spacing tokens from DESIGN_SYSTEM.md as CSS variables
  - Tailwind `@theme` mappings.
- `next/font/google` setup for JetBrains Mono + Inter, exposed as CSS vars.
- Primitives in `components/ui/`: `Button` (incl. bracket hover/focus
  microinteraction), `MonoLabel`, `Eyebrow`, `Container`, `Section`,
  `GridOverlay`, `Crosshair`, `Barcode`, `WireframeIcon`, `Grain`.
- A shared `useReducedMotion` hook/utility (used by every animated primitive
  from this phase onward).
- Component tests for each primitive (renders, hover/focus state reachable
  via keyboard, `aria-hidden` present on decorative ones) + jest-axe check.
- A throwaway `/dev/kitchen-sink` route (excluded from prod nav, can be
  deleted later or kept behind an env flag) rendering every primitive in
  its states — makes visual QA possible without Storybook.

Definition of Done:

- Every primitive keyboard-focusable where interactive, with visible focus
  state using the accent token.
- No primitive hardcodes a color/font value outside the token set.
- Tests pass; kitchen-sink route visually matches DESIGN_SYSTEM.md intent
  (manual check in-browser).

---

### Phase 2 — Layout shell, i18n routing & navigation

**Depends on:** Phase 1. **Docs:** ARCHITECTURE.md, DESIGN_SYSTEM.md.

Scope:

- `next-intl` setup: `[locale]` segment, middleware, `routing.ts`,
  `request.ts`, minimal `messages/{en,es}.json` (nav + shared strings only —
  full copy comes in Phase 9).
- Root `app/[locale]/layout.tsx`: fonts, `<html lang>` set from locale,
  Grain applied per DESIGN_SYSTEM rules, metadata scaffold.
- `Navbar`: small profile photo, LinkedIn/GitHub/CV(download) links,
  `LanguageSwitcher` (preserves current route across locales).
- `Footer`: minimal, grain applied here too per brief.
- Mobile nav treatment (brief requires mobile-first — confirm a functional
  mobile menu, doesn't need to be elaborate).

Definition of Done:

- Visiting `/` redirects to a default locale; `/en` and `/es` both render
  the shell; language switcher round-trips correctly.
- CV link actually downloads a file from `/public/cv/` (placeholder file
  acceptable until Hernán supplies the real CV).
- Keyboard-only navigation reaches every nav link and the language switcher
  in a sensible order; automated a11y check on the layout passes.

---

### Phase 3 — Hero section

**Depends on:** Phase 2. **Docs:** DESIGN_SYSTEM.md (Hero section).

Scope:

- `WireframeSphere` (react-three-fiber, `next/dynamic` + `ssr:false`): idle
  rotation, mouse parallax, respects `useReducedMotion` (static render when
  reduced), static SVG/CSS fallback for no-WebGL.
- `HeroSection`: eyebrow ("UX/UI DESIGN · UI DEVELOPMENT"), headline
  ("DESIGN & BUILD"), subtext ("Where design and code actually meet."), CTA
  ("Case Studies & Work") scrolling to the Work section, surrounding
  `MonoLabel` data-point decorations.
- Headline/subtext/CTA must render and be readable before the 3D canvas
  finishes loading (no layout blocking on the WebGL bundle).

Definition of Done:

- Hero content (text) is visible/correct even with JS/WebGL disabled
  (progressive enhancement check).
- `prefers-reduced-motion: reduce` verified by hand (OS/browser setting) to
  actually stop rotation/parallax.
- Lighthouse performance check on this page isn't tanked by the 3D bundle
  (spot-check bundle size in the build output).

---

### Phase 4 — About section

**Depends on:** Phase 2 (can run parallel to Phase 3). **Docs:** PROJECT_BRIEF.md §6.

Scope:

- `AboutSection`: "Hey, I'm Hernán." + the bio paragraph (EN copy first,
  ES added properly in Phase 9 — a rough MT placeholder is fine for now,
  flagged with a `// TODO(i18n)` comment or issue reference), optional
  skills mini-list.

Definition of Done:

- Section renders in the page flow with correct semantic heading level
  (continues the document outline started by the hero, no skipped levels).

---

### Phase 5 — Content layer (schema, MDX pipeline, seed content)

**Depends on:** Phase 0 (can run parallel to Phase 1). **Docs:** CONTENT_MODEL.md.

Scope:

- Zod schemas (`src/content/schema.ts`) exactly as specified in CONTENT_MODEL.md.
- `next-mdx-remote/rsc` wiring, custom MDX components (`CaseStudyImage`,
  heading components used by the featured template).
- `src/content/lib.ts`: `getAllProjects(locale)`, `getProjectBySlug(slug, locale)`,
  throwing loudly on schema/frontmatter validation failure.
- A build-time check enforcing: `role`/`context` required when
  `depth: "featured"`; `en.mdx`/`es.mdx` both exist per project; every
  `CaseStudyImage` has a non-trivial `alt`.
- **2 seed projects** authored as realistic placeholders (1 featured, 1
  other) — enough to exercise both templates in Phase 6. Mark clearly as
  placeholder content to be swapped for Hernán's real case studies later.

Definition of Done:

- Build fails (on purpose, verify by temporarily breaking a fixture) when a
  project is missing a required field, missing a locale file, or has an
  empty `alt`.
- `getAllProjects`/`getProjectBySlug` covered by unit tests against the seed
  content.

---

### Phase 6 — Work listing + case study pages

**Depends on:** Phase 1, Phase 5. **Docs:** CONTENT_MODEL.md, DESIGN_SYSTEM.md.

Scope:

- `WorkSection` (home): featured case study cards (collage cover, title,
  one-line summary, link) + a lighter list/grid for "other work".
- `app/[locale]/work/[slug]/page.tsx` with `generateStaticParams` over all
  slugs; renders `CaseStudyTemplate` (featured) or `OtherWorkTemplate`
  (other) based on `depth`.
- Card and page hover/focus states follow the shared bracket/underline
  microinteraction language (DESIGN_SYSTEM.md), not a bespoke animation.
- Per DESIGN_SYSTEM.md's hierarchy rule: grids/crosshairs/mono-label
  decoration present on the listing section, but the case study page body
  itself stays quiet — no decorative overlays competing with the content.

Definition of Done:

- Both seed projects render correctly end-to-end (card on home → dedicated
  page), in both locales.
- Case study pages statically generated (verify in `next build` output, not
  server-rendered per request).
- Images have real alt text, use `next/image`, no obvious layout shift.

---

### Phase 7 — Contact section

**Depends on:** Phase 1. **Docs:** ARCHITECTURE.md (Forms row), PROJECT_BRIEF.md §6.

Scope:

- `ContactForm`: name/email/message, react-hook-form + Zod validation
  (required fields, valid email format), honeypot field for spam, submits
  to FormSubmit's AJAX endpoint via `fetch`.
- Success/error UI states (inline, accessible — errors associated to
  fields via `aria-describedby`, announced to screen readers).
- Direct contact links (WhatsApp, email, LinkedIn) alongside the form as a
  no-form alternative, per brief.
- Document the one-time FormSubmit activation step (confirmation email
  click) in this phase's PR description — it's an operational step, not
  code, but easy to forget and silently fail in production.

Definition of Done:

- Client-side validation blocks empty/invalid submissions with accessible
  error messaging.
- A real test submission (to Hernán's actual address, with his go-ahead)
  confirms FormSubmit delivers end-to-end.
- Keyboard-only flow: tab through fields, submit, receive visible
  success/error feedback.

---

### Phase 8 — Motion & interaction polish pass

**Depends on:** Phases 3, 4, 6, 7 (everything with visible sections). **Docs:** DESIGN_SYSTEM.md (Microinteractions).

Scope:

- Section scroll-entrance transitions (fade + slide-up, Motion
  `whileInView`) applied consistently across About/Work/Contact.
- Cross-check every interactive element (buttons, nav, cards, form fields)
  against the microinteraction table in DESIGN_SYSTEM.md for consistency —
  this phase is explicitly a consistency audit, not new features.
- Global `prefers-reduced-motion` audit: every motion effect added since
  Phase 1 actually degrades gracefully.

Definition of Done:

- No animation fires on every scroll tick; no element has more than one
  simultaneous effect (per brief's explicit "avoid" list).
- Manual pass with reduced-motion OS setting enabled confirms all motion is
  suppressed/replaced with instant state changes.

---

### Phase 9 — i18n content completion

**Depends on:** everything with user-facing copy (Phases 2–7). **Docs:** CONTENT_MODEL.md (i18n section).

Scope:

- Full, real (not machine-translated placeholder) ES/EN copy for every
  string introduced so far — nav, hero, about, work listing, contact,
  form validation/error messages, both seed case studies.
- Key-set parity check (script or test) between `en.json`/`es.json` wired
  into CI so a future PR can't add an English string without its Spanish
  counterpart (or vice versa).
- Locale-aware `<html lang>`, date/number formatting if any appears.

Definition of Done:

- Manual pass through the entire site in both `/en` and `/es` — no leftover
  placeholder/MT text, no missing keys (blank strings).
- Parity check passes in CI.

---

### Phase 10 — SEO, metadata & analytics

**Depends on:** Phase 6 (routes must exist). **Docs:** ARCHITECTURE.md.

Scope:

- `generateMetadata` per route: title/description per locale, OpenGraph +
  Twitter card tags, `metadataBase` set to the production domain.
- `app/sitemap.ts`, `app/robots.ts`.
- OG image(s) — at minimum a static default; per-case-study OG images are a
  stretch goal, not required for v1.
- `@vercel/analytics` `<Analytics />` wired into the root layout.

Definition of Done:

- Social share preview (test via a link-preview debugger) renders sensible
  title/description/image for the home page and one case study page.
- `sitemap.xml`/`robots.txt` reachable and correct in a production build.

---

### Phase 11 — Testing & QA hardening

**Depends on:** all feature phases. **Docs:** CODING_STANDARDS.md (Testing).

Scope:

- Fill test coverage gaps left by earlier phases: contact form validation
  logic, language switcher route preservation, content-layer edge cases.
- jest-axe run across every top-level page (not just components in
  isolation) to catch composition-level a11y issues.
- Manual responsive QA pass at mobile/tablet/desktop breakpoints, and a
  manual keyboard-only pass across the entire site, recorded as a short
  checklist in the PR description (see CODING_STANDARDS.md for the
  checklist template).
- Cross-browser spot check (at minimum Chrome + Safari, since WebGL/Safari
  quirks are the most likely failure point given the hero sphere).

Definition of Done:

- CI test coverage includes the contact form and content layer, not just UI
  primitives.
- Recorded manual QA checklist attached to the PR, all items checked.

---

### Phase 12 — Deployment & docs finalization

**Depends on:** everything. **Docs:** all.

Scope:

- Vercel project connected, environment variables set, production domain
  configured.
- Real CV file in place, real profile photo, final confirmed case study
  content (swap seed placeholders if real content wasn't already dropped in
  during Phase 5/6).
- Root `README.md` finished properly: project description, live link,
  stack summary/badges, local dev instructions (`pnpm install`, `pnpm dev`,
  `pnpm test`), screenshot(s), license.
- Final Lighthouse pass (performance/a11y/best-practices/SEO) on the
  production deployment, not just local dev.

Definition of Done:

- Production URL live and matches local dev build.
- README reads well to an outside visitor (recruiter browsing GitHub) with
  no placeholder text remaining anywhere in the shipped site.
