# PersistentLayoutSlot — pattern for SPA-persistent components

Not a primitive. A recipe for components that must live longer than a
single page in an Astro SPA.

Astro's ClientRouter (View Transitions API) swaps `<main>` on navigation
while keeping `<head>` and anything you mark as persistent in the layout
shell. This doc explains how to build components that exploit that shell
so they never tear down mid-session — expensive canvases, global cursors,
background audio, ambient scenes.

---

## When to use

- A canvas with an expensive scene (Three.js, complex shader, particle
  system) that should continue playing across `/about` → `/services`
  without a visible reset
- A global custom cursor whose transform and trail must not snap back
  to origin on every nav
- A background audio player or ambient sound loop
- A shared dev-only measurement HUD or perf overlay
- A persistent video element whose current time must survive page swaps

## When NOT to use

- Anything that should reset per page (page-scoped heroes, form state,
  per-page animations) — put it inside the `<slot />` and let Astro
  destroy it on swap
- Anything that needs route-specific props at mount time — persistent
  elements cannot re-read `Astro.url` after their first render, so they
  must be either route-agnostic or update themselves from DOM data
  attributes on `astro:page-load`
- Small, cheap widgets — the pattern has real costs (lifecycle
  discipline, leak-hunting, harder mental model). If the widget mounts
  in under 5ms, let Astro destroy and rebuild it.

---

## The three requirements

1. **Physical location**: OUTSIDE the `<slot />` in `BaseLayout.astro`.
   Anything inside `<slot />` is part of `<main>` and gets replaced.
