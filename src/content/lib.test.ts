import { describe, expect, it } from "vitest";
import {
  assertCaseStudyImageAltsAreValid,
  getAllProjects,
  getAllProjectSlugs,
  getProjectBySlug,
} from "./lib";

describe("getAllProjectSlugs", () => {
  it("finds both seed projects", () => {
    expect(getAllProjectSlugs().sort()).toEqual([
      "hardrock-marketing-planner",
      "lumen-crm",
    ]);
  });
});

describe("getAllProjects", () => {
  it("returns featured projects before other, sorted by order within each group", async () => {
    const projects = await getAllProjects("en");
    expect(projects.map((p) => p.meta.slug)).toEqual([
      "hardrock-marketing-planner",
      "lumen-crm",
    ]);
    expect(projects[0].meta.depth).toBe("featured");
    expect(projects[1].meta.depth).toBe("other");
  });

  it("returns validated, typed frontmatter for every project", async () => {
    const projects = await getAllProjects("en");
    for (const project of projects) {
      expect(project.frontmatter.title).toBeTruthy();
      expect(project.frontmatter.summary).toBeTruthy();
      expect(project.content).toBeTruthy();
    }
  });
});

describe("getProjectBySlug", () => {
  it("returns the featured project with role/context populated", async () => {
    const project = await getProjectBySlug("hardrock-marketing-planner", "en");
    expect(project.meta.depth).toBe("featured");
    expect(project.frontmatter.title).toContain("Hard Rock");
    expect(project.frontmatter.role).toBeTruthy();
    expect(project.frontmatter.context).toBeTruthy();
  });

  it("returns the other-depth project without requiring role/context", async () => {
    const project = await getProjectBySlug("lumen-crm", "en");
    expect(project.meta.depth).toBe("other");
    expect(project.frontmatter.role).toBeUndefined();
  });

  it("returns Spanish frontmatter when locale is es", async () => {
    const project = await getProjectBySlug("lumen-crm", "es");
    expect(project.frontmatter.title).toContain("Lumen CRM");
    expect(project.frontmatter.title).not.toEqual(
      (await getProjectBySlug("lumen-crm", "en")).frontmatter.title,
    );
  });

  it("throws a loud, located error for a non-existent slug", async () => {
    await expect(getProjectBySlug("does-not-exist", "en")).rejects.toThrow(
      /does-not-exist/,
    );
  });
});

describe("assertCaseStudyImageAltsAreValid", () => {
  it("passes for a descriptive, non-empty alt", () => {
    const source = `<CaseStudyImage src="/images/work/x/shot.jpg" alt="Dashboard showing three correlated failures" />`;
    expect(() =>
      assertCaseStudyImageAltsAreValid(source, "x", "en"),
    ).not.toThrow();
  });

  it("throws when alt is empty", () => {
    const source = `<CaseStudyImage src="/images/work/x/shot.jpg" alt="" />`;
    expect(() => assertCaseStudyImageAltsAreValid(source, "x", "en")).toThrow(
      /alt/i,
    );
  });

  it("throws when alt is missing entirely", () => {
    const source = `<CaseStudyImage src="/images/work/x/shot.jpg" />`;
    expect(() => assertCaseStudyImageAltsAreValid(source, "x", "en")).toThrow(
      /alt/i,
    );
  });

  it("throws when alt is just the filename", () => {
    const source = `<CaseStudyImage src="/images/work/x/shot.jpg" alt="shot.jpg" />`;
    expect(() => assertCaseStudyImageAltsAreValid(source, "x", "en")).toThrow(
      /filename/i,
    );
  });

  it("throws when any image among several is invalid, not just the first", () => {
    const source = [
      `<CaseStudyImage src="/images/work/x/one.jpg" alt="Dashboard overview with three panels" />`,
      `<CaseStudyImage src="/images/work/x/two.svg" alt="two.svg" />`,
    ].join("\n");
    expect(() => assertCaseStudyImageAltsAreValid(source, "x", "en")).toThrow(
      /filename/i,
    );
  });
});
