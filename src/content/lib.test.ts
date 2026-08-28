import { describe, expect, it } from "vitest";
import {
  assertCaseStudyImageAltsAreValid,
  getAllProjects,
  getAllProjectSlugs,
  getProjectBySlug,
} from "./lib";

describe("getAllProjectSlugs", () => {
  it("finds every seed project", () => {
    expect(getAllProjectSlugs().sort()).toEqual([
      "groundworks-inspection-app",
      "hardrock-marketing-planner",
      "issutrax-onboard",
      "muu-livestock-app",
      "oz-svm",
      "signos-santafesinos",
      "topbuild-license-tracker",
    ]);
  });
});

describe("getAllProjects", () => {
  it("returns featured projects before other, sorted by order within each group", async () => {
    const projects = await getAllProjects("en");
    expect(projects.map((p) => p.meta.slug)).toEqual([
      "hardrock-marketing-planner",
      "topbuild-license-tracker",
      "oz-svm",
      "issutrax-onboard",
      "muu-livestock-app",
      "signos-santafesinos",
      "groundworks-inspection-app",
    ]);
    expect(projects[0].meta.depth).toBe("featured");
    expect(projects[1].meta.depth).toBe("featured");
    expect(projects[2].meta.depth).toBe("featured");
    expect(projects[3].meta.depth).toBe("featured");
    expect(projects[4].meta.depth).toBe("other");
    expect(projects[5].meta.depth).toBe("other");
    expect(projects[6].meta.depth).toBe("other");
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

  it("returns the other-depth project without requiring role/context, though it may supply them", async () => {
    const project = await getProjectBySlug("muu-livestock-app", "en");
    expect(project.meta.depth).toBe("other");
    expect(project.frontmatter.responsibilities).toBeUndefined();
  });

  it("returns Spanish frontmatter when locale is es", async () => {
    const project = await getProjectBySlug("muu-livestock-app", "es");
    expect(project.frontmatter.title).toContain("Mercado digital ganadero");
    expect(project.frontmatter.title).not.toEqual(
      (await getProjectBySlug("muu-livestock-app", "en")).frontmatter.title,
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
