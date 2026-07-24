import "@testing-library/jest-dom/vitest";
import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// `globals: false` in vitest.config.ts means testing-library's automatic
// afterEach(cleanup) registration doesn't fire — register it explicitly so
// each test starts from an empty DOM.
afterEach(cleanup);
