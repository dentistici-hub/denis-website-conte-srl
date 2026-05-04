# Concept — Conte srl

Heavy-vehicle workshop, Ceglie Messapica (BR). 25+ anni. Centro tecnico
tachigrafi I3 044 1168. Audience: autotrasportatori, fleet managers, transport
auditors. Italian only.

---

## 1. Through-line

Officina-floor authority: 25 anni di mezzi pesanti, un codice Unioncamere,
zero teatro.

## 2. Signature move

A pinned `HorizontalScrollTrack` of the diagnostic-to-intervention chain — five
numbered chapters (01 Diagnostica TEXA → 02 Banco prova freni e opacimetro →
03 Revisione meccanica integrale → 04 Tachigrafi digitali I3 044 1168 → 05
Interventi esterni), each card a `DuotonePhoto` (charcoal + saffron) of the
actual workshop register, oversized chapter numerals in Archivo Narrow.
Chapter 04 is the load-bearing moment: the I3 044 1168 codice is the
conversion lever for fleet auditors and gets the largest type weight in the
track.

- Primitive: `HorizontalScrollTrack` (Tier 1, motion-primitives/README.md L43)
- Treatment: `DuotonePhoto` (Tier 3, L67) on each card
- Numerals: `NumberedChapter` (Tier 2, L56) per card label
- Asset slots consumed (all filled, manifest validated):
  `service-tester-diagnostico-texa`, `service-banco-prova-freni` (alt:
  `service-opacimetro`), `service-revisione-meccanica`, `service-tachigrafi`,
  `service-interventi-esterni`

No special slots required. No `three-glb`, no `custom-glsl`, no
`scroll-frames`, no `lottie-bespoke`. Nothing flagged `needs_denis` from
concept side. (Logo raster is a manifest-side `needs_denis` carryover —
unrelated to signature.)

## 3. Typographic voice

**Brutalist grotesk** — narrow industrial sans, single-family discipline. The
register is signage, torque-spec sheet, Camera di Commercio stamp — not a
brochure. Type Stylist will pick the specific pair; brief recommends Archivo
Narrow 700 display + Archivo 400 body, which fits the steer. NO editorial
serif. NO humanist warmth. NO Inter.

## 4. Motion language

- **Intensity:** medium
- **Signature Tier 1 move:** `HorizontalScrollTrack` (consumes the page's
  scroll-choreography budget)
- Incidental motion: `ClipMaskReveal` on hero stats band, `KenBurnsImage`
  background on the trust-heritage block, `Marquee` on certifications row,
  `MagneticButton` on the single primary phone CTA. All else static.
- Anti-stack: no `ScrollPinSection` hero, no `ScrollScenePan`, no
  `ShaderCanvas`, no `CustomCursor`. One scroll signature; the rest is iron.

## 5. Color law

```
bg:                 #15171A  (charcoal — dominant, 70%+ of surfaces)
fg:                 #E8E6E1  (bone — body text, headlines, ui chrome)
accent:             #F4C430  (saffron — CTA, codice I3 044 1168, chapter
                              numerals, KPI counters; never on body copy)
accent_hover:       #CFA628  (saffron-pressed state only)
accent_secondary:   #5B7A8C  (steel-blue — DECORATIVE only: chapter card
                              borders, footer divider, micro-meta. Never on
                              body, never as CTA, never as headline)
grain:              on       (SVG noise overlay 0.04 opacity — warmth without
                              clutter)
```

Hierarchy law:
- Saffron is reserved for verification + action: codice I3 044 1168, chapter
  numerals 01–05, primary phone CTA, KPI digits in hero-stats. If everything
  is yellow nothing is.
- Steel-blue is decoration, not voice. It exists to keep the page from going
  full duochrome on long blocks. Forbidden as CTA color.
- 4-color hex from brief retained because each color has a single, mutually
  exclusive job. This is not a palette, it's a law.

## 6. Layout grammar

