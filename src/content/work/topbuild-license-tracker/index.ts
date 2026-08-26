import type { ProjectMeta } from "../../schema";

// TODO: replace placeholder image paths below with real TopBuild assets.
export const meta: ProjectMeta = {
  slug: "topbuild-license-tracker",
  depth: "featured",
  order: 2,
  year: "2020",
  coverImage: "/images/work/topbuild-license-tracker/portada.webp",
  coverImageAlt:
    "Collage of the TopBuild License Track System interface: main dashboard with license status counters, expiring-licenses table, and license record detail view",
  gallery: [
    {
      src: "/images/work/topbuild-license-tracker/dashboard.webp",
      alt: "Main MVP dashboard with relevant overview counters that also filter the table below, selected records for batch editing, and color system for status indicators.",
    },
    {
      src: "/images/work/topbuild-license-tracker/advanced-filtering.webp",
      alt: "Detail: Advanced column filtering for license records.",
    },
    {
      src: "/images/work/topbuild-license-tracker/inline-editing.webp",
      alt: "Inline editing UI for quick updating licenses",
    },
    {
      src: "/images/work/topbuild-license-tracker/batch-updates.webp",
      alt: "Batch updates modal: applying changes to multiple licenses at once",
    },
    {
      src: "/images/work/topbuild-license-tracker/licenses-general.webp",
      alt: "License record detail view with tabs for General, License Doc, License Agency, Payment, ISA, Deliverables, and Management",
    },
    {
      src: "/images/work/topbuild-license-tracker/management-qualifiers.webp",
      alt: "Qualifiers Management view for tracking individuals qualified to hold licenses",
    },
    {
      src: "/images/work/topbuild-license-tracker/payment.webp",
      alt: "Payments view for adding and tracking license payments",
    },
  ],
};
