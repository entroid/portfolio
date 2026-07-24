# Coding Standards

Conventions every module/phase in [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)
should follow, so code written across many separate agent sessions still
reads as one consistent codebase.

## Naming & structure

- Components: `PascalCase` file + export name, one component per file
  (`Button.tsx`, not a `components.tsx` grab-bag).
- Hooks: `useX.ts`, colocated in `src/lib/` unless clearly scoped to one
  component tree.
- Co-locate a component's test next to it: `Button.tsx` + `Button.test.tsx`.
- No default exports for components — named exports only (easier refactors,
  consistent import naming across the codebase).
- Prefer server components by default; add `"use client"` only where
  interactivity/browser APIs actually require it (form, hero sphere,
  language switcher, anything using Motion hooks).

## TypeScript

- `strict: true`, no `any` without a comment explaining why it's
  unavoidable (should be essentially never in this codebase).
- Prefer `type` for props/data shapes, `interface` only when declaration
  merging is actually needed (rare here).
- Zod schemas are the source of truth for content shapes; derive types with
  `z.infer`, don't hand-write a parallel interface that can drift.

## Styling

- Tailwind utility classes in JSX; extract to a component (not a `@apply`
  CSS class) when a pattern repeats — this is a component library, not a
  utility-class stylesheet.
- No inline `style={}` except for genuinely dynamic values that can't be a
  class (e.g. a computed transform from mouse position in the hero
  parallax).
- All colors/spacing/fonts come from the tokens defined in
  [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) — no ad hoc hex values in
  component code.

## Commits & PRs

- Conventional Commits, enforced by commitlint: `feat:`, `fix:`, `chore:`,
  `docs:`, `test:`, `refactor:`. Scope is optional but encouraged for
  clarity (`feat(hero): add mouse parallax`).
- One phase from IMPLEMENTATION_PLAN.md = one PR, generally. Don't bundle
  unrelated phases in one PR — the plan's granularity is meant to map to
  reviewable chunks.
- PR description should state which phase it completes and check off the
  relevant Definition of Done items from the plan.

## Testing

Standard tier (confirmed 2026-07-23 — see ARCHITECTURE.md for what this
excludes and why):

- **Unit/component**: Vitest + React Testing Library. Test behavior (renders
  expected content, responds to interaction, keyboard-reachable), not
  implementation details (don't assert on internal state or class names).
- **Accessibility**: `jest-axe` on every new component and every top-level
  page composition. A component with an axe violation doesn't ship.
- **Content layer**: schema validation and content-loader functions
  (`getAllProjects`, `getProjectBySlug`) get real unit tests against fixture
  content, not just type-checking.
- **Manual QA checklist** (used in Phase 12 and for any visual/interaction
  change): keyboard-only pass, screen-reader spot check on one page,
  responsive check at mobile/tablet/desktop, `prefers-reduced-motion`
  toggle check.
- **Not in v1**: Playwright/e2e, visual regression. First thing to add if
  this project grows beyond a personal portfolio (e.g., if content editing
  moves to non-technical collaborators, or the interactive surface grows).

## Accessibility (non-negotiable, per brief §5)

- Every image has a real, descriptive `alt` — decorative graphics
  (`GridOverlay`, `Crosshair`, `MonoLabel`, `Barcode`, `Grain`) are
  `aria-hidden="true"` instead.
- Heading levels form a real outline per page (no skipping levels for
  visual sizing — use CSS for that, headings for structure).
- Every interactive element reachable and operable by keyboard, with a
  visible focus state (accent-colored ring/underline per DESIGN_SYSTEM.md).
- Color is never the only signal (e.g. form field errors get an icon/text,
  not just a red border).
- `eslint-plugin-jsx-a11y` errors are build failures, not warnings to
  ignore.

## CI pipeline (`.github/workflows/ci.yml`)

Runs on every PR and push to `main`, in this order (fail fast):

1. `pnpm install --frozen-lockfile`
2. `pnpm lint`
3. `pnpm typecheck` (`tsc --noEmit`)
4. `pnpm test` (with coverage reported, not necessarily gated on a
   threshold for v1)
5. `pnpm build`

## Git hooks (Husky)

- `pre-commit`: `lint-staged` runs ESLint `--fix` + Prettier on staged
  files only.
- `commit-msg`: commitlint against Conventional Commits config.

## Definition of Done (applies to every phase, on top of that phase's own

list in IMPLEMENTATION_PLAN.md)

- [ ] `pnpm lint && pnpm typecheck && pnpm test && pnpm build` all pass
- [ ] New components have colocated tests, including an axe check
- [ ] No hardcoded design values outside the token set
- [ ] Keyboard/reduced-motion/alt-text checked by hand, not just assumed
- [ ] Both locales verified for any new user-facing copy (except
      `/ai-workflow`, which is deliberately English-only for now — see
      ARCHITECTURE.md's Guiding constraints)
