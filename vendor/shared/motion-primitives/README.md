# Motion Primitives

20 reusable design components + 1 pattern doc that give the builder a real toolbox for award-grade sites. Every component respects `prefers-reduced-motion`, degrades gracefully, and is documented inline with a "when to use / when not to" rule.

Organized by tier:

- **Tier 1** — scroll choreography (8)
- **Tier 2** — layout moves (6)
- **Tier 3** — imagery + scene rendering (6)
- **Patterns** — recipes that live in a layout, not a component (1)

---

## Prerequisites

Each starter ships with these npm deps as of Session 1. If you inherit an older starter, install:

```bash
npm install gsap@^3.14.2 lenis@^1.3.21 lottie-web@^5.13.0
```

The starter's `astro.config.mjs` needs a `vite.resolve.alias` block so these resolve from `node_modules` when imported by components living outside the starter. Copy the `motionAliases` block from any existing starter config.

---

## Import path

```astro
---
import ScrollPinSection from '@components/motion-primitives/ScrollPinSection.astro';
import Marquee from '@components/motion-primitives/Marquee.astro';
import LottiePlayer from '@components/motion-primitives/LottiePlayer.astro';
---
```

---

## Tier 1 — scroll choreography

| Component | Purpose | Best for |
| :--- | :--- | :--- |
| `ScrollPinSection` | Pins a section, drives `--progress` 0→1 on scroll | hero that animates, signature service "scene" with internal reveals |
| `HorizontalScrollTrack` | Vertical scroll → horizontal translate of a track of cards | portfolio grids, process steps, case-study rows |
| `ScrollScenePan` | Pans one wide SVG/image horizontally through a pinned section | "world map" service tour, signature illustration |
| `ScrollVideoScrub` | Scroll drives video `currentTime` (or numbered-frame sequence for iOS) | product reveals, narrative sequences, before/after |
| `ParallaxLayer` | Scroll-driven transform (x/y/scale/rotate) on any element | background drift, image scaling as you pass, asymmetric flow |
| `ClipMaskReveal` | Clip-path wipe reveal on viewport entry (6 directions + circle/iris) | hero images, quote cards, editorial photos |
| `MagneticButton` | CTA that drifts toward cursor with spring physics | THE primary CTA — max one per page |
| `TextScramble` | Character randomization settling onto final text, on hover or view | eyebrows, display headlines, CTA labels |

## Tier 2 — layout moves

| Component | Purpose | Best for |
| :--- | :--- | :--- |
| `Marquee` | Infinite-loop horizontal ticker (CSS keyframes, zero JS) | trust logos, tagline bands, "since 1998 — " repeaters |
| `NumberedChapter` | Oversized numeral + sticky chapter label | service lists, process steps, editorial sections |
| `DragGallery` | Cursor-grab horizontal scroll with momentum | portfolio strips, gallery rows where user explores |
| `IconPillCTA` | Label pill + bordered icon pill sibling | primary CTA, "say hey" nav button, form submit |
| `SplitScreen` | 50/50 with one sticky half + one scrolling half | about + case studies, hero + paragraph, services + visual |
| `ColorFloodScroll` | Page bg/fg shifts per section via IntersectionObserver | multi-chapter stories, brand-phase narrative, color-voiced rooms |

## Tier 3 — imagery + scene rendering

| Component | Purpose | Best for |
| :--- | :--- | :--- |
| `LottiePlayer` | Lottie JSON playback, viewport-triggered, reduced-motion aware | animated icons, hero illustrations, loading states |
| `DuotonePhoto` | CSS blend-mode duotone (2 brand colors over greyscale) | stock photos repainted in brand palette |
| `KenBurnsImage` | Slow pan-and-zoom loop on a still image (CSS only, zero JS) | hero stills, section dividers, atmospheric imagery |
| `CutoutImage` | Transparent-bg image wrapper with optional drop-shadow + glow | product shots on colored bg, isolated team portraits, floating objects |
| `ShaderCanvas` | WebGL shader canvas — default shader OR custom fragment + custom vertex + arbitrary uniforms | signature hero backgrounds, animated gradients, flow fields, bespoke 2D effects |
| `InteractiveThreeScene` | Scaffold for custom Three.js scenes: canvas + RAF + pointer + scroll velocity + SPA-safe disposal (user brings Three.js) | orbiting geometry, pinned 3D figures, particle fields, scroll-driven 3D product showcases |

## Patterns

| File | Purpose | Best for |
| :--- | :--- | :--- |
| `PersistentLayoutSlot.md` | Recipe for SPA-persistent components that survive `astro:before-swap` (copy into BaseLayout) | continuous shader canvas across routes, shared custom cursor, background audio |

