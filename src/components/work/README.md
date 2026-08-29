# components/work

`CaseStudyCard`, `CaseStudyTemplate`, `OtherWorkTemplate`, `CaseStudyOutro`,
`Gallery`, `WorkIndex` (the `/work` route's Featured + Other grid).

`CaseStudyOutro` closes a case study with a contact CTA and a link to the
next project in /work's reading order (`getNextProject` in
[content/lib.ts](../../content/lib.ts)). Currently rendered by
`CaseStudyTemplate` only — `OtherWorkTemplate` still ends on its content.

Built in [Phase 6](../../../docs/IMPLEMENTATION_PLAN.md#phase-6--work-listing--case-study-pages).
Content model: [docs/CONTENT_MODEL.md](../../../docs/CONTENT_MODEL.md).
