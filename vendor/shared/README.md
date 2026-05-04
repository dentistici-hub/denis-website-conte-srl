# Components — Reference Library

Astro component library used as the source-of-truth for the industry starters.
Every component is props-driven and has no domain-specific hardcoded text.

These files are NOT imported directly by a client site. The builder agent copies
the component it needs into the client's starter at build time (see design spec
section 4.4). Symlinks, npm linking, or workspace configs are explicitly
out of scope.

---

## Expected environment

A component from this library runs inside an Astro project (a starter or a
client) that satisfies two contracts:

### 1. Design-token contract

Every starter's `src/styles/tokens.css` must define every CSS custom property
a component references. The reference token set is:

```css
:root {
  /* Base colors */
  --color-bg: ...;
  --color-bg-elevated: ...;
  --color-bg-card: ...;
  --color-fg: ...;
  --color-fg-muted: ...;
  --color-fg-faint: ...;

  /* Accent — all four are required even if they duplicate each other */
  --color-accent: ...;
  --color-accent-hover: ...;
  --color-accent-dark: ...;
  --color-accent-secondary: ...;

  --color-border: ...;

  /* Typography */
  --font-display: ...;
  --font-body: ...;

  /* Spacing / z-index / easing / line-height tokens — see any starter tokens.css */
}
```

A component that uses `--color-accent-dark` does NOT assume you're in the
construction starter. If you copy a component into a starter that doesn't
define a given token, define it before use (alias to `--color-accent` if
nothing better exists).

### 2. Scripts contract

Components that animate import from `../../scripts/*`. When the component
file sits at `src/components/<category>/<Name>.astro`, that path resolves
to `src/scripts/<Name>.ts`. The following scripts must exist in a starter
that uses the relevant components:

| Script | Needed by |
|---|---|
| `scripts/gsap-init.ts` | `preloaders/PreloaderLogo`, anything using GSAP tweens |
| `scripts/preloader.ts` | `preloaders/PreloaderCharacter`, `preloaders/PreloaderLogo` |
| `scripts/cursor.ts` | `decorative/CustomCursor` |
| `scripts/hero-webgl.ts` | `heroes/HeroImmersive` |
| `scripts/scroll-animations.ts` | most components with `data-animate` |
| `scripts/smooth-scroll.ts` | Lenis-based starters (tech, restaurant) |

All starters under `Website/starters/*/src/scripts/` ship with the subset
they need. If you copy a component into a starter that is missing its
script dependency, copy the script too.

### 3. Animation presets

Scroll-triggered and interactive animations live in `components/animations/`
as a standalone module: `animations.ts` + `animations.css`. A starter imports
`initAnimations()` ONCE (from its layout or from the existing
`scripts/scroll-animations.ts`) and components opt in per-element via
`data-anim="fade-up"`, `data-anim="clip-reveal"`, `data-anim="stagger"`, etc.
See `components/animations/README.md` for the full preset list, data
attributes, and starter adoption status. The module respects
`prefers-reduced-motion` in every animated path and has zero external deps,
so it's safe to import into any starter without affecting bundle size beyond
a few KB.

---

## Props discipline

Rules for any new or edited component in this library:

1. **No domain names.** Never hardcode "Marchetti", "Rossi", "Acme", a specific
   city, or an industry-specific label (e.g. "Lunch 12:30-14:30",
   "Practice Areas"). Make them props with neutral defaults.

2. **Example values in form placeholders are fine.** An `<input placeholder="Mario Rossi">`
   is not a leak — it is the input's example value. But don't put "Mario Rossi"
   in an `<h3>` or in rendered content.

3. **Phone numbers, URLs, emails.** Always props. Never baked in.

4. **Optional blocks.** When a section is industry-specific (e.g. the hours
   block in `FooterRich`), render it only when the prop is present, not with
   a hardcoded fallback that looks real.

5. **Typed props interface.** Every component exports `interface Props` in
   its frontmatter. Import shared types from `../../types/content.ts`.

6. **No placeholder images in default render.** If a component has an image
   slot, the slot must accept a URL via props. Demo content belongs in the
   starter's `placeholder.ts`, not in the component.

---

## Adding a new component

1. Pick the right category folder (or create one).
2. Write the component with a typed `Props` interface and sensible defaults.
3. Verify it uses only tokens from the reference set above.
4. If it pulls a script, add a row to the Scripts contract table here.
5. Do NOT add it to a starter automatically — starters are updated manually
   when a component is worth promoting.

---

## Updating an existing component

The `components/` folder is canonical. Each starter has its own copy at
`starters/<name>/src/components/<category>/<Name>.astro`. Changes here do
NOT auto-propagate. Treat the starter copies like a dependency bump:
update the starter when the improvement is worth pulling in.

Client sites at `clients/[slug]/` are frozen at build time and never
receive component updates unless Denis explicitly triggers a revision via
`revise <slug>`.
