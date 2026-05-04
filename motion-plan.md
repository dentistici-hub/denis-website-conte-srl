# Motion Plan — Conte srl

Construction starter, charcoal + saffron palette, brutalist Archivo single-family,
medium intensity. Editorial-industrial register: signage, torque-spec sheet,
Camera di Commercio stamp — not a brochure, not an agency reel.

Direct precedent: Krefer 2026-05-03 (same starter / palette / signature pattern,
GREENLIGHT iter 1, rubric 8/1/0).
Direct timing precedent: AMB Turning 2026-05-04 (same "quiet/surgical" register
mapping committed: power3.out 700-900ms entrances, scrub smoothing 0.6, no
ornament easings).

**Register**: surgical, reserved, mechanical-precise. Implications: slower
entrances, quieter easings, NO bounce, NO back-overshoot, NO elastic, NO
character-level reveals on body copy. Type stays still; only the signature
moves.

---

## 1. Signature move — detailed spec

**Primitive**: `HorizontalScrollTrack` (Tier 1, motion-primitives/README.md L43)
**Placement**: between `services` (services-process numbered steps) and
`content` (Chi siamo) — section index 3 in section_order. NOT before services
(services-process introduces the diagnostic→consegna procedural language; the
signature track shows the actual chapters of that work).

**Treatment**: every chapter card wraps a `DuotonePhoto` (Tier 3, L67) in
charcoal `#15171A` shadow + saffron `#F4C430` highlight. Numerals 01–05
rendered via `NumberedChapter` (Tier 2, L56) with the numeral in saffron, the
chapter label in bone `#E8E6E1`, decorative steel-blue `#5B7A8C` 1px border on
each card.

**Chapter manifest** (all 5 image slots filled, validated against
asset-manifest.json `signature_chain`):

```
01  Diagnostica TEXA                    /images/service-tester-diagnostico-texa.jpg
02  Banco prova freni + opacimetro      /images/service-banco-prova-freni.jpg
                                          (alt: /images/service-opacimetro.jpg)
03  Revisione meccanica integrale       /images/service-revisione-meccanica.jpg
04  Tachigrafi digitali I3 044 1168     /images/service-tachigrafi.jpg
05  Interventi esterni                  /images/service-interventi-esterni.jpg
```

**Config**:
```
gap: clamp(2rem, 4vw, 4rem)
distance: 500vh           # 5 chapters × ~100vh per chapter
card flex-basis: 60vw     # 5 cards visible 1.6 at a time on desktop
scrub: true, smoothing 0.6
ease: power2.inOut        # straight, no overshoot
```

**Chapter 04 (load-bearing)**: gets the largest type weight in the track per
concept §2. The codice `I3 044 1168` appears as a saffron monospace inset
beneath the chapter label, 130% the type-size of chapters 01/02/03/05's
labels. This is the conversion lever for fleet auditors — it must be visually
distinct without breaking the track's grid.

**Card progression**: scroll-linked, no auto-advance, no parallax-within-card,
no card-level entrance stagger. Each card is a flat duotone plate that
translates horizontally in lockstep with the others. Anti-stack enforced.