```
IN:
- HeroStats (component override per brief — verifiable numbers, not a photo
  of mechanics shaking hands)
- TrustHeritage (25+ anni in Z.I. Ceglie Messapica)
- Marquee (certifications row: Unioncamere I3 044 1168 + DM 10/8/2007 +
  MCTC + opacimetro omologato — text only, no logos)
- HorizontalScrollTrack (signature — 5 chapters)
- DuotonePhoto (treatment on every chapter card + hero background)
- NumberedChapter (the 01-05 numerals on the track)
- ServicesProcess (services-process variant — accetta veicolo →
  diagnostica TEXA → preventivo → intervento → consegna; iconified for the
  4 brief-only services with no images)
- KenBurnsImage (atmosphere/about background)
- ClipMaskReveal (hero stats reveal, trust badge reveal)
- MagneticButton (single primary CTA wrapping the phone-call link)
- ContactSplit (3 phones + 3 emails + map for fleet drivers leaving SS7)
- FooterRich (P.IVA, codice tecnico, hours, all phones, all emails — full
  audit trail)
- GrainOverlay (default opacity 0.04, NOT 0.10 per recent fix commit)

OUT:
- Team section (analysis empty — do NOT stub with stock people)
- Testimonials section (zero Google reviews — do NOT fabricate)
- ScrollPinSection (would compete with HorizontalScrollTrack — anti-stack rule)
- ScrollScenePan (no wide SVG, no scene to pan)
- ShaderCanvas (wrong era, wrong industry — agency-reel signal)
- CustomCursor (B2B fleet operators on patchy 4G in Puglia, not gallery
  visitors)
- HeroVideo (no video sourced; manifest videos[] empty)
- CutoutImage (no transparent product PNGs in scope)
- DragGallery (we have a track, drag-gallery would duplicate the affordance)
- TextScramble (techy, agency-coded; this is an officina, not a studio)
- ColorFloodScroll (single-chapter palette law; flooding would dilute saffron)
- ContactQuoteForm (overkill — fleet managers call, they don't fill forms)
- IconPillCTA standalone (unless wrapped inside the hero CTA — single instance)
```

## 7. Rejections

Baked-in anti-patterns. The site cannot look like any of these:

- **Construction-orange CTA on white bg.** Reads "site under construction" not
  "officina industriale autorizzata". The whole reason the palette inverts to
  charcoal + saffron.
- **Hero with a uniformed mechanic giving a thumbs-up.** No staged-handshake
  stock, no smiling-team-in-overalls. Hero is hero-stats over a duotone red
  truck, no humans hero-front.
- **Carousel of unlinked brand logos.** TEXA / Mercedes / Iveco / MAN logos
  pasted as a "trust" band without permission or link. The trust band is the
  Unioncamere codice + the MCTC + the DM citation as text, period.
- **Stock leafy-green eco marketing.** This is a diesel-particulate workshop;
  the only green is the mechanic's hoodie in the cottonbro photos.
- **"Costruiamo il tuo futuro" boilerplate.** No fluff Italian construction
  copy. Voice is technical, declarative, third-person procedural. The
  copy-composer will police this.
- **Symmetric 3x3 service-tile grid.** Kills the diagnostic-to-intervention
  sequence narrative. We commit to a track, not a tile.
- **Synthetic team headshots or fake testimonial avatars.** Same lesson as
  Krefer 2026-05-03: missing data is a feature, not a gap to fill with stock
  faces.

## Anti-slop guardrails (this build, specific)

- **Italian-only copy with B2B-fleet register.** No anglicismi salvo brand
  reali (TEXA, MCTC, DM, P.IVA). No "soluzioni innovative", no "passione",
  no "famiglia", no "team affiatato". Passive-voice technical descriptions
  are fine: "L'opacimetro omologato misura la densità del particolato".
- **Codice I3 044 1168 must appear verbatim** in hero-stats AND chapter 04
  AND footer. It is the conversion lever, do not abbreviate, do not paraphrase.
- **Numbers over adjectives.** Hero-stats reads "25+ anni" not "esperienza
  pluriennale". "3 telefoni operativi" not "sempre raggiungibili". The brief
  has 5 verifiable stats with sources — use those literal values.
- **One primary CTA: phone.** `tel:+390831382539` wrapped in MagneticButton.
  Email is secondary, contact form is forbidden. Autotrasportatori on the
  SS7 do not fill forms.
- **Photography stays in the cottonbro low-key register.** No bright
  daylight passenger-car shots in the hero band. The two flagged
  passenger-car analogs (opacimetro tailpipe, brake-hub gloved hand) survive
  ONLY at thumbnail/card scale inside the duotone treatment, never as
  full-bleed hero or about backgrounds.

---

**Memory pulled:**
- conte-srl researcher procedural (gmem 20260504_134055_82) — confirmed
  palette law, single-family Archivo, drop team+testimonials, lead with
  Unioncamere badge.
- conte-srl asset-gatherer pattern (gmem 20260504_134744_86) — confirmed
  cottonbro studio truck-workshop set is the visual cohesion anchor; signature
  scroll-chain image slots all filled.
- krefer concept (gmem 20260503_143356_77) — direct architectural precedent;
  same charcoal+saffron+Archivo+HorizontalScrollTrack pattern proved out 2026-05-03,
  GREENLIGHT iter 1, rubric 8/1/0.

**Brief signature held.** Researcher's proposed HorizontalScrollTrack of the
5-chapter operational chain validates against motion-primitives shelf and
manifest slots. No downgrade, no `needs_denis` for the signature itself.
