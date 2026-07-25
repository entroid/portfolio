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

> **2026-07-24 revision:** the site moved from a single home page with
> anchor-linked sections to separate routes (`/`, `/work`, `/ai-workflow`,
> `/contact`), and a new AI Workflow page was added. See
> [PROJECT_BRIEF.md](./PROJECT_BRIEF.md#structural-revision--2026-07-24) for
> why. This inserted a new Phase 7 and renumbered what were Phases 7–12 to
> 8–13; Phases 0–6 keep their original numbers, with scope updated where the
> routing change touched them (2, 3, 6 — flagged inline below).

- [x] Phase 0 — Project scaffolding & tooling
- [x] Phase 1 — Design tokens & UI primitives
- [x] Phase 2 — Layout shell, i18n routing & navigation
- [x] Phase 3 — Hero section
- [x] Phase 4 — About section
- [x] Phase 5 — Content layer (schema, MDX pipeline, seed content)
- [ ] Phase 6 — Work listing + case study pages
- [x] Phase 7 — AI Workflow page
- [x] Phase 8 — Contact page
- [ ] Phase 9 — Motion & interaction polish pass
- [ ] Phase 10 — i18n content completion (full ES/EN parity)
- [ ] Phase 11 — SEO, metadata & analytics
- [ ] Phase 12 — Testing & QA hardening
- [ ] Phase 13 — Deployment & docs finalization

Parallelizable: Phase 1 (UI primitives) and Phase 5 (content schema/pipeline)
touch disjoint code and can run concurrently once Phase 0 is merged. Phase 7
(AI Workflow) has no dependency on Phase 5/6 and can run in parallel with
either. Phase 10 and Phase 11 can also overlap. Everything else has a real
dependency on the phase(s) before it.

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
  (filled out properly in Phase 13).
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

### Phase 1 — Design tokens & UI primitives ✅ done (2026-07-24)

**Depends on:** Phase 0. **Docs:** DESIGN_SYSTEM.md.

Notes from actually doing this phase: the type scale uses explicit
`-desktop`-suffixed tokens (e.g. `text-h1` / `md:text-h1-desktop`) rather
than fluid `clamp()`, matching DESIGN_SYSTEM.md's "via Tailwind responsive
prefixes" note literally. Found and fixed a real bug along the way: the
default `tailwind-merge` config doesn't know about custom `--text-*`/
`--tracking-*` theme keys, so it misclassified `text-label` (custom
font-size) as conflicting with `text-accent` (color) and silently dropped
it — `cn()` now uses `extendTailwindMerge` with the custom keys registered,
with a regression test locking this in (`src/lib/cn.test.ts`). The React
Compiler's stricter ESLint rules also caught two real issues:
`useReducedMotion` rewritten around `useSyncExternalStore` instead of a
`useEffect` + `setState` (the recommended pattern for this exact "subscribe
to an external browser API" case), and `Barcode`'s bar positions precomputed
at module scope instead of mutating a variable during render. Visual
verification of the `transition`-based hover/focus microinteractions
(bracket wrap, fill swap) couldn't be completed in-browser this session —
the preview tab wasn't actively composited, so CSS transitions never
ticked forward (confirmed via `getComputedStyle` staying at the
transition's start value indefinitely, while non-transitioned style changes
and selector matching resolved correctly). Class output, selector
specificity, and DOM structure were all verified directly instead. Whoever
picks up Phase 2+ should do a real visual pass on these interactions in an
actual visible browser at the first opportunity.

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

### Phase 2 — Layout shell, i18n routing & navigation ✅ done (2026-07-24)

**Depends on:** Phase 1. **Docs:** ARCHITECTURE.md (Routes, Guiding
constraints), DESIGN_SYSTEM.md.

Notes from actually doing this phase: Next 16 deprecates the root
`middleware.ts` convention in favor of `proxy.ts` (same `next-intl`
`createMiddleware` export, just a rename) — used `src/proxy.ts` to avoid
shipping a deprecation warning on every build. `next-intl`'s default
`localePrefix` mode prefixes the default locale too (`/en`, not bare `/`),
so nav links and tests assert `/en`/`/es`-prefixed hrefs rather than
unprefixed root paths — still satisfies "not an anchor" (`href` starts with
`/`). Testing `next-intl`'s `useRouter`/navigation hooks under Vitest needed
two fixes, now in `vitest.config.ts`: `test.server.deps.inline: ["next-intl"]`
(its ESM dist re-exports bare `next/navigation` subpaths with no file
extension, which Node's native ESM loader can't resolve once Vite
externalizes the package) and mocking `next/navigation`'s `useRouter` per
test file (it throws outside a mounted App Router context, which unit tests
don't have). `lucide-react` no longer ships brand icons (`Linkedin`/`Github`
were removed) — LinkedIn/GitHub links use `ExternalLink` + text instead,
which also reads more consistently with the mono/text-first "instrument
panel" language than a logo would. `src/lib/site-links.ts` values (email,
LinkedIn, GitHub, WhatsApp) are placeholders — real ones are still an open
item per ARCHITECTURE.md. `public/cv/hernan-ainsa-cv.pdf` is a
programmatically-generated minimal valid placeholder PDF, not a real CV.

> Scope updated 2026-07-24 for the multi-route structure: this phase now
> also scaffolds the route skeleton for the whole site (previously only
> `/` existed, with everything else as an anchor within it), and the
> Navbar/Footer scope grew to match.

Scope:

- `next-intl` setup: `[locale]` segment, middleware, `routing.ts`,
  `request.ts`, minimal `messages/{en,es}.json` (nav + shared strings only —
  full copy comes in Phase 10).
- Root `app/[locale]/layout.tsx`: fonts, `<html lang>` set from locale,
  Grain applied per DESIGN_SYSTEM rules, metadata scaffold, persistent
  `Navbar` + `Footer`.
- Route skeleton: empty/placeholder `page.tsx` stubs for `/`, `/work`,
  `/work/[slug]`, `/ai-workflow`, `/contact` under `[locale]` — enough for
  every route to resolve and for the nav to link to real pages, even before
  Phases 3–8 fill in their real content.
- `src/lib/site-links.ts`: shared contact/social constants (email, LinkedIn,
  WhatsApp, GitHub, CV file path) — see CONTENT_MODEL.md's "Shared site
  links". Introduced here because both Navbar and Footer need it
  immediately; the `/contact` page (Phase 8) reuses the same file rather
  than redefining these values.
- `Navbar`: persistent primary nav — **Start, Work, AI Workflow, Contact**,
  in that order, as real route links (not anchors) — plus small profile
  photo, LinkedIn/GitHub/CV(download) links, `LanguageSwitcher` (preserves
  current route across locales).
- `Footer`: contact links (email, LinkedIn, WhatsApp) from `site-links.ts`,
  **always visible on every route**, independent of whether the current
  page is `/contact` — this is a hard requirement, not a nice-to-have (see
  ARCHITECTURE.md's Routes section). Grain applied here too per brief.
- Mobile nav treatment (brief requires mobile-first — confirm a functional
  mobile menu, doesn't need to be elaborate).

Definition of Done:

- Visiting `/` redirects to a default locale; `/en` and `/es` both render
  the shell; language switcher round-trips correctly on every route,
  including `/ai-workflow`.
- All five routes (`/`, `/work`, `/work/[slug]` for at least a placeholder
  slug, `/ai-workflow`, `/contact`) resolve without 404s in both locales.
- Nav order matches Start/Work/AI Workflow/Contact exactly; none of the
  four are anchors (`href` starts with `/`, not `#`).
- Footer contact links render identically on every route, including one
  that isn't `/contact` (spot-check `/` and `/work`).
- CV link actually downloads a file from `/public/cv/` (placeholder file
  acceptable until Hernán supplies the real CV).
- Keyboard-only navigation reaches every nav link, footer link, and the
  language switcher in a sensible order; automated a11y check on the layout
  passes.

---

### Phase 3 — Hero section ✅ done (2026-07-24)

**Depends on:** Phase 2. **Docs:** DESIGN_SYSTEM.md (Hero section).

Notes from actually doing this phase: importing `@react-three/fiber` anywhere
in the program breaks `Eyebrow.tsx`'s generic `<Tag>` JSX usage — its global
`declare module 'react' { namespace JSX { interface IntrinsicElements
extends ThreeElements {} } }` augmentation makes TS resolve a generic
`ElementType`'s `children` prop to `never`. Fixed by rewriting `Eyebrow` to
use `createElement` instead of JSX for the dynamic tag (`createElement`
isn't subject to `JSX.IntrinsicElements` children-arity checks) — no change
to Eyebrow's public API. The hero CTA needed a locale-aware link (so
`/work` navigates as `/en/work`/`/es/work`, matching the Navbar's links,
not a hard-redirect through the middleware); rather than change `Button`
itself (a generic, non-locale-aware primitive used elsewhere, and changing
its `Link` would've broken Phase 1's `Button.test.tsx`, which renders it
without a next-intl provider), exported `buttonClassName` from `Button.tsx`
and paired it with `next-intl`'s `Link` directly in `HeroSection`. Also:
`HeroSection` uses `useTranslations` (sync, from `next-intl`) rather than
`getTranslations` (async, from `next-intl/server`) — the async version
throws under Vitest, since next-intl's server APIs resolve to a
client-incompatible stub outside a real RSC pipeline (Vitest has no RSC
renderer); `useTranslations` works in both Server and Client Components and
is what `Footer`/`Navbar` already used. Adding `HeroSection` (which reads
the locale) to the home page silently flipped `/[locale]` from static to
dynamically-rendered in the build output — fixed by making `page.tsx` await
`params` and call `setRequestLocale(locale)` itself, per next-intl's
static-rendering requirement that _every_ page/layout using its APIs call
it, not just the root layout. Hero copy (`home.hero.*` in
`messages/{en,es}.json`) is real but not final-polish translated Spanish —
same placeholder-quality allowance Phase 4 gives the About section, refined
in Phase 10.

> CTA behavior changed 2026-07-24: it navigates to `/work` as a real route
> transition now, not an anchor scroll — there's no `#work` on the same page
> to scroll to anymore.

Scope:

- `WireframeSphere` (react-three-fiber, `next/dynamic` + `ssr:false`): idle
  rotation, mouse parallax, respects `useReducedMotion` (static render when
  reduced), static SVG/CSS fallback for no-WebGL.
- `HeroSection`: eyebrow ("UX/UI DESIGN · UI DEVELOPMENT"), headline
  ("DESIGN & BUILD"), subtext ("Where design and code actually meet."), CTA
  ("Case Studies & Work") as a Next.js `Link` navigating to `/work`,
  surrounding `MonoLabel` data-point decorations.
- Headline/subtext/CTA must render and be readable before the 3D canvas
  finishes loading (no layout blocking on the WebGL bundle).

Definition of Done:

- Hero content (text) is visible/correct even with JS/WebGL disabled
  (progressive enhancement check).
- Clicking the CTA navigates to `/work` (verify it's a real `<a href="/work">`-
  style transition, not a scroll or a client-side no-op).
- `prefers-reduced-motion: reduce` verified by hand (OS/browser setting) to
  actually stop rotation/parallax.
- Lighthouse performance check on this page isn't tanked by the 3D bundle
  (spot-check bundle size in the build output).

---

### Phase 4 — About section

**Depends on:** Phase 2 (can run parallel to Phase 3). **Docs:** PROJECT_BRIEF.md §6.

Scope:

- `AboutSection`: "Hey, I'm Hernán." + the bio paragraph (EN copy first,
  ES added properly in Phase 10 — a rough MT placeholder is fine for now,
  flagged with a `// TODO(i18n)` comment or issue reference), optional
  skills mini-list. Lives on `/` directly below the Hero — this is the one
  remaining "section" on the home page.

Definition of Done:

- Section renders in the page flow with correct semantic heading level
  (continues the document outline started by the hero, no skipped levels).

---

### Phase 5 — Content layer (schema, MDX pipeline, seed content) ✅ done (2026-07-25)

**Depends on:** Phase 0 (can run parallel to Phase 1). **Docs:** CONTENT_MODEL.md.

Notes from actually doing this phase: `next-mdx-remote@6`'s `/rsc` entry
exports `compileMDX<TFrontmatter>({ source, options: { parseFrontmatter: true },
components })`, which covers both frontmatter parsing and RSC-compatible
compilation in one call — no separate `gray-matter` dependency needed.
`index.ts` metadata is loaded via a template-literal dynamic
`import(`./work/${slug}/index.ts`)` relative to `lib.ts`; both Vite/Vitest
and webpack (Next's bundler) resolve this as a context-module glob over
`src/content/work/*/index.ts`, so it works identically in tests and in the
real build without a manual slug→module registry. The "every
`CaseStudyImage` has a non-trivial `alt`" rule can't be checked through the
zod schema (it's inside the MDX body, not frontmatter), so it's enforced by
regex-scanning the raw MDX source in `lib.ts`
(`assertCaseStudyImageAltsAreValid`, exported for direct unit testing)
before handing it to `compileMDX` — rejects empty alt and alt values that
are just the image's filename. Verified the "build fails loudly" DoD
requirement by hand: temporarily renaming `lumen-crm/es.mdx` away and
re-running the content-layer tests produced a clear, located error
(`[content/work/lumen-crm] missing required "es.mdx" ...`), then restored
the file. Seed content: `signal-desk` (featured, exercises
`role`/`context` + inline `CaseStudyImage` + all featured-template
sections) and `lumen-crm` (other, lighter body, no `role`/`context`) —
both real EN/ES prose, not machine-translated placeholders, but explicitly
marked as placeholder case studies to swap for Hernán's real work in
Phase 13.

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

> Scope updated 2026-07-24: this is now the dedicated `/work` route, not a
> section of `/`. Component renamed/relocated accordingly — see
> ARCHITECTURE.md's folder structure.

Scope:

- `WorkIndex` (`components/work/WorkIndex.tsx`, rendered at
  `app/[locale]/work/page.tsx`): featured case study cards (collage cover,
  title, one-line summary, link) + a lighter list/grid for "other work".
- `app/[locale]/work/[slug]/page.tsx` with `generateStaticParams` over all
  slugs; renders `CaseStudyTemplate` (featured) or `OtherWorkTemplate`
  (other) based on `depth`.
- Card and page hover/focus states follow the shared bracket/underline
  microinteraction language (DESIGN_SYSTEM.md), not a bespoke animation.
- Per DESIGN_SYSTEM.md's hierarchy rule: grids/crosshairs/mono-label
  decoration present on the `/work` index, but the case study page body
  itself stays quiet — no decorative overlays competing with the content.

Definition of Done:

- Both seed projects render correctly end-to-end (card on `/work` → dedicated
  page), in both locales.
- Case study pages statically generated (verify in `next build` output, not
  server-rendered per request).
- Images have real alt text, use `next/image`, no obvious layout shift.

---

### Phase 7 — AI Workflow page

**Depends on:** Phase 1, Phase 2. **Docs:** CONTENT_MODEL.md ("Static pages
(AI Workflow)"), PROJECT_BRIEF.md ("Structural revision — 2026-07-24").

New page, added 2026-07-24, out of the original brief's scope. Content is
final copy from Hernán (English), reproduced below — implement verbatim,
don't paraphrase:

> **Title:** AI-Assisted Workflow
>
> **Introduction:** I don't just use AI to design faster — I built a
> process around it, one I keep refining. Here's how a project actually
> moves through my hands, from a rough idea to a shipped interface.
>
> 1. **Discovery — human-led.** I start where AI can't: talking with
>    stakeholders and users, looking at competitors and the market, getting
>    a real feel for the problem. No rigid framework — I keep it loose and
>    follow what each project actually needs.
> 2. **Brief & direction.** I turn that into a written functional brief and
>    a visual direction — references, mood, constraints. This is what keeps
>    everything that follows from going generic.
> 3. **Design system & concept — Claude Design.** With the brief as
>    context, I generate a first design system and visual concept. I review
>    it, keep what works, rework what doesn't.
> 4. **Technical plan — Claude Code.** Once the direction holds up, I move
>    into Claude Code to define the tech stack, architecture, and a staged
>    build plan. AI drafts it, I call it.
> 5. **Build.** Execution happens in stages, checkpoint by checkpoint.
>    Result: a working first version, not a mockup.
> 6. **Iterate.** I test it, find what's off, and go back to whatever needs
>    it — design, plan, or code.
> 7. **Back to Figma.** Once the build settles, I sync the design system
>    back into Figma via MCP — so it can keep moving between Figma and code
>    as the product grows, not stay frozen after v1.
>
> At every step, I'm the one deciding what and how it moves forward. AI
> does the heavy lifting — not the directing.
>
> **Highlighted subsection — "How does this fit into a team?"**
> Strip away the specific tools and what's left is just good process: a
> written brief before anything gets built, a design system as the single
> source of truth, a review checkpoint between every stage. That works
> whether it's me and Claude, or a full team on Figma and Jira with no AI
> involved at all. The tools change. The discipline doesn't.

Scope:

- `app/[locale]/ai-workflow/page.tsx`: title, intro paragraph, the 7 steps
  as a real semantic `<ol>` (each item's bolded lead-in + body text), the
  closing line, and the highlighted callout subsection, all per the copy
  above.
- Content lives directly in the page file (see CONTENT_MODEL.md for why
  this page intentionally skips the `content/` data layer and MDX
  pipeline).
- Visual treatment consistent with the rest of the site (DESIGN_SYSTEM.md
  tokens) — quiet body typography like a case study page, not hero-level
  retrofuturist decoration, since this is a reading-heavy page.
- The callout box for "How does this fit into a team?": a bordered
  highlight treatment, built inline for this page. Only extract it to
  `components/ui/Callout.tsx` if a second real use case shows up later.
- Added to the persistent nav (Phase 2 already wires the link — this phase
  is about the page existing at that route).

Definition of Done:

- Page renders at `/ai-workflow` in both `en` and `es` locale segments
  (same English content under both — see the bilingual exception in
  ARCHITECTURE.md's Guiding constraints).
- The 7 steps are a real `<ol>` in the DOM (not `<div>`s with CSS counters),
  verified via the rendered HTML, not just visually.
- Heading levels form a real outline continuing from the page's own H1 (no
  skipped levels).
- jest-axe check passes on the page composition, including the callout.
- Copy matches the spec above verbatim — no paraphrasing, no invented
  additions.

---

### Phase 8 — Contact page

**Depends on:** Phase 1, Phase 2. **Docs:** ARCHITECTURE.md (Forms row,
Routes), CONTENT_MODEL.md ("Shared site links"), PROJECT_BRIEF.md §6.

> Scope updated 2026-07-24: this is now the dedicated `/contact` route, not
> a section of `/`. Component renamed/relocated accordingly (`ContactPage`
> in `components/contact/`) — see ARCHITECTURE.md's folder structure. Note
> the footer's contact links (Phase 2) are independent of this page and
> don't duplicate its code — both read `src/lib/site-links.ts`.

Scope:

- `ContactForm`: name/email/message, react-hook-form + Zod validation
  (required fields, valid email format), honeypot field for spam, submits
  to FormSubmit's AJAX endpoint via `fetch`.
- Success/error UI states (inline, accessible — errors associated to
  fields via `aria-describedby`, announced to screen readers).
- `ContactPage` (`components/contact/ContactPage.tsx`, rendered at
  `app/[locale]/contact/page.tsx`): composes `ContactForm` with direct
  contact links (WhatsApp, email, LinkedIn) from `site-links.ts` as a
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
- Direct links on `/contact` and in the persistent footer point to the same
  values (both read `site-links.ts` — no hardcoded duplicate).

---

### Phase 9 — Motion & interaction polish pass

**Depends on:** Phases 3, 4, 6, 7, 8 (everything with visible pages/sections).
**Docs:** DESIGN_SYSTEM.md (Microinteractions).

Scope:

- Section/page scroll-entrance transitions (fade + slide-up, Motion
  `whileInView`) applied consistently across Home (About), `/work`,
  `/ai-workflow`, and `/contact`.
- Cross-check every interactive element (buttons, nav, cards, form fields)
  against the microinteraction table in DESIGN_SYSTEM.md for consistency —
  this phase is explicitly a consistency audit, not new features.
- Global `prefers-reduced-motion` audit: every motion effect added since
  Phase 1 actually degrades gracefully, across all routes.

Definition of Done:

- No animation fires on every scroll tick; no element has more than one
  simultaneous effect (per brief's explicit "avoid" list).
- Manual pass with reduced-motion OS setting enabled confirms all motion is
  suppressed/replaced with instant state changes, on every route.

---

### Phase 10 — i18n content completion

**Depends on:** everything with user-facing copy (Phases 2–6, 8). **Docs:**
CONTENT_MODEL.md (i18n section).

> `/ai-workflow` (Phase 7) is explicitly out of scope for this phase — its
> English-only content is a deliberate, separate decision, not something
> this phase forgot. Don't add an `ai-workflow.*` message namespace here
> unless Hernán has actually asked for the translation pass to start.

Scope:

- Full, real (not machine-translated placeholder) ES/EN copy for every
  string introduced so far — nav, footer, hero, about, work listing,
  contact, form validation/error messages, both seed case studies.
- Key-set parity check (script or test) between `en.json`/`es.json` wired
  into CI so a future PR can't add an English string without its Spanish
  counterpart (or vice versa). This check does not cover `/ai-workflow`.
- Locale-aware `<html lang>`, date/number formatting if any appears.

Definition of Done:

- Manual pass through the entire site in both `/en` and `/es` — no leftover
  placeholder/MT text, no missing keys (blank strings) — except
  `/ai-workflow`, which is expected to render identical English content
  under both locales for now.
- Parity check passes in CI.

---

### Phase 11 — SEO, metadata & analytics

**Depends on:** Phase 6, Phase 7, Phase 8 (all routes must exist). **Docs:**
ARCHITECTURE.md.

Scope:

- `generateMetadata` per route (`/`, `/work`, `/work/[slug]`,
  `/ai-workflow`, `/contact`): title/description per locale, OpenGraph +
  Twitter card tags, `metadataBase` set to the production domain.
- `app/sitemap.ts`, `app/robots.ts` — covering all five route shapes above.
- OG image(s) — at minimum a static default; per-case-study OG images are a
  stretch goal, not required for v1.
- `@vercel/analytics` `<Analytics />` wired into the root layout.

Definition of Done:

- Social share preview (test via a link-preview debugger) renders sensible
  title/description/image for the home page, one case study page, and
  `/ai-workflow`.
- `sitemap.xml`/`robots.txt` reachable and correct in a production build,
  listing all routes including `/ai-workflow` and `/contact`.

---

### Phase 12 — Testing & QA hardening

**Depends on:** all feature phases. **Docs:** CODING_STANDARDS.md (Testing).

Scope:

- Fill test coverage gaps left by earlier phases: contact form validation
  logic, language switcher route preservation, content-layer edge cases.
- jest-axe run across every top-level page (not just components in
  isolation) to catch composition-level a11y issues — including
  `/ai-workflow`'s callout and ordered list.
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

### Phase 13 — Deployment & docs finalization

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
