# Animation presets

One-call animation library for starters and client sites. Pair `animations.ts`
(logic) with `animations.css` (styles). 11 presets, zero external dependencies,
respects `prefers-reduced-motion`.

## Usage

Import once in the starter's entry script (e.g. `src/scripts/scroll-animations.ts`
or the Astro layout):

```ts
import { initAnimations } from '../../components/animations/animations';
import '../../components/animations/animations.css';

initAnimations();
```

`initAnimations()` is idempotent. After client-side navigation (Astro view
transitions), call `initAnimations({ reinit: true })` to pick up new DOM nodes.

All presets are opt-in via `data-*` attributes on any element. Default duration
is `0.8s`; override per element with `data-anim-duration="1.2"` (seconds) and
`data-anim-delay="0.3"`.

## Scroll-triggered presets (one shared IntersectionObserver)

| Preset        | Attribute                          | Notes |
|---------------|------------------------------------|-------|
| `fade-up`     | `data-anim="fade-up"`              | Default 40px translate + opacity. Backward compatible with the legacy scroll-animations behavior. |
| `clip-reveal` | `data-anim="clip-reveal"`          | `inset()` reveal. Add `data-anim-variant="circle"` or `"diagonal"` for alternates. |
| `stagger`     | `data-anim="stagger"`              | Direct children enter sequentially via `--anim-index`. Adjust step via `--anim-stagger-step`. |
| `bounce-in`   | `data-anim="bounce-in"`            | Overshoot cubic-bezier on transform + fade. |
| `draw-svg`    | `data-anim="draw-svg"` on an SVG   | Auto-measures `getTotalLength()` on `<path>` / `<line>` / `<polyline>` / `<circle>` / `<rect>` / `<ellipse>` and animates `stroke-dashoffset` to 0. |

### Example

```html
<h2 data-anim="fade-up" data-anim-delay="0.1">Who we are</h2>

<div data-anim="stagger" class="grid">
  <article>Card 1</article>
  <article>Card 2</article>
  <article>Card 3</article>
</div>

<svg data-anim="draw-svg" viewBox="0 0 200 200">
  <path d="M20,20 L180,20 L180,180" fill="none" stroke="currentColor"/>
</svg>
```

## CSS-only presets (no JS tie-in needed)

| Preset            | Attribute                                   | Notes |
|-------------------|---------------------------------------------|-------|
| `hover-inversion` | `class="anim--hover-inversion"`             | Swaps `--color-bg` / `--color-fg` on hover + focus-visible. |
| `group-hover`     | `data-anim-group` on parent, `data-anim-group-child="slide\|scale\|fade\|rotate"` on children | Parent hover coordinates children. Works with focus-within. |

### Example

```html
<a class="anim--hover-inversion">Get in touch</a>

<article data-anim-group>
  <h3 data-anim-group-child="slide">Project name</h3>
  <img data-anim-group-child="scale" src="/cover.jpg" alt="">
  <p data-anim-group-child="fade">Read more</p>
</article>
```

## JS-driven presets (non-scroll)

These bind automatically on DOMContentLoaded via `initAnimations()`. They can
also be called individually (`initCounters()`, `initParallax()`,
`initCursorReactive()`, `initRotatingText()`) if only one is needed.

### `counter` — ticker

```html
<span data-anim-counter="900"
      data-anim-counter-suffix=" mq"
      data-anim-counter-locale="it-IT"
      data-anim-duration="1.8">0</span>
```

Options: `data-anim-counter-prefix`, `-suffix`, `-decimals`, `-locale`,
`data-anim-duration` (seconds, default 2). Fires when the element reaches 40%
visibility.

### `parallax` — depth layers

```html
<img src="/hero-bg.jpg" data-anim-parallax="0.4" alt="">
<div data-anim-parallax="-0.2">Foreground blob</div>
```

Speed factor: `1` ~= element moves with scroll, `0` ~= stays still, negative
values move the opposite direction. One shared rAF tick per scroll event.

### `cursor-reactive` — tilt / shift on mousemove

```html
<div data-anim-cursor="tilt" data-anim-cursor-strength="1.2">…</div>
<img data-anim-cursor="shift" src="/logo.svg" alt="">
```

Modes: `tilt` (default, rotateX/Y with perspective), `shift` (translateX/Y).
Auto-disabled on touch-only devices (`(hover: none)`).

### `rotating-text` — word cycling

```html
<h1>
  Siamo
  <span data-anim-rotating-text="capillari|efficienti|precisi"
        data-anim-rotating-interval="2.4">capillari</span>
  in Piemonte.
</h1>
```

Separator is `|`. Initial textContent should match the first word to avoid
flash. Interval defaults to 2.4 seconds.

## Accessibility

- Every animated path checks `prefers-reduced-motion: reduce` at runtime:
  scroll presets reveal instantly, counter jumps to final value, rotating-text
  shows only the first word, parallax + cursor-reactive are skipped entirely.
- `animations.css` also has a global `@media (prefers-reduced-motion: reduce)`
  block that neutralizes transitions, as a belt-and-braces safeguard.
- Cursor-reactive auto-disables on `(hover: none)` devices.

## Presets intentionally NOT included

| Preset              | Why it's not here |
|---------------------|-------------------|
| `split-text`        | Already handled via GSAP `SplitText` in `scripts/scroll-animations.ts`. |
| `physics-scroll`    | Handled via Lenis in `scripts/smooth-scroll.ts`. |
| `horizontal-scroll` | Needs GSAP `ScrollTrigger` pinning; out of scope for a dep-free module. |
| `page-transition`   | Needs Astro view transitions or a router — different layer. |

## Starter adoption (as of 2026-04-16)

Starters still use the legacy `scripts/scroll-animations.ts` fade-up. This
module is additive; a starter adopts it by importing `initAnimations()`
alongside (or in place of) the legacy script, then swapping `data-animate` on
the target section to the specific preset it needs.

Tracked adoption:

| Starter                | Uses this module? | Presets in play |
|------------------------|-------------------|-----------------|
| tech                   | not yet           | — |
| construction           | not yet           | — |
| restaurant             | not yet           | — |
| professional-services  | not yet           | — |
| clients/blue-marketing | not yet           | — |

Starter copies are bumped manually; see `components/README.md` for the rule.

## Files

- `animations.ts` — TypeScript module. Exports `initAnimations`, `initCounters`,
  `initParallax`, `initCursorReactive`, `initRotatingText`. Strict types, no `any`.
- `animations.css` — All CSS for the presets, plus reduced-motion fallbacks.
- `README.md` — this file.
