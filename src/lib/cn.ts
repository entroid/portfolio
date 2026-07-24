import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge ships a default config built from stock Tailwind — it has
// no idea about our custom `@theme` tokens in globals.css. Without this,
// e.g. `text-label` (our custom font-size) and `text-accent` (text color)
// both start with `text-`, and tailwind-merge misclassifies the unrecognized
// `label` suffix as belonging to the *color* group, silently dropping
// `text-label` whenever both appear together. Every custom `--text-*` and
// `--tracking-*` token from globals.css must be listed here too.
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "label",
            "label-desktop",
            "eyebrow",
            "eyebrow-desktop",
            "body",
            "body-desktop",
            "h3",
            "h3-desktop",
            "h2",
            "h2-desktop",
            "h1",
            "h1-desktop",
          ],
        },
      ],
      tracking: [{ tracking: ["h1", "eyebrow", "label"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
