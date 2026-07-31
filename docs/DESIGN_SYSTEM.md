# Design System

Translates [PROJECT_BRIEF.md](./PROJECT_BRIEF.md) Parte 1 into concrete,
buildable tokens and component specs. Color, spacing, typography, and
border-radius values below were pulled directly from the live Claude Design
file (`Portfolio Hero.dc.html`, project "Portfolio hero and design system",
confirmed 2026-07-23) — that file is the source of truth for tokens; this
doc is the buildable translation of it. If the design file changes later,
update this doc to match, not the other way around.

## Color tokens

Defined as CSS variables in `src/styles/globals.css`, exposed to Tailwind via
`@theme`.

| Token                  | Value                    | Usage                                                                                                                                                                                                                                               |
| ---------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--color-bg`           | `#0A0A0C`                | Page background. Never pure `#000`.                                                                                                                                                                                                                 |
| `--color-surface`      | `#141416`                | Slightly-raised surfaces: cards, form fields, anything that needs to read as "above" the page background without a visible border.                                                                                                                  |
| `--color-fg`           | `#F2F2F0`                | Headlines, primary text.                                                                                                                                                                                                                            |
| `--color-muted`        | `#8C8C88`                | Secondary text, mono labels, eyebrows.                                                                                                                                                                                                              |
| `--color-grid-border`  | `rgba(255,255,255,0.07)` | Single shared token for grid lines _and_ hairline borders/dividers — the design file uses one value for both, don't split it into two tokens with different opacities.                                                                              |
| `--color-accent`       | `#9EFF3D`                | Default/current accent (confirmed in the design file's live token picker, supersedes the `#D4FF00` guess in the original text brief). CTAs, hover states, highlighted data points. Point accent only — see rules below.                             |
| `--color-accent-alt-1` | `#D4FF00`                | Alternate accent option present in the design file's picker (not currently selected). Keep available as a CSS variable in case Hernán switches the active accent later — don't hardcode `#9EFF3D` in components, always reference `--color-accent`. |
| `--color-accent-alt-2` | `#C6FF3D`                | Second alternate accent option from the same picker.                                                                                                                                                                                                |

**Border-radius: none.** The design file defines no radius tokens — hard,
square edges throughout (buttons, cards, form fields, images). This is a
deliberate part of the retrofuturist "instrument panel" language, not an
oversight — don't add `rounded-*` utilities by default anywhere in this
system.

**Accent usage rules (hard constraints, not suggestions):**

1. Never use `--color-accent` as a background fill larger than a button or
   small badge.
2. Never set body copy or paragraph text in the accent color, at any size.
3. Any standalone text in `--color-accent` on `--color-bg` must be checked
   against WCAG AA (4.5:1 for text under 24px / 18.66px bold, 3:1 above
   that) — `#9EFF3D` on `#0A0A0C` passes comfortably (well above 4.5:1), but
   if the accent is ever used on a lighter surface (e.g. inside a light-fill
   badge) contrast must be re-checked, not assumed.
4. Accent is for: CTA button fill/border, link underline, active nav state,
   focus ring, highlighted numeric/technical data points. Not for: decorative
   grid lines, large icon fills, section backgrounds.

## Typography

Confirmed directly from the design file — note it distinguishes **two**
mono roles (Eyebrow and Label/Data) with different tracking/weight, which
the text brief blurred together:

| Role                  | Font           | Weight  | Size    | Letter-spacing              | Notes                                                                                                                                                                                                                 |
| --------------------- | -------------- | ------- | ------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Headline (H1)         | JetBrains Mono | 800     | 72–96px | `-0.01em`                   | Fluid/responsive within that range — 96px desktop, scaling down toward 72px and further down on mobile via Tailwind responsive classes. Negative tracking at this size (tight, not the wide tracking used on labels). |
| Eyebrow               | JetBrains Mono | 500     | 12–13px | `0.25em`                    | Uppercase. This is _wide_ tracking — noticeably wider than Label/Data below. Used for the hero eyebrow ("UX/UI DESIGN · UI DEVELOPMENT") and section-level eyebrows.                                                  |
| Label / Data          | JetBrains Mono | 400     | 11–12px | `0.08em`                    | Coordinates, timestamps, codes, `MonoLabel` decorative content. Lighter weight and tighter tracking than Eyebrow — don't conflate the two roles.                                                                      |
| Body                  | Inter          | 400     | 16–18px | normal                      | The only sans in the system; reserved for prose (case study descriptions, About paragraph).                                                                                                                           |
| Buttons / nav links   | JetBrains Mono | 500     | —       | per Label/Data tracking     | Consistent with the "instrument panel" language.                                                                                                                                                                      |
| H2 (section headings) | JetBrains Mono | 700–800 | —       | tight, same direction as H1 | Not in the confirmed dump verbatim — extrapolated from H1; treat as a smaller step of the same headline style (e.g. ~40–56px), sanity-check against the design file if a section heading looks off.                   |

Loaded via `next/font/google` (both fonts are on Google Fonts — no
self-hosting needed), exposed as CSS variables (`--font-mono`, `--font-sans`)
and mapped in Tailwind's `fontFamily` theme.

Type scale (rem, mobile → desktop via Tailwind responsive prefixes) —
kept as an implementation-friendly bridge from the raw px values above:

| Token           | Mobile    | Desktop   | Use                                                            |
| --------------- | --------- | --------- | -------------------------------------------------------------- |
| `text-label`    | 0.6875rem | 0.75rem   | Label/Data (11–12px)                                           |
| `text-eyebrow`  | 0.75rem   | 0.8125rem | Eyebrow (12–13px)                                              |
| `text-cta`      | 0.8125rem | 0.9rem    | Buttons/nav links (13–14px)                                    |
| `text-cta-main` | 1rem      | —         | Primary hero/page CTA (16px), overrides `text-cta` on `Button` |
| `text-body`     | 1rem      | 1.125rem  | Paragraphs (16–18px)                                           |
| `text-h3`       | 1.25rem   | 1.5rem    | Card titles                                                    |
| `text-h2`       | 1.75rem   | 2.5rem    | Section headings                                               |
| `text-h1`       | 4.5rem    | 6rem      | Hero headline (72–96px)                                        |

## Spacing scale

Confirmed custom scale from the design file — configure as Tailwind's
`spacing` theme override (not the default Tailwind scale):

| Token      | Value |
| ---------- | ----- |
| `space-1`  | 4px   |
| `space-2`  | 8px   |
| `space-3`  | 16px  |
| `space-4`  | 24px  |
| `space-5`  | 32px  |
| `space-6`  | 48px  |
| `space-7`  | 64px  |
| `space-8`  | 96px  |
| `space-9`  | 128px |
| `space-10` | 160px |

Content max-width: `1280px` container, with a visible thin-line grid
(`--color-grid-border`) as a background decoration in hero/nav/section-ends,
and — as of the case study header treatment — the top of case study pages
too (per brief's hierarchy rule, faded out via a mask before the body text
starts).

- Section vertical rhythm: generous — `py-24` mobile / `py-32` desktop
  minimum between major sections, consistent with a portfolio that wants
  content to breathe.

## Recurring motifs (component inventory)

Build each as a small, isolated primitive in `components/ui/`, used
sparingly (brief: "2-3 per section, never all together"). `GridOverlay` is
also used as the muted header decoration on case study pages (see above);
the rest stay out of case study bodies:

- `GridOverlay` — absolutely-positioned SVG/CSS background of thin lines at
  `--color-grid-border`.
- `Crosshair` — small SVG decorative mark, positioned at section corners.
- `MonoLabel` — coordinate/timestamp/code-style small text (e.g. `N43.28 W72.01`,
  `SIG-004`), purely decorative, `aria-hidden="true"` since it carries no
  information.
- `Barcode` — decorative SVG barcode pattern.
- `WireframeIcon` — static, low-cost SVG version of the sphere motif, used
  as a recurring icon outside the hero (e.g. footer, section markers) where
  a full WebGL sphere would be overkill.

All of the above are **decorative only** — always `aria-hidden`, never the
sole carrier of information, never inside `/work/[slug]` body content.

## Hero: wireframe sphere

Implementation: react-three-fiber (see [ARCHITECTURE.md](./ARCHITECTURE.md)).

- Continuous slow idle rotation (single axis or slight compound rotation,
  low angular speed — this is ambient, not attention-grabbing). The design
  file's own `rotationSpeed` control defaults to `0.22` — use that as the
  starting value and tune to taste rather than guessing a speed from scratch.
- Mouse parallax: subtle camera/group offset following pointer position,
  clamped to a small range, eased (not 1:1 tracking).
- Surrounding technical data labels (`MonoLabel` instances) positioned
  around the canvas — static or with minimal independent motion.
- **Must** pause idle rotation and disable parallax when
  `prefers-reduced-motion: reduce` is set — replace with a static render of
  the sphere at rest.
- **Must** have a static SVG/CSS fallback for browsers without WebGL
  (rare, but a portfolio evaluated by a hiring manager is not the place to
  show a blank canvas).
- Canvas is lazy-loaded (`next/dynamic`, `ssr: false`) and code-split so it
  never blocks first paint of the headline/CTA text, which must render
  immediately even before the 3D scene mounts.

## Microinteractions

| Element                                              | Interaction                                                                                                                                                                                                       | Implementation note                                                                                                                                                                                                                                                        |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Primary CTA button (e.g. hero "Case Studies & Work") | **Default:** outlined — accent-colored border + accent-colored text, transparent/`--color-bg` fill. **Hover/focus/active:** fills solid with `--color-accent`, text switches to dark (`--color-bg`) for contrast. | Confirmed state mapping from the design file (it was iterated on directly with Hernán — outline-by-default was the final preferred direction over filled-by-default). Implement as a CSS transition on `background-color`/`color`/`border-color`, not a swapped component. |
| Secondary buttons / nav links                        | Text wraps in brackets on hover/focus: `work` → `[ work ]`                                                                                                                                                        | Pure CSS: pseudo-elements holding `[`/`]`, opacity/transform transition. No layout shift — reserve the space at rest with `visibility:hidden` characters or fixed padding.                                                                                                 |
| Text links (in-body)                                 | Lime underline draws left-to-right on hover/focus                                                                                                                                                                 | CSS `background-image` or `::after` scaled via `transform: scaleX()` from `transform-origin: left`.                                                                                                                                                                        |
| Project cards                                        | Same bracket/underline language + subtle lift (shadow or border brightening)                                                                                                                                      | Keep consistent with buttons — one interaction language, not a bespoke card animation.                                                                                                                                                                                     |
| Contact form fields                                  | Border brightens to `--color-grid-border` → accent on focus                                                                                                                                                       | Standard focus-visible treatment, must meet keyboard-focus requirements (see a11y below).                                                                                                                                                                                  |
| Section entrance on scroll                           | Fade + slide-up (short distance, ~16–24px), no bounce/spring overshoot                                                                                                                                            | Motion (`motion/react`) `whileInView`, `once: true`. Duration ~400–500ms, `ease-out`.                                                                                                                                                                                      |
| Hero sphere                                          | Idle rotation + mouse parallax                                                                                                                                                                                    | See above.                                                                                                                                                                                                                                                                 |

**Explicitly avoid** (per brief): animation firing on every scroll tick,
stacking multiple simultaneous effects on one element, heavy/laggy parallax.
All hover/focus microinteractions must also trigger on **keyboard focus**,
not just mouse hover — this is a functional requirement, not a nice-to-have,
since the brief requires keyboard navigability.

## Grain/texture

Applied only in hero, footer, and main titles (per brief — not globally).
Implementation: a single reusable `Grain` primitive — an SVG `feTurbulence`
filter or a small tiling noise PNG as a `background-image`, absolutely
positioned, `mix-blend-mode: overlay`, low opacity (~4–6%), `aria-hidden`,
`pointer-events: none`. One implementation, reused in the 2–3 places it's
allowed — do not hand-roll it per section.

## Accessibility notes specific to this system

- Grid lines, crosshairs, mono labels, barcode, grain: all decorative,
  always `aria-hidden="true"`, never convey information non-visually.
- The dark background + off-white/lime palette generally gives strong
  contrast; the risk called out in the brief is specifically **small lime
  text** — enforce the contrast rule above rather than relying on "it looks
  fine."
- Respect `prefers-reduced-motion` in one shared hook/utility
  (`useReducedMotion` from Motion, or a small custom media-query hook),
  applied consistently to: hero sphere, scroll-entrance transitions, hover
  microinteractions with movement (underline draw can stay, since it's not
  vestibular-triggering; sphere rotation and slide-up transitions must
  respect it).
