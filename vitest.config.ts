import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: false,
    exclude: ["node_modules", ".next", "e2e"],
    server: {
      // next-intl's navigation helpers re-export bare `next/navigation`
      // subpaths with no file extension; Next's package.json has no
      // `exports` map, so Node's native ESM loader (used for externalized
      // deps) can't resolve them. Inlining forces Vite's own resolver
      // (which extension-guesses like Node's CJS resolution) to handle it.
      deps: {
        inline: ["next-intl"],
      },
    },
  },
});
