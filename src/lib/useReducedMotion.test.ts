import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useReducedMotion } from "./useReducedMotion";

function mockMatchMedia(matches: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();

  const mediaQueryList = {
    matches,
    media: "(prefers-reduced-motion: reduce)",
    addEventListener: (
      _type: string,
      listener: (event: MediaQueryListEvent) => void,
    ) => listeners.add(listener),
    removeEventListener: (
      _type: string,
      listener: (event: MediaQueryListEvent) => void,
    ) => listeners.delete(listener),
  } as unknown as MediaQueryList;

  window.matchMedia = vi.fn().mockReturnValue(mediaQueryList);

  return {
    emitChange: (next: boolean) => {
      // Real MediaQueryList updates `matches` before dispatching the
      // "change" event — useSyncExternalStore's getSnapshot re-reads
      // matchMedia(...).matches rather than the event payload, so the mock
      // must mutate the same property the hook will read.
      (mediaQueryList as { matches: boolean }).matches = next;
      listeners.forEach((listener) =>
        listener({ matches: next } as MediaQueryListEvent),
      );
    },
  };
}

describe("useReducedMotion", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("reflects the initial media query state", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("defaults to false when the query doesn't match", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it("updates when the media query changes", () => {
    const { emitChange } = mockMatchMedia(false);
    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);

    act(() => {
      emitChange(true);
    });

    expect(result.current).toBe(true);
  });
});
