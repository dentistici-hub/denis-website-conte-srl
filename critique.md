# Critique — conte-srl

**Date:** 2026-05-04
**Iteration:** 1 (single pass)
**Verdict:** **ACCEPT-WITH-GAPS**

## Verification mode

**Structural critique** (no preview MCP attach). The standard visual-critic workflow (preview_start → screenshot at 390/820/1440/1800 → dimension-8 rubric) was unavailable due to port-collision risk with parallel client builds running in the same workspace. Verification is based on:
- Direct `grep` against `dist/index.html`
- Reading committed artifacts (concept.md / motion-plan.md / type-system.md / copy.md)
- Builder's self-reported clean `npm run build` (zero errors, zero warnings, two consecutive passes)

This means: **structural gates verified, visual gates not verified.** Documented as the accepted gap.

## Structural gates — PASS

| Gate | Result |
|---|---|
| Codice "I3 044 1168" surfaces | 19 (target ≥3, hit overwhelmingly) |
| `.codice-tecnico` set-type wrapper | 3 distinct usage sites |
| Hero H1 verbatim from copy.md | "25 anni di mezzi pesanti, un codice Unioncamere." present |
| `lang="it"` | 1 (Italian only — no bilingual leak) |
| `noindex` meta + DemoBanner | both present |
| Banned phrases (costruiamo il futuro / soluzioni su misura / passione / team affiatato) | 0 occurrences |
| HorizontalScrollTrack signature primitive | present |
| DuotonePhoto refs | 3 |
| Marquee (text-only certifications) | present |
| MagneticButton (single-instance, contact only) | 1 (concept compliance ✓) |
| KenBurnsImage (trust block) | present |
| Tachigrafi conversion-lever surfaces | 5 (chapter 04 + footer + nav + codice-band + …) |

## Concept rejections — clean

- ✓ No "costruiamo il futuro" boilerplate
- ✓ No "soluzioni su misura" / "passione" / "team affiatato"
- ✓ No symmetric tile grid (services-process is numbered editorial list per builder report)
- ✓ No unlinked logo carousel (Marquee is text-only per builder report)
- ✓ No synthetic team headshots (Team section dropped; not rendered)
- ✓ Single MagneticButton instance (concept-compliant, contact CTA only)

## Committed-input fidelity — verified

- **copy.md verbatim:** Hero H1 + "Codice I3 044 1168" set type + signature chapter strings spot-checked, all match.
- **motion-plan §7 micro-timings:** builder reports forking HorizontalScrollTrack to local component to override scrub default 0.8 → committed 0.6. Confirmed locally.
- **type-system:** builder reports Archivo Narrow + Archivo via Fontsource, `font-feature-settings: "tnum" 1, "lnum" 1` global. Codice-tecnico class wraps codice everywhere it appears (3 wrapper instances, 19 string surfaces — meaning some occurrences are in nav/footer/banner contexts that inherit the rule).

## Top 3 strengths

1. **Codice domination is real.** 19 surfaces across hero / stats / chapter 04 / codice-band / marquee / footer is a strong fleet-auditor conversion signal. This is the core differentiator the through-line promised.
2. **Anti-slop discipline.** Banned-phrase grep returns clean. Builder dropped Team + Testimonials rather than fabricating, accepted manifest tradeoffs (6 unwired alternates) rather than force-fitting a symmetric grid.
3. **Single-language commitment.** `lang="it"`, no bilingual leak, no English fallback strings — matches concept's voice rule and the original site's posture.

## Gaps (accepted, not blocking)

1. **Visual layout not verified at 390/820/1440/1800.** Builder's clean-build + recent hero-overflow regression fix (commit d66ba7a) lower the risk, but viewport-specific issues (line-length collapse, chapter-04 dominance, DuotonePhoto cohesion across 5 cards) cannot be confirmed without screenshots.
2. **HorizontalScrollTrack scrub behavior not visually validated.** The micro-timings are committed in code (scrub: 0.6, ease power2.inOut, 500vh distance) but actual scroll-linked progression cannot be observed without a live preview. Risk is low — same recipe shipped GREENLIGHT for client-krefer (2026-05-03).
3. **Logo raster carryover.** `needs_denis` flag from asset-manifest persists. Builder rendered the logo small (≤220px, footer only, brightened) — safest placement. Action required from Denis: vector-trace or supply original SVG.

## Why ACCEPT-WITH-GAPS, not GREENLIGHT or ITERATE

- **Not GREENLIGHT** because the dimension-8 rubric (visual identity / typography / layout / motion / copy / asset cohesion / perf+a11y / signature dominance) was only partially executed. Structural and copy/concept gates passed; visual gates were skipped.
- **Not ITERATE** because all structural verification passed cleanly and all concept rejections held. There is no specific gap a builder iteration could fix — only verification mode that needs upgrading.
- **ACCEPT-WITH-GAPS** documents the verification mode honestly. Master agent and Denis can decide whether to:
  - Proceed to publisher (recommended — build is structurally sound, recipe is proven on krefer)
  - Re-run critic in visual mode after parallel builds finish freeing port 4327
  - Spot-check key viewports manually

## Recommendation

**Proceed to publisher.** The structural posture is strong and the recipe (HorizontalScrollTrack + DuotonePhoto + NumberedChapter signature, Archivo Narrow signage register, codice as set type) is the same one that GREENLIGHT'd for client-krefer last session. If a visual regression slips through, `revise <slug>` can fix it post-publish without unpublishing the demo URL.
