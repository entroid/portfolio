import fs from "node:fs";
import path from "node:path";
import type { ReactElement } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import {
  caseStudyMdxComponents,
  otherWorkMdxComponents,
} from "./mdx-components";
import {
  projectFrontmatterSchema,
  projectMetaSchema,
  type ProjectFrontmatter,
  type ProjectMeta,
} from "./schema";

const WORK_DIR = path.join(process.cwd(), "src/content/work");

export type Project = {
  meta: ProjectMeta;
  frontmatter: ProjectFrontmatter;
  content: ReactElement;
};

/**
 * Reads every project under src/content/work, validates it end to end, and
 * returns it sorted (featured first, then by `order` within each depth
 * group). Any validation failure throws — content errors must be loud, not
 * silently skipped (see CONTENT_MODEL.md).
 */
export async function getAllProjects(locale: Locale): Promise<Project[]> {
  const slugs = listProjectSlugs();
  const projects = await Promise.all(
    slugs.map((slug) => loadProject(slug, locale)),
  );

  return projects.sort((a, b) => {
    if (a.meta.depth !== b.meta.depth) {
      return a.meta.depth === "featured" ? -1 : 1;
    }
    return a.meta.order - b.meta.order;
  });
}

export async function getProjectBySlug(
  slug: string,
  locale: Locale,
): Promise<Project> {
  return loadProject(slug, locale);
}

export function getAllProjectSlugs(): string[] {
  return listProjectSlugs();
}

function listProjectSlugs(): string[] {
  if (!fs.existsSync(WORK_DIR)) return [];
  return fs
    .readdirSync(WORK_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

async function loadProject(slug: string, locale: Locale): Promise<Project> {
  const projectDir = path.join(WORK_DIR, slug);
  if (!fs.existsSync(projectDir)) {
    throw new Error(`[content/work/${slug}] no such project directory.`);
  }

  const meta = await loadMeta(projectDir, slug);

  for (const loc of routing.locales) {
    if (!fs.existsSync(path.join(projectDir, `${loc}.mdx`))) {
      throw new Error(
        `[content/work/${slug}] missing required "${loc}.mdx" — every project needs both en.mdx and es.mdx.`,
      );
    }
  }

  const mdxPath = path.join(projectDir, `${locale}.mdx`);
  const source = fs.readFileSync(mdxPath, "utf8");

  assertCaseStudyImageAltsAreValid(source, slug, locale);

  const { content, frontmatter: rawFrontmatter } =
    await compileMDX<ProjectFrontmatter>({
      source,
      options: { parseFrontmatter: true },
      components:
        meta.depth === "featured"
          ? caseStudyMdxComponents
          : otherWorkMdxComponents,
    });

  const frontmatterResult = projectFrontmatterSchema.safeParse(rawFrontmatter);
  if (!frontmatterResult.success) {
    throw new Error(
      `[content/work/${slug}/${locale}.mdx] invalid frontmatter: ${frontmatterResult.error.message}`,
    );
  }
  const frontmatter = frontmatterResult.data;

  if (
    meta.depth === "featured" &&
    (!frontmatter.role?.trim() || !frontmatter.context?.trim())
  ) {
    throw new Error(
      `[content/work/${slug}/${locale}.mdx] featured projects require both "role" and "context" in frontmatter.`,
    );
  }

  return { meta, frontmatter, content };
}

async function loadMeta(
  projectDir: string,
  slug: string,
): Promise<ProjectMeta> {
  const indexPath = path.join(projectDir, "index.ts");
  if (!fs.existsSync(indexPath)) {
    throw new Error(
      `[content/work/${slug}] missing required "index.ts" metadata file.`,
    );
  }

  const mod: unknown = await import(`./work/${slug}/index.ts`);
  const raw =
    (mod as { meta?: unknown; default?: unknown }).meta ??
    (mod as { default?: unknown }).default;

  const result = projectMetaSchema.safeParse(raw);
  if (!result.success) {
    throw new Error(
      `[content/work/${slug}/index.ts] invalid metadata: ${result.error.message}`,
    );
  }

  if (result.data.slug !== slug) {
    throw new Error(
      `[content/work/${slug}/index.ts] "slug" field ("${result.data.slug}") must match its folder name ("${slug}").`,
    );
  }

  return result.data;
}

const CASE_STUDY_IMAGE_TAG = /<CaseStudyImage\b([^>]*)\/?>/g;
const ATTRIBUTE = /(\w+)="([^"]*)"/g;

/**
 * Frontmatter/schema validation can't see inside the MDX body, so alt-text
 * quality on <CaseStudyImage> is checked here against the raw source before
 * compiling — enforced per CONTENT_MODEL.md ("every CaseStudyImage requires
 * a real, descriptive alt").
 */
export function assertCaseStudyImageAltsAreValid(
  source: string,
  slug: string,
  locale: Locale,
) {
  for (const tagMatch of source.matchAll(CASE_STUDY_IMAGE_TAG)) {
    const attrs: Record<string, string> = {};
    for (const attrMatch of tagMatch[1].matchAll(ATTRIBUTE)) {
      attrs[attrMatch[1]] = attrMatch[2];
    }

    const alt = attrs.alt?.trim();
    const location = `[content/work/${slug}/${locale}.mdx]`;

    if (!alt) {
      throw new Error(
        `${location} <CaseStudyImage> is missing a non-empty "alt".`,
      );
    }

    const src = attrs.src ?? "";
    const filename = src.split("/").pop() ?? "";
    if (alt === filename || /\.(png|jpe?g|webp|svg|gif)$/i.test(alt)) {
      throw new Error(
        `${location} <CaseStudyImage alt="${alt}"> looks like a filename, not descriptive alt text.`,
      );
    }
  }
}
