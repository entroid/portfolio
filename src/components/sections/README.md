# components/sections

`AboutSection` and `FeaturedWork` — the home page (`/`) sections below the
Hero. `FeaturedWork` renders the first three `depth: "featured"` projects
with the same `CaseStudyCard` the /work index uses. `WorkSection`/`ContactSection` moved out of here on 2026-07-24:
Work and Contact are now their own routes, so their components live in
`components/work/` (`WorkIndex`) and `components/contact/` (`ContactPage`)
respectively — see [docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md).

Built in [Phase 4](../../../docs/IMPLEMENTATION_PLAN.md#phase-4--about-section).
