import { describe, expect, it } from "vitest";
import en from "./messages/en.json";
import es from "./messages/es.json";

/**
 * Flattens nested message objects into dot-path keys. Arrays (e.g.
 * `home.about.skills`) are treated as leaves, not recursed into — parity is
 * about key structure, not per-item translation content.
 */
function flattenKeys(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value) || typeof value !== "object" || value === null) {
    return [prefix];
  }
  return Object.entries(value as Record<string, unknown>).flatMap(
    ([key, child]) => flattenKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

function flattenLeaves(value: unknown, prefix = ""): [string, unknown][] {
  if (Array.isArray(value) || typeof value !== "object" || value === null) {
    return [[prefix, value]];
  }
  return Object.entries(value as Record<string, unknown>).flatMap(
    ([key, child]) => flattenLeaves(child, prefix ? `${prefix}.${key}` : key),
  );
}

describe("i18n message parity (en.json / es.json)", () => {
  it("has the same key set in both locales", () => {
    const enKeys = new Set(flattenKeys(en));
    const esKeys = new Set(flattenKeys(es));

    const missingInEs = [...enKeys].filter((key) => !esKeys.has(key));
    const missingInEn = [...esKeys].filter((key) => !enKeys.has(key));

    expect(
      missingInEs,
      `Keys present in en.json but missing in es.json: ${missingInEs.join(", ")}`,
    ).toEqual([]);
    expect(
      missingInEn,
      `Keys present in es.json but missing in en.json: ${missingInEn.join(", ")}`,
    ).toEqual([]);
  });

  it("has no blank/empty string values in either locale", () => {
    const blankEn = flattenLeaves(en).filter(([, value]) => value === "");
    const blankEs = flattenLeaves(es).filter(([, value]) => value === "");

    expect(
      blankEn.map(([key]) => key),
      "en.json has blank string values",
    ).toEqual([]);
    expect(
      blankEs.map(([key]) => key),
      "es.json has blank string values",
    ).toEqual([]);
  });
});