**Reduced-motion fallback**: `HorizontalScrollTrack` natively falls back to a
horizontally-scrollable native scroller when `prefers-reduced-motion: reduce`.
User swipes / scrolls horizontally with the trackpad. Numerals stay,
DuotonePhoto stays (it's CSS blend-mode, not animation), labels stay.
No pin, no scrub. Reads as a static editorial chapter row.

**Why this config**: 500vh distance gives ~5s of scroll per chapter at typical
reading speed — enough to register the duotone photo, the number, the label,
and the I3 044 1168 codice on chapter 04. Smoothing 0.6 is the same value AMB
Turning committed for its "quiet/surgical" register; it produces controlled
deceleration without gummy lag. `power2.inOut` keeps the track from racing in
or out of motion at the chapter edges.

**Signature is buildable**: all 5 chapter slots filled in the manifest, no
`needs_denis` carryover from concept side, anti-stack rule respected (no
ScrollPinSection, no ScrollScenePan, no parallax layers competing). Logo
raster `needs_denis` is unrelated.

---

## 2. Section-by-section motion plan

Section order from `brief.json`: `["hero", "trust", "services", "content", "contact"]`.
Concept inserts `signature` (HorizontalScrollTrack) between services and
content, plus `marquee` (certifications) inside or just after the trust block.

```
hero (hero-stats variant)
  Motion: ClipMaskReveal on the stats band only (3 KPI counters: 25+ anni,
    I3 044 1168, 3 telefoni). Hero photo is a DuotonePhoto (red truck) — no
    motion on the photo itself, no Ken Burns drift, no parallax. Stats reveal
    on viewport entry from below (clip-path inset 0 0 100% 0 → 0 0 0 0),
    stagger between the 3 stats.
  Why: the photo is the anchor; KPIs do the work. Animating the photo would
    fight the brutalist register. ClipMaskReveal on the stats reads as a
    torque-spec sheet being uncovered — mechanical, deliberate.
  Reduced-motion: stats render in final state immediately; clip-path
    skipped. DuotonePhoto unaffected (CSS blend mode, not animation).

trust (trust-heritage variant)
  Motion: data-anim="fade-up" on the heritage block (25+ anni, Z.I. Ceglie
    Messapica address, Unioncamere badge text). One reveal, no chained
    children. The Centro Tecnico Tachigrafi badge gets a single ClipMaskReveal
    from the left (clip-path inset 0 100% 0 0 → 0 0 0 0) — reads as a stamp
    being applied.
  Why: this is the trust band. Motion must read as "official document
    arriving," not as choreography. Fade-up is the most restrained reveal on
    the shelf; ClipMaskReveal on the badge is the editorial accent.
  Reduced-motion: rendered static. data-anim presets respect the media query.

certifications-marquee (sub-block of trust, before signature)
  Motion: Marquee (Tier 2 L55), text-only ticker — Unioncamere I3 044 1168 /
    DM 10 agosto 2007 art. 2 lett. i / MCTC iscritto / Opacimetro omologato /
    repeat. Speed 50s/loop (slower than default 45s — the audience reads
    Italian regulatory text, not English headlines), pauseOnHover.
  Why: text-only marquee is the concept-correct trust band — concept §7
    explicitly rejects unlinked TEXA/Mercedes/Iveco logos. Slow, legible,
    reads as a regulatory ticker. Zero JS motion (CSS keyframe).
  Reduced-motion: Marquee component pauses animation; text is rendered
    static, all entries visible (or the first 2 entries visible with
    overflow-hidden — the user can see the source list in the footer-rich
    block anyway).

services (services-process variant — accetta veicolo → diagnostica TEXA →
                                       preventivo → intervento → consegna)
  Motion: data-anim="fade-up" with stagger on the 5 process steps. The
    oversized step numerals (01–05) use the type-system's display register
    via NumberedChapter rendering. NO sticky behavior — sticky on services-
    process would compete with the signature track that follows.
  Why: services-process introduces the procedural vocabulary that the
    signature track then PERFORMS. It must read as a programme, not as a
    feature itself. Plain fade-up with stagger is the right amount of motion
    — enough to acknowledge the steps as a sequence, not enough to compete
    with the signature.
  Reduced-motion: rendered static.

signature (HorizontalScrollTrack — see Section 1 detailed spec)
  Motion: pinned scroll, scrubbed horizontal translate, 5 chapters. Owns
    100% of the page's Tier-1 scroll-choreography budget.
  Why: see Section 1.
  Reduced-motion: native horizontal scroller (component handles it).

content (content-about variant — Chi siamo + Z.I. corridor narrative)
  Motion: KenBurnsImage on the atmospheric background photo (manifest slot
    `atmosphere` — workshop wall with Castrol oil and calendar). Direction:
    diagonal-drift, duration 32s, max scale 1.06, max translate ±2.5%. Body
    text gets a single data-anim="fade-up" on first paragraph, no further
    motion.
  Why: the about block is otherwise static — the workshop-wall background
    needs atmosphere to keep it from reading as a flat tile. KenBurns at 32s
    is slower than the typical 28s (concept register is reserved); drift
    stays under 3% so it reads as breathing not panning.
  Reduced-motion: KenBurns pauses (component handles it). Background photo
    static. Body unchanged.

contact (contact-split variant — 3 phones + 3 emails + map)
  Motion: NONE. Deliberate.
    EXCEPTION: the primary phone CTA (tel:+390831382539) wraps in
    MagneticButton — radius 100, strength 0.25 (lower than typical 0.4
    because the editorial register is reserved). This is the SINGLE
    MagneticButton site-wide.
  Why: contact is conversion-critical. The fleet manager who scrolled this
    far is reaching for the phone. Static contact info reads as
    "trustworthy"; animation reads as "still selling." The MagneticButton on
    just the primary CTA gives the moment of polish without theatricality.
    Secondary phones (333 7076796, 392 9100093) and emails stay flat.
  Reduced-motion: MagneticButton physics disabled (component handles
    touch + reduced-motion). CTA renders as a normal styled link.

footer (footer-rich)
  Motion: NONE. P.IVA, codice tecnico, hours, all phones, all emails — full
    audit trail. Static document register.
  Why: footers in the editorial-industrial register read as colophons.
    Animating a colophon is wrong on every level.
  Reduced-motion: N/A — already static.
```

**Sections with motion**: 6 of 7 (footer is deliberately zero).
**Sections deliberately motion-free**: contact (except the single
MagneticButton on the primary CTA), footer.

---

## 3. Interaction language (hover/click/drag micro-behaviors)

| Pattern | Where | Config |
| :--- | :--- | :--- |
| MagneticButton | primary phone CTA, contact section ONLY (single instance site-wide) | radius 100, strength 0.25 |
| (hover) link underlines | every nav link, every footer link, every body link | text-decoration-thickness 1px, offset 4px, color saffron on hover, 180ms ease-out |
| (hover) Marquee pause | certifications-marquee | pauseOnHover, native CSS via Marquee primitive |
| Default browser cursor | site-wide | NO CustomCursor. Concept §6 OUT list explicitly rejects it. |

**No CustomCursor** — concept §6 OUT list, B2B fleet operators on patchy 4G
in Puglia. Default cursor is a deliberate choice, not an oversight.

**No TextScramble** — concept §6 OUT list, "techy, agency-coded; this is an
officina, not a studio."

**No DragGallery** — would duplicate the signature HorizontalScrollTrack
affordance.

---

## 4. Rejections (motion we deliberately do NOT use)

Mirror of concept §6 OUT and §7, motion-specific lens:

- **No ScrollPinSection on hero or anywhere else** — anti-stack with the
  signature HorizontalScrollTrack. One scroll signature per page, full stop.
- **No ScrollScenePan** — no wide SVG asset in scope, and the page already
  has its scroll signature.
- **No ShaderCanvas** — concept §6 explicitly rejects it. Wrong era, wrong
  industry, agency-reel signal.
- **No CustomCursor** — concept §6 reject, audience uses default cursor on
  patchy 4G.
- **No HeroVideo or ScrollVideoScrub** — manifest videos[] is empty; no
  video sourced; concept didn't request one.
- **No CutoutImage** — no transparent product PNGs.
- **No DragGallery** — would duplicate the signature track affordance.
- **No TextScramble** — agency-coded; concept rejects it.
- **No ColorFloodScroll** — concept §6 reject. Single-chapter palette law;
  flooding would dilute saffron.
- **No ParallaxLayer on body content** — would fight brutalist signage
  register. Background-only parallax is also OUT here because the only
  "background" element with atmosphere (the about-section workshop wall)
  uses KenBurns instead.
- **No bounce / back / elastic / overshoot easings anywhere** — register is
  surgical, not playful.
- **No character-level reveals on body or headlines** — TextScramble
  rejected; no per-char fade-in or split-text choreography. Headlines arrive
  whole.
- **No preloader** — site is static + fast; preloader is ceremony.
- **No site-wide page transitions (Astro view-transitions or otherwise)** —
  Lenis is enough; transitions add latency without paying for it on a 1-route
  site (`/` only).
- **No multi-stage hero entrance** — concept §7 rejects "thumbs-up mechanic"
  staging; the motion equivalent is sequenced hero choreography. ClipMaskReveal
  on stats only; nothing else moves on hero.
- **No stagger above 0.06s on services-process** — the 5 procedural steps
  must read as a synchronized programme, not as a chained reveal.
- **No NumberedChapter sticky behavior on services** — would compete with
  the signature track's pin. Sticky is reserved for the signature.

---

## 5. Reduced-motion summary

A user with `prefers-reduced-motion: reduce` sees the editorial layout exactly
as concept §6 specifies — palette law intact, type hierarchy intact, all
chapter content present and legible. The signature `HorizontalScrollTrack`
becomes a natively horizontally-scrollable card row (the user swipes or
trackpad-scrolls left); duotone treatment, numerals, and chapter labels stay.
ClipMaskReveal on the hero stats and the trust badge collapses to "rendered
final state immediately." Marquee pauses. KenBurnsImage on the about
background pauses to a still frame. MagneticButton physics disable; the CTA
renders as a normal styled saffron pill. data-anim="fade-up" everywhere
collapses to "no animation, content visible." Typography stays the anchor —
Archivo Narrow over the I3 044 1168 codice still carries the editorial voice
without motion. The site's argument doesn't depend on animation; the motion
is decoration on a structurally complete page.

---

## 6. Build order hint (for the builder)

1. **Hero (hero-stats) + signature HorizontalScrollTrack** — verify the
   centerpiece works (DuotonePhoto on chapter cards, NumberedChapter
   numerals, scroll scrub at smoothing 0.6, chapter 04 type-weight emphasis).
   This is the load-bearing combination; if it doesn't read as
   editorial-industrial here, nothing downstream will save it.
2. **Navigation (nav-phone) + Footer (footer-rich)** — frame the page; sticky
   click-to-call is the second conversion path.
3. **Trust block + certifications Marquee** — the regulatory ticker is
   visually load-bearing for fleet auditors.
4. **Services (services-process)** — procedural vocabulary that the signature
   then performs.
5. **Content (content-about) + KenBurnsImage** — atmospheric closer.
6. **Contact (contact-split) + MagneticButton on primary CTA** — conversion.
7. **GrainOverlay 0.04** — applied last, BaseLayout-level, single instance.

---

## 7. Micro-timings (COMMITTED — builder consumes verbatim)

**Register**: surgical, reserved → durations 700-900ms; easings in
`power2/3.out` or `expo.out` family; no bounce, no back, no elastic; stagger
≤0.06s; scrub smoothing 0.6.

| Element | Duration | Easing | Damping | Stagger | Scrub | Delay |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Hero stats ClipMaskReveal (3 KPIs) | 800ms | power3.out | — | 0.05s items, start | false | 120ms |
| Hero DuotonePhoto fade-in (initial paint) | 600ms | power2.out | — | — | false | 0ms |
| Trust-heritage data-anim="fade-up" | 700ms | power3.out | — | — | false | 80ms |
| Trust badge ClipMaskReveal (left → right) | 900ms | power2.inOut | — | — | false | 200ms |
| Certifications Marquee | 50s loop | linear | — | — | — | — |
| Services-process step fade-up (5 steps) | 700ms | power3.out | — | 0.06s steps, start | false | — |
| Signature HorizontalScrollTrack pin+scrub | scroll-linked | power2.inOut | — | — | true, 0.6 | — |
| Signature DuotonePhoto card paint | 0ms (no entrance) | — | — | — | — | — |
| Signature NumberedChapter numeral type weight | static | — | — | — | — | — |
| Content-about first paragraph fade-up | 700ms | power3.out | — | — | false | — |
| Content-about KenBurnsImage drift | 32s loop | linear | — | — | — | — |
| MagneticButton (contact primary CTA) | — | — | 0.18 (lerp factor, lower than typical 0.06–0.10 cursor-lerp; for spring-pull it reads as "controlled, not bouncy") | — | — | — |
| Lenis smooth-scroll (page-level) | — | linear (lerp-based) | 0.10 | — | — | — |
| Link hover underline color shift | 180ms | ease-out | — | — | — | 0ms |
| Reduced-motion fallback transitions | 0ms | — | — | — | — | — |

**Notes on individual entries**:
- Hero stats stagger origin `start` (left → right, top → bottom) reads as
  reading order; `random` would feel agency-coded.
- Marquee 50s/loop is intentionally slower than the 45s default. Audience
  reads Italian regulatory text — DM dates and 12-character codes — not
  English brand names.
- HorizontalScrollTrack `scrub: true, smoothing: 0.6` is committed verbatim
  per AMB Turning precedent for the same register.
- MagneticButton `damping 0.18` is the spring lerp factor inside the
  primitive's drift-toward-cursor logic. Lower than the agency-default 0.10
  (which would feel snappier/playful); 0.18 reads as "deliberate pull,"
  matching the reserved register.
- KenBurnsImage 32s/loop is slower than the typical 28s. The atmosphere
  block is meant to breathe, not pan.
- No `delay` on the signature track — pin-and-scrub triggers on viewport
  entry; delay would offset the pin-start from the user's scroll position.

---

## 8. Cohesion verdict

One editorial voice, not a primitives showcase. The page has exactly one
motion centerpiece (`HorizontalScrollTrack`); every other primitive
(ClipMaskReveal on hero stats and trust badge, fade-up on services and
content, Marquee on certifications, KenBurns on the about background,
MagneticButton on the single primary CTA) plays a supporting, restrained
role. The register stays surgical from hero to footer — `power2/3.out`, no
overshoot easings, no character-level theatrics, durations 700–900ms,
stagger ≤0.06s, scrub smoothing 0.6 on the signature. Reduced-motion users
read the same editorial layout without the choreography. Krefer 2026-05-03
proved the recipe; Conte runs it with the same discipline.
