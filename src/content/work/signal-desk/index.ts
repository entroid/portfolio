import type { ProjectMeta } from "../../schema";

// Placeholder seed content for Phase 5 — exercises the "featured" template.
// Swap for a real case study before shipping (see docs/IMPLEMENTATION_PLAN.md, Phase 13).
export const meta: ProjectMeta = {
  slug: "signal-desk",
  depth: "featured",
  order: 1,
  coverImage: "/images/work/signal-desk/cover.png",
  coverImageAlt:
    "Collage of the Signal Desk dashboard's timeline, severity-coded event feed, and shift-handoff panel",
  gallery: [
    {
      src: "/images/work/signal-desk/gallery-1.png",
      alt: "Signal Desk timeline view at rest, showing the default severity-coded event feed before any row is expanded",
    },
    {
      src: "/images/work/signal-desk/gallery-2.png",
      alt: "Signal Desk shift-handoff panel summarizing open incidents and their current owners",
    },
  ],
};
