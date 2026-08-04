import type { ProjectMeta } from "../../schema";

// Duplicated from hardrock-marketing-planner as a starting point — title
// updated, everything else (images, copy) still needs to be replaced with
// the real Topbuild content.
export const meta: ProjectMeta = {
  slug: "topbuild-license-tracker",
  depth: "featured",
  order: 2,
  coverImage: "/images/work/hardrock-marketing-planner/cover.jpg",
  coverImageAlt:
    "Collage of the Hard Rock Marketing Planner interface: campaign calendar, offering-variant setup form, and the Plan / Jobs / Campaigns hierarchy view",
  gallery: [
    {
      src: "/images/work/hardrock-marketing-planner/calendar.webp",
      alt: "Marketing Planner's calendar view showing campaigns grouped by job across a multi-week timeline",
    },
    {
      src: "/images/work/hardrock-marketing-planner/gallery-add-jobs.webp",
      alt: "Add Jobs view with import, jobs list, and selected job details",
    },
    {
      src: "/images/work/hardrock-marketing-planner/jobs.webp",
      alt: "Jobs list with offering lists, counts and status indicators",
    },
    {
      src: "/images/work/hardrock-marketing-planner/Monitoring.webp",
      alt: "Monitoring view with campaign status and validation indicators",
    },
    {
      src: "/images/work/hardrock-marketing-planner/add-offers.webp",
      alt: "Add Offers view with offer variants and configuration",
    },
    {
      src: "/images/work/hardrock-marketing-planner/add-jobs.webp",
      alt: "Add Jobs view with job details and configuration",
    },
  ],
};