2. **Persist directive**: `transition:persist` (Astro's native directive)
   or the lower-level `data-astro-persist="id"`. Without it Astro's
   ClientRouter discards the node even if it's outside `<slot />`.
3. **Lifecycle**: init once per session, rebind observers on
   `astro:page-load`, teardown per-page hooks on `astro:before-swap`,
   dispose on `beforeunload`.

Fail any one of the three and the pattern breaks silently — either the
element re-mounts per page (wasted work), or it leaks DOM references
into the replaced `<main>` (memory grows forever), or it never
re-subscribes to new page content (animations stop triggering).

---

## Full working example

A persistent fullscreen canvas running a subtle background shader. It
renders once, keeps rendering through every nav, updates its pointer
target from the new `<main>` on each page load, and tears down cleanly
when the tab closes.

```astro
---
// src/layouts/BaseLayout.astro (excerpt)
const { title } = Astro.props;
---
<html lang="en">
  <head>
    <title>{title}</title>
    <!-- ClientRouter import here -->
  </head>
  <body>
    <!-- 1. PHYSICAL LOCATION: outside <slot />, direct child of <body> -->
    <!-- 2. PERSIST DIRECTIVE: transition:persist keeps this node alive -->
    <div id="persistent-background" transition:persist aria-hidden="true">
      <canvas id="bg-canvas"></canvas>
    </div>

    <slot />

    <!-- 3. LIFECYCLE: this <script> is hoisted and runs once per session -->
    <script>
      // Module-scoped state survives astro:before-swap because the parent
      // container is transition:persist. Astro will NOT re-execute this
      // module on navigation.

      type Ctx = {
        canvas: HTMLCanvasElement;
        gl: WebGL2RenderingContext;
        pointer: { x: number; y: number };
        observers: IntersectionObserver[];
      };

      let ctx: Ctx | null = null;
      let rafId = 0;
      let running = false;

      function init() {
        if (ctx) return; // idempotent — guards against double-init
        const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement;
        if (!canvas) return;
        const gl = canvas.getContext('webgl2');
        if (!gl) return;

        // ...compile shaders, upload geometry, allocate buffers...

        ctx = {
          canvas,
          gl,
          pointer: { x: 0.5, y: 0.5 },
          observers: [],
        };
        running = true;
        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('pointermove', onPointer, { passive: true });
        tick();
      }

      function resize() {
        if (!ctx) return;
        const dpr = Math.min(window.devicePixelRatio, 2);
        ctx.canvas.width = window.innerWidth * dpr;
        ctx.canvas.height = window.innerHeight * dpr;
        ctx.gl.viewport(0, 0, ctx.canvas.width, ctx.canvas.height);
      }

      function onPointer(e: PointerEvent) {
        if (!ctx) return;
        ctx.pointer.x = e.clientX / window.innerWidth;
        ctx.pointer.y = e.clientY / window.innerHeight;
      }

      function tick() {
        if (!running || !ctx) return;
        // ...draw frame, upload uniforms from ctx.pointer...
        rafId = requestAnimationFrame(tick);
      }

      function onPageLoad() {
        if (!ctx) return;
        // Rebind DOM observers that point at new <main> content.
        // The canvas itself keeps rendering; only per-page wiring changes.
        ctx.observers.forEach((o) => o.disconnect());
        ctx.observers = [];

        document.querySelectorAll('[data-bg-tint]').forEach((el) => {
          const io = new IntersectionObserver((entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                const tint = (entry.target as HTMLElement).dataset.bgTint;
                // push tint to shader uniform
              }
            }
          });
          io.observe(el);
          ctx!.observers.push(io);
        });
      }

      function onBeforeSwap() {
        if (!ctx) return;
        // Disconnect observers pointing at the OLD <main>. They'd
        // otherwise hold references to DOM nodes about to be discarded,
        // leaking memory on every nav.
        ctx.observers.forEach((o) => o.disconnect());
        ctx.observers = [];
        // Do NOT dispose ctx.gl — the canvas persists across the swap.
      }

      function onUnload() {
        running = false;
        cancelAnimationFrame(rafId);
        if (ctx) {
          ctx.observers.forEach((o) => o.disconnect());
          // Release GL resources
          const loseCtx = ctx.gl.getExtension('WEBGL_lose_context');
          loseCtx?.loseContext();
        }
        ctx = null;
      }

      // astro:page-load fires after every navigation, including first load.
      // init() is idempotent so this handles both cases.
      document.addEventListener('astro:page-load', () => {
        init();
        onPageLoad();
      });
      document.addEventListener('astro:before-swap', onBeforeSwap);
      window.addEventListener('beforeunload', onUnload);
    </script>

    <style is:global>
      #persistent-background {
        position: fixed;
        inset: 0;
        z-index: -1;
        pointer-events: none;
      }
      #persistent-background canvas {
        width: 100%;
        height: 100%;
        display: block;
      }
    </style>
  </body>
</html>
```

The script body runs once per full page load (or cold cache start).
Every navigation after that fires `astro:before-swap` then
`astro:page-load`, but the `<script>` itself is not re-executed — the
same module-scoped `ctx` is reused.

---

## Lifecycle cheatsheet

| Event | Fires when | What your handler should do |
| :--- | :--- | :--- |
| module init (once) | First page load | Declare state, register event listeners, but DON'T touch the DOM yet — the ClientRouter may not have wired up |
| `astro:page-load` | After every navigation, including first | Call `init()` (idempotent) then rebind observers to new `<main>` |
| `astro:before-swap` | Before `<main>` is replaced | Disconnect observers tied to old `<main>`. Save any state you need to carry over. Do NOT touch the persistent element itself |
| `astro:after-swap` | After new `<main>` is in DOM, before `page-load` | Rarely needed — use `page-load` unless you need to mutate the swapped DOM before it paints |
| `beforeunload` | Tab close or full page reload | Dispose GPU resources, stop RAF, null out refs |

`astro:page-load` has a useful guarantee: it fires on first load too, so
you don't need separate cold-start logic. An idempotent `init()` plus a
`page-load` listener is the whole pattern.

---

## Common mistakes

**Putting the persistent element INSIDE `<slot />`.** The `<slot />`
renders whatever page is currently active, and that's exactly what
ClientRouter replaces on nav. Anything inside gets destroyed regardless
of `transition:persist`. The directive only works on elements that are
part of the layout shell, not the swapped content. Fix: move the
element up, outside `<slot />`.

**Re-initializing on every `astro:page-load` without a guard.**
```js
document.addEventListener('astro:page-load', () => {
  const canvas = document.getElementById('bg-canvas');
  const gl = canvas.getContext('webgl2'); // new context every nav!
  requestAnimationFrame(tick);            // duplicate RAF loop!
});
```
You end up with N render loops running in parallel after N navigations,
each drawing over the others. Fix: guard with `if (ctx) return;` at the
top of `init()`.

**Forgetting `transition:persist`.** Even if the element is outside
`<slot />`, Astro's ClientRouter diffs the shell and may replace
mismatched nodes. Without `transition:persist` (or
`data-astro-persist="id"`), nothing guarantees the node survives. Fix:
always add the directive to persistent elements.

**Holding DOM references into old `<main>` past `astro:before-swap`.**
Classic leak:
```js
let currentHero = null;
document.addEventListener('astro:page-load', () => {
  currentHero = document.querySelector('.hero'); // old ref never released
});
```
After 100 navs, `currentHero` has pointed at 100 different DOM trees,
and the first 99 are kept alive because of that one reference, plus
any observers/listeners you attached to them. Fix: null out refs in
`astro:before-swap`, reacquire in `astro:page-load`. Same for
`IntersectionObserver`, `ResizeObserver`, `MutationObserver` — disconnect
before swap, recreate after.

**Using `document.querySelector` during module init before ClientRouter
is ready.** The script may run before `<body>` children are fully
parsed depending on script loading mode. If you touch the DOM at module
top-level, you may get `null`. Fix: do all DOM work inside the
`astro:page-load` handler (which is guaranteed to fire after the DOM is
ready), not at module scope.

**Registering `beforeunload` inside `astro:page-load`.** That re-adds
the listener on every nav, so by the 10th page you have 10 teardown
handlers firing on close. Fix: register window-level listeners once at
module scope, only register per-page listeners inside `page-load`.

**Assuming `transition:persist` carries inline styles set by the old
page.** It preserves the DOM node, not arbitrary state set by page-level
scripts. If `/about` did `element.style.opacity = '0.5'`, that style
survives the swap. Usually what you want — but surprising if you expect
each page to start from a clean visual state. Fix: reset transient
style in `astro:page-load` if you need per-page defaults.

---

## Interactions with `InteractiveThreeScene`

If you want an `InteractiveThreeScene` (the Three.js primitive) to
persist across navigations:

1. Wrap its output div with `transition:persist` in `BaseLayout.astro`.
2. Move the wrapper outside `<slot />`.
3. Give it a stable `id` so the scene registry keys on the same value
   across navigations.

The primitive's SPA-disposal logic fires on `astro:before-swap` as
usual, but its scene registry is idempotent: if a user's persistent
`<script>` (or the wrapper's own init path) tries to re-register the
same id, the registry upgrades the existing scene rather than tearing
down and recreating it. You get a single long-lived scene across the
whole session.

Note: if your use case needs the scene registry to behave differently
for persistent vs page-scoped scenes (e.g. different dispose semantics,
different listener cleanup), flag it as a follow-up. Do NOT modify the
registry from a BaseLayout `<script>` — that's a primitive-level
change, not a pattern-level change.

---

## Debugging

**Confirm the canvas isn't refetched on nav.** In DevTools → Network,
filter by `canvas` or the persistent element's asset URLs. Navigate
between pages. You should see zero new requests for anything inside the
persistent container. If you see the canvas's underlying assets (shader
text files, images) refetched, the node is being destroyed and
recreated — check `transition:persist` and that the element lives
outside `<slot />`.

**Check init count.** Add at the top of `init()`:
```js
function init() {
  if (ctx) return;
  console.count('persistent-bg-init');
  // ...
}
```
Navigate around. The counter should log `persistent-bg-init: 1` exactly
once per session. If it increments per page, your guard isn't working
or the element is being recreated.

**Watch for RAF duplication.** Before `init()`:
```js
console.count('persistent-bg-tick-start');
```
If you're calling `tick()` from multiple places (both `init` and
`astro:page-load`), you'll see this counter climb every nav. Same root
cause as above — missing idempotency guard.