---

## Usage recipes

### Hero with pinned scene + parallax background

```astro
<ScrollPinSection distance="200vh">
  <ParallaxLayer y={0.5} class="hero-bg">
    <img src={withBase('/images/hero-bg.jpg')} alt="" />
  </ParallaxLayer>
  <div class="hero-content" style="transform: translateY(calc(var(--progress, 0) * -40vh))">
    <h1>Display headline</h1>
  </div>
</ScrollPinSection>
```

### Portfolio that scrolls horizontally

```astro
<HorizontalScrollTrack gap="clamp(1rem, 3vw, 3rem)">
  {projects.map((p) => (
    <article class="card" style="flex: 0 0 60vw;">
      <img src={withBase(p.image)} alt={p.title} />
      <h3>{p.title}</h3>
    </article>
  ))}
</HorizontalScrollTrack>
```

### Services-as-world-map (First Internet pattern)

```astro
<ScrollScenePan
  src={withBase('/images/services-world.svg')}
  alt="Our services illustrated as districts"
  distance="400vh"
  stops={[
    { at: 0.12, label: 'Strategy' },
    { at: 0.38, label: 'Design' },
    { at: 0.63, label: 'Build' },
    { at: 0.90, label: 'Launch' },
  ]}
/>
```

### Brand-colored stock photo

```astro
<DuotonePhoto
  src={withBase('/images/team-in-office.jpg')}
  alt="Our team working"
  shadow="#0B1A2E"
  highlight="#F6F8FB"
  aspectRatio="4 / 5"
/>
```

### Signature CTA: magnetic + scramble + icon pill

```astro
<MagneticButton href="/contatti">
  <IconPillCTA href="/contatti" variant="pill" icon="arrow-up-right">
    <TextScramble trigger="hover">Richiedi un incontro</TextScramble>
  </IconPillCTA>
</MagneticButton>
```

