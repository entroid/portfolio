# CLAUDE.md

Operating guide for agent sessions working on this repo. Read this first;
it points to everything else.

## What this project is

Hernán Ainsa's personal portfolio — Next.js rebuild of a previously
Webflow-based static site. Two goals at once: (1) a real, effective portfolio
for a UX/UI Design / Front-End / Design Engineer job search, and (2) a
public GitHub showcase of solid, current React/Next.js engineering practice.
No backend of its own (contact form → FormSubmit; content is files in the
repo, read at build time).

## Docs — read in this order

1. [docs/PROJECT_BRIEF.md](docs/PROJECT_BRIEF.md) — the original brief
   (design intent + functional spec), verbatim. Source of truth for _what_
   and _why_.
2. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — the stack, and the
   reasoning for each choice. Read before touching config, adding a
   dependency, or making a structural decision.
3. [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) — concrete tokens
   (color/type/spacing/motion) and component specs, pulled directly from the
   live Claude Design file. Read before building or styling any UI.
4. [docs/CONTENT_MODEL.md](docs/CONTENT_MODEL.md) — how case studies are
   authored/validated/rendered. Read before touching anything under
   `src/content/`.
5. [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md) — the phased
   module breakdown. **This is the task list** — find the next unchecked
   phase, or the specific phase you were asked to do, and read its scope/DoD
   before writing code.
6. [docs/CODING_STANDARDS.md](docs/CODING_STANDARDS.md) — naming, testing,
   commit, and accessibility conventions that apply to every phase.

## How to pick up work

- If told "do the next phase" or similar: open IMPLEMENTATION_PLAN.md, find
  the first unchecked box, read its full scope/DoD section, and confirm with
  Hernán before starting if anything in it is ambiguous or contradicts what
  you find in the codebase.
- If told to do a specific phase out of order: check that its listed
  dependencies are actually done (code, not just the checkbox) before
  starting.
- After finishing a phase: check its box in IMPLEMENTATION_PLAN.md as part
  of the same PR, and open the PR against the phase's own Definition of
  Done plus the global one in CODING_STANDARDS.md.
- If a phase turns out to need a decision not covered by the docs (a new
  dependency, a deviation from a spec here), stop and ask rather than
  guessing — then update the relevant doc so the next session doesn't hit
  the same ambiguity.

## Hard constraints (don't relitigate these without asking)

- No backend, no database, no CMS, no auth — see ARCHITECTURE.md's
  "Guiding constraints".
- No dependency substitutions for the stack choices in ARCHITECTURE.md
  without checking with Hernán first — they were deliberately chosen
  together (e.g. don't swap Tailwind for styled-components mid-project).
- Every route/component ships bilingual (ES/EN) from the commit that
  introduces it, not as a follow-up. **One deliberate exception:**
  `/ai-workflow` ships English-only; its Spanish translation is an
  explicitly deferred later pass (decided 2026-07-24). Don't extend this
  carve-out to any other route without checking first.
- No invented metrics/numbers in case study "Results" content.
- Zero border-radius, dark palette, mono-for-technical/sans-for-prose —
  don't drift from DESIGN_SYSTEM.md's tokens even for a "temporary" build.

## Commands (finalized in Phase 0 — until then, this section is aspirational)

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