**Memory leak smoke test.** Open Chrome DevTools → Memory → take a heap
snapshot. Navigate through 10 pages. Take another snapshot. Compare —
retained size should be roughly flat. If it grows linearly with nav
count, you're holding refs into old `<main>` (usually observers or
event listeners on page-scoped elements, not disconnected in
`astro:before-swap`).

**Verify the persist directive took effect.** Inspect the element in
DevTools on page A. Navigate to page B. The element's DOM node
reference should still be identical (same `$0` after re-inspecting).
If Chrome shows a new node with the same contents, Astro replaced it —
`transition:persist` isn't on the right element or isn't being read.

---

## Minimal variants

**Persistent custom cursor** (no canvas, just a tracked div):
```astro
<div id="cursor-dot" transition:persist></div>

<slot />

<script>
  // Cursor position survives swap because the node does.
  // Rebind hover-zone observers on astro:page-load.
</script>
```

**Persistent background audio**:
```astro
<audio id="ambient" transition:persist loop src="/audio/ambient.mp3"></audio>

<slot />

<script>
  document.addEventListener('astro:page-load', () => {
    const audio = document.getElementById('ambient') as HTMLAudioElement;
    // audio.currentTime continues across navs — don't reset it
  });
</script>
```

**Persistent dev HUD** (only in dev builds):
```astro
{import.meta.env.DEV && (
  <div id="perf-hud" transition:persist>...</div>
)}
```

---

## Recap

Three rules, in order:

1. Live outside `<slot />`.
2. Wear `transition:persist`.
3. Init once, rebind per page, dispose on unload.

If a persistent component ever resets visibly on navigation, check
those three in order — that's where the break will be every time.
