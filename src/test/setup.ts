import "@testing-library/jest-dom/vitest";
import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// jsdom doesn't implement matchMedia at all — every component that reads
// `useReducedMotion()` (now including the shared `Reveal` primitive used
// across most page-level components) would otherwise throw
// "window.matchMedia is not a function" in any test that doesn't opt in to
// its own mock. Default to "no preference"; tests exercising the reduced-
// motion behavior itself still override this with their own mock.
// jsdom also has no IntersectionObserver, which `motion/react`'s
// `whileInView` (used by the shared `Reveal` primitive) constructs
// unconditionally — without this stub, any test rendering a `Reveal`
// throws `ReferenceError: IntersectionObserver is not defined`.
if (!window.IntersectionObserver) {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];
    disconnect() {}
    observe() {}
    unobserve() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  window.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
}

if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}

// `globals: false` in vitest.config.ts means testing-library's automatic
// afterEach(cleanup) registration doesn't fire — register it explicitly so
// each test starts from an empty DOM.
afterEach(cleanup);
