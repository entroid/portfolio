import type { ProjectMeta } from "../../schema";

export const meta: ProjectMeta = {
  slug: "oz-svm",
  depth: "featured",
  order: 3,
  year: "2023–2024",
  coverImage: "/images/work/oz-svm/cover.webp",
  coverImageAlt: "SVM — Strategic Value Model cover image",
  gallery: [
    {
      src: "/images/work/oz-svm/login.webp",
      alt: "SVM — Strategic Value Model login screen",
    },
    {
      src: "/images/work/oz-svm/overview.webp",
      alt: "Analysis overview with relevant information and quick actions",
    },
    {
      src: "/images/work/oz-svm/information-architechture.webp",
      alt: "Information architecture diagram showing the structure of the application",
    },
    {
      src: "/images/work/oz-svm/model-versioning.webp",
      alt: "Model version differences grouped by consequence: what recalculates safely, what requires new data, and what would discard existing data",
    },
    {
      src: "/images/work/oz-svm/projects.webp",
      alt: "List and management of projects to be analyzed",
    },
  ],
};
