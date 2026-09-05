import type { ProjectMeta } from "../../schema";

export const meta: ProjectMeta = {
  slug: "issutrax-onboard",
  depth: "featured",
  order: 5,
  year: "2018",
  coverImage: "/images/work/issutrax-onboard/hero-mockup.webp",
  coverImageAlt: "IssuTrax laptop and phone mockup, hero composition",
  gallery: [
    {
      src: "/images/work/issutrax-onboard/dashboard-issues.webp",
      alt: "Issue management dashboard with Open Issues, New Today and Completed Today counters above donut charts and ranked lists for issues under alert, created vs. completed, issues open more than four hours by location, and completions by user",
    },
    {
      src: "/images/work/issutrax-onboard/issues-table.webp",
      alt: "Issues table with sortable Issue #, Issue Type, Guest Last Name, Location, Status, Assigned Department and Elapsed Time columns, a colored priority bar per row, and an expanded row revealing priority, who entered it and the assigned user",
    },
    {
      src: "/images/work/issutrax-onboard/notifications.webp",
      alt: "Notifications dropdown listing issue events — assignments, transfers, resolutions and alert-timeframe breaches — each with an issue number and relative timestamp, over a Dismiss All Notifications action",
    },
    {
      src: "/images/work/issutrax-onboard/issue-detail.webp",
      alt: "Issue detail view with New / Assigned / In Progress / Closed stages, a summary panel of type, location, priority and department, and an Update Issue action strip above a comment editor",
    },
    {
      src: "/images/work/issutrax-onboard/style-guide.webp",
      alt: "IssuTrax style guide: color palette with hex values, Roboto type scale, form and button specimens, the data grid pattern, notification and chart components, and light and dark variants of the left and filters menus",
    },
  ],
};