(Actually simpler: pick one. Don't stack all three — use `IconPillCTA` for the visual structure, wrap in `MagneticButton` for the spring, drop the scramble unless the concept really calls for it.)

### Multi-chapter page with color flood

```astro
<ColorFloodScroll defaultBg="#F5EFE0" defaultFg="#141414" />

<section data-flood-bg="#FA4E03" data-flood-fg="#FFFBEF">
  <h2>Orange chapter</h2>
</section>

<section data-flood-bg="#0B1A2E" data-flood-fg="#F6F8FB">
  <h2>Navy chapter</h2>
</section>

<section>
  <h2>Default chapter (reverts to bg/fg)</h2>
</section>
```

### Hero shader (default)

```astro
<ShaderCanvas
  colors={['#0B1A2E', '#1E5F99', '#F6F8FB']}
  height="100vh"
  mouseReactive
/>
```

### Custom shader with arbitrary uniforms

```astro
---
const weaveFrag = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_cursor;
  uniform float u_density;
  uniform vec3 u_threadColor;
  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float g = sin(uv.x * u_density) * cos(uv.y * u_density);
    vec3 col = u_threadColor * (0.4 + 0.6 * g);
    gl_FragColor = vec4(col, 1.0);
  }
`;
---
<ShaderCanvas
  fragment={weaveFrag}
  uniforms={{ u_density: 220.0, u_threadColor: [0.45, 0.35, 0.28] }}
  height="80vh"
/>
```

### Scroll-scrubbed video (hero or product reveal)

```astro
<ScrollVideoScrub
  src="/videos/product-hero.mp4"
  poster="/videos/product-hero.jpg"
  distance="500vh"
/>

<!-- iOS-safe frame-sequence fallback -->
<ScrollVideoScrub
  mode="frames"
  src="/scroll-frames/atelier/"
  totalFrames={60}
  framePattern="{index}.jpg"
  distance="400vh"
/>
```

### Interactive Three.js scene (orbital sphere, pinned figure, etc.)

```astro
<InteractiveThreeScene id="hero-sphere" height="100vh" scrollCoupled pinned>
  <script type="module">
    import { registerThreeScene } from '@components/motion-primitives/scene-registry.ts';
    import * as THREE from 'three';

    registerThreeScene('hero-sphere', ({ canvas, onFrame, onDispose, getMouse, getScroll }) => {
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.z = 5;
      const mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1, 5),
        new THREE.MeshNormalMaterial({ wireframe: true })
      );
      scene.add(mesh);

      onFrame(({ elapsed, delta }) => {
        const [mx, my] = getMouse();
        const scroll = getScroll();
        mesh.rotation.x = my * Math.PI;
        mesh.rotation.y = mx * Math.PI * 2 + (scroll?.progress ?? 0) * Math.PI;
        renderer.render(scene, camera);
      });

      onDispose(() => {
        renderer.dispose();
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
    });
  </script>
</InteractiveThreeScene>
```

Three.js is NOT bundled by the primitive — `import * as THREE from 'three'` resolves to whichever version the starter ships. Tech starter has it; other starters need `npm install three@^0.183.2`.

### Persistent scene across routes

When a scene should not reset on nav, wrap its container with `transition:persist` and place it OUTSIDE `<slot />` in BaseLayout. Full recipe at `PersistentLayoutSlot.md`.

### Numbered services

```astro
<NumberedChapter index="01" label="Strategy" sticky>
  <h3>Figure out what the business actually needs</h3>
  <p>The part where we ask the questions nobody asked before.</p>
</NumberedChapter>

<NumberedChapter index="02" label="Design" sticky>
  <h3>Make it feel inevitable</h3>
  <p>...</p>
</NumberedChapter>
```

---

## Rules of use — don't over-apply

**One signature scroll pattern per page.** Pick one:
- `ScrollPinSection` with internal progression
- `HorizontalScrollTrack`
- `ScrollScenePan`

Never combine two of these. It reads as showing off.

**One primary CTA per page gets the full treatment** (magnetic, scramble, icon-pill). Secondary CTAs stay quiet.

**Parallax is background-only.** Don't parallax body copy — users lose context.

**Clip-mask reveal is for images and single-statement sections** — not every paragraph.

**ColorFloodScroll maxes at 3-4 color zones per page.** More than that = disorienting.

**KenBurnsImage only on heroes or large imagery.** Too subtle to notice on thumbnails.

**ShaderCanvas only on one section per page** — typically the hero. Multiple shader canvases fight for GPU.

---

## Accessibility

Every primitive:

- Respects `prefers-reduced-motion: reduce` (renders final state or pauses animation)
- Falls back to native horizontal scroll on `HorizontalScrollTrack` / `DragGallery` when reduced motion is requested
- Disables `MagneticButton` and `DragGallery` drag physics on touch-only devices
- Uses `will-change: transform` only on elements that actively animate

---

## Asset pipeline integration

The asset-gatherer agent (`.claude/agents/asset-gatherer.md`) knows which primitives expect which assets:

- `ScrollScenePan` → wide SVG (≥3000px) in `scene-pan` slot
- `ScrollVideoScrub` (video mode) → MP4 in `hero-video` slot; (frames mode) → numbered JPEGs in `scroll-frames` slot
- `LottiePlayer` (stock) → Lottie JSON via Lottiefiles tier; (bespoke) → `lottie-bespoke` slot, manual-assets only
- `CutoutImage` → transparent PNG (client-supplied or Pollinations generation)
- `ShaderCanvas` (custom GLSL) → `custom-glsl` slot, manual-assets only (fragment source file)
- `InteractiveThreeScene` → `three-glb` slot for rigged models, manual-assets only (.glb)
- `HeroVideo` (standalone hero component, not a primitive) → Pexels Videos tier

Tier 0 for ALL slots: `clients/[slug]/manual-assets/` wins over any auto-sourcing. Denis-supplied real assets always beat scraped/stock/AI-gen.

If your build uses one of these, tell the gatherer via `design.component_overrides` in brief.json. It will populate the right slot and flag missing assets rather than silently downgrading. For special slots (`three-glb`, `custom-glsl`, `scroll-frames`, `lottie-bespoke`), there is no auto-source tier — they come from manual-assets or the slot flags `needs_denis: true`.

---

## Interop with existing animation system

`../animations/animations.ts` and `animations.css` (the IntersectionObserver-based system with `data-anim="fade-up"`, etc.) continues to work. The two systems are complementary:

- Use `data-anim="..."` for simple fade-in reveals — zero JS beyond the shared init.
- Use motion-primitives for scroll-driven state, pins, spring physics, or GSAP-scheduled choreography.

Don't wrap `data-anim` elements in motion-primitives — pick one.

---

## Debugging

GSAP's ScrollTrigger has a `markers: true` flag useful during dev. We don't expose it on components by default. To enable temporarily for debugging:

```ts
// In the component's <script>:
ScrollTrigger.create({
  // existing config
  markers: import.meta.env.DEV,
});
```

Lottie-web prints a cosmetic warning about `eval` usage in the bundle. It's the library's own code (not ours), known, and does not break anything.
