import type { ProjectMeta } from "../../schema";

// TODO: replace placeholder image paths below with real OZ SVM assets.
export const meta: ProjectMeta = {
  slug: "oz-svm",
  depth: "featured",
  order: 3,
  coverImage: "/images/work/oz-svm/login.png",
  coverImageAlt: "SVM — Strategic Value Model login screen",
  gallery: [
    {
      src: "/images/work/oz-svm/bubble-chart.png",
      alt: "Impact Comparison Tool bubble chart, comparing projects by cost, effort, and strategic impact",
    },
    {
      src: "/images/work/oz-svm/prioritization-matrix.png",
      alt: "Prioritization Matrix view with categories and weighted attributes",
    },
    {
      src: "/images/work/oz-svm/workspaces.png",
      alt: "My Workspaces view with multi-client cards, including disabled workspace states",
    },
    {
      src: "/images/work/oz-svm/dashboards-sidebar.png",
      alt: "Client dashboards with per-client sidebar navigation (GASTRO, Berkley, Armstrong)",
    },
    {
      src: "/images/work/oz-svm/wireframes-grid.png",
      alt: "Grid of initial low-fidelity wireframes exploring layout and data-entry flows",
    },
  ],
};
