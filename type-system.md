# Type System — Conte srl

Heavy-vehicle workshop, Ceglie Messapica (BR). 25+ anni, codice tecnico
tachigrafi I3 044 1168. Italian only. Brutalist grotesk, single-family
discipline. Officina-floor authority register — signage, torque-spec sheet,
Camera di Commercio stamp. Not a brochure.

Direct precedent: Krefer 2026-05-03 (same charcoal+saffron+Archivo+Horizontal
ScrollTrack pattern, GREENLIGHT iter 1, rubric 8/1/0). Type system held
verbatim through critique with one accepted nit (nav uppercase reads as
signage, not slop).

---

## 1. Font pair

Single-family system, two Fontsource packages — Archivo Narrow for the display
register (signage, chapter numerals, headlines, kickers) and Archivo for body
and small text. Same family, two widths. Pure brutalist single-family
discipline; the contrast is width + weight + size + role, not personality.

```
Display:
  Family: Archivo Narrow
  Source: @fontsource/archivo-narrow ^5.0.0
  Weights used: 700 (display, h1, h2, chapter numerals)
                500 (eyebrows, certifications row, micro-meta)
  Why: condensed grotesque hits the road-signage / torque-spec register the
       concept commits to. At weight 700 narrow, headlines read like a yard
       gate sign in Z.I. Ceglie Messapica, not a marketing brochure. Chapter
       numerals 01-05 in Archivo Narrow 700 at 9rem give chapter 04 the
       conversion-lever moment for codice I3 044 1168.

Body:
  Family: Archivo
  Source: @fontsource/archivo ^5.0.0
  Weights used: 400 (body, descriptions, FAQ answers, footer audit-trail)
                500 (CTA labels, primary phone CTA, inline emphasis)
                600 (rare — only h3 card titles inside HorizontalScrollTrack)
  Why: same family at regular width keeps the page coherent. Contrast comes
       from width, not personality. No humanist warmth, no editorial italic,
       no geometric tech-startup signal. Reads as a serious-job site.

Forbidden alternates (this concept):
  - Inter — generic SaaS slop, anti-concept
  - Fjalla One — residential-construction cheat-sheet default, would invite
    the orange-on-white trap the palette deliberately escapes
  - Oswald — newsroom register, wrong era and audience
  - any humanist serif (Fraunces, Source Serif, Lora) — concept §3 explicit
    NO editorial serif, NO humanist warmth
  - any monospace — no datasheet/code register here (no spec sheets to
    typeset like amb-turning); single-family discipline forbids a third face
  - Bebas Neue — too display-only, no body register, can't carry the system
  - Roboto Condensed — Google CDN default, GDPR-blocked anyway
```

Fontsource availability check passed. No halt. No re-pick.

---

## 2. Size scale

Fluid clamp, ratio 1.333 (perfect fourth) — same ratio as Krefer, validated
through critique. Two extremes: hero display ≥9rem fluid max for the chapter
numerals + I3 044 1168 codice moment, and fine print 0.7rem fixed for the
footer audit trail.

```
--text-display:   clamp(3.75rem, 10vw, 9.5rem)    /* hero stat "25+", chapter numerals 01-05, I3 044 1168 codice moment — THE EXTREME */
--text-h1:        clamp(2.5rem, 5vw, 4.25rem)     /* hero headline, section opener */
--text-h2:        clamp(1.75rem, 3.2vw, 2.75rem)  /* trust-heritage block, section subhead */
--text-h3:        clamp(1.25rem, 1.75vw, 1.5rem)  /* chapter card titles, services-process step labels */
--text-lg:        clamp(1.05rem, 1.2vw, 1.2rem)   /* lead paragraph, hero sub-headline */
--text-body:      clamp(0.95rem, 1.05vw, 1.0625rem) /* body, FAQ answers, about block, descriptions */
--text-sm:        clamp(0.825rem, 0.9vw, 0.9rem)  /* metadata, contact details, certification subtitles */
--text-eyebrow:   0.75rem                          /* uppercase tracked kickers, Marquee row, chapter labels */
--text-xs:        0.7rem                           /* footer fine print: P.IVA, hours, codice — fixed extreme */
```

Notes on the extremes:
- `--text-display` MUST go to 9.5rem on desktop because the I3 044 1168 codice
  in chapter 04 is the conversion lever for fleet auditors. At anything less,
  the codice loses signage register. At 9.5rem in Archivo Narrow 700 it reads
  like a yard gate placard.
- `--text-xs` at 0.7rem fixed (not fluid) because P.IVA + codice tecnico +
  full hours need to stay readable on a 4G phone in a truck cab on the SS7
  but also not bloat on a desktop display. Audit-trail register, not
  responsive performance art.

---

## 3. Weight law

```
Archivo Narrow 700 (display):
  - Hero stat numerals (25+, 3, I3 044 1168 digits)
  - Chapter numerals 01-05 in HorizontalScrollTrack at --text-display
  - H1 (hero headline + section openers)
  - H2 (trust-heritage subhead, section second-tier)
  - "I3 044 1168" wherever it appears (hero, chapter 04, footer)

Archivo Narrow 500 (display):
  - Eyebrows, kicker labels (always uppercase, always tracked)
  - Marquee certifications row text (Unioncamere I3 044 1168 / DM 10/8/2007 /
    MCTC / opacimetro omologato)
  - Chapter card meta-label above each numeral ("CAPITOLO 04")
  - Micro-meta (footer column headers, contact-split labels)

Archivo 600 (body):
  - H3 (chapter card titles inside HorizontalScrollTrack only — needs to read
    against duotone background without going Narrow)
  - Used sparingly. If you reach for 600 for any non-h3 case, use Narrow 700
    instead.

Archivo 500 (body):
  - Primary phone CTA label "+39 0831 382539" inside MagneticButton
  - Inline emphasis on a single word in a paragraph (rare — once per section
    max, never on a full phrase)
  - ServicesProcess step labels (accetta veicolo / diagnostica TEXA / etc.)

Archivo 400 (body):
  - Body paragraphs (about block, FAQ answers, hero sub-headline, chapter
    card descriptions)
  - Footer audit trail copy (P.IVA, hours, certifications text)
  - Default for everything not enumerated above

Italic:
  - Forbidden across the entire system. Officina-floor authority does not
    italicize. If a word needs emphasis, weight 500 + (rarely) all caps.
  - Exception: nothing. Concept §3 explicit "NO humanist warmth" extends to
    italic.
```

Tracking law:

```
Display (≥4rem):              letter-spacing: -0.02em   line-height: 0.92
H1:                           letter-spacing: -0.015em  line-height: 1.02
H2:                           letter-spacing: -0.01em   line-height: 1.12
H3 (card title):              letter-spacing: -0.005em  line-height: 1.2
Lead paragraph (--text-lg):   letter-spacing: 0          line-height: 1.4
Body:                         letter-spacing: 0          line-height: 1.55
Small (metadata):             letter-spacing: 0.01em    line-height: 1.45
Eyebrow / Marquee row:        letter-spacing: 0.12em    line-height: 1.2
                              text-transform: uppercase
Fine print (--text-xs):       letter-spacing: 0.06em    line-height: 1.4
```

Tight tracking on display (-0.02em) is the brutalist signage move — letters
locked together like a stencilled sign on a steel door. Loose tracking
(+0.12em) on eyebrows and Marquee row pushes them into kicker / regulatory-
stamp register. This is the contrast that single-family brutalism lives on.

---

## 4. Numerals law

This site has many number moments — `25+`, `I3 044 1168`, three phone numbers,
`DM 10 agosto 2007`, opening hours, year ranges. Numerals get committed
treatment, not default OpenType.

```
Default for ALL numerals across the page:
  font-feature-settings: "tnum" 1, "lnum" 1;
  font-variant-numeric: tabular-nums lining-nums;

Apply globally at :root level. Reasoning:
  - Lining-nums (LNUM): Archivo's default is old-style numerals which would
    descend below baseline and look "literary". Force lining for the
    industrial-signage register. All digits sit on the cap-height grid like
    a torque-spec sheet.
  - Tabular-nums (TNUM): with three phone numbers stacked in ContactSplit
    and three+ stat blocks side by side, proportional digits create ragged
    columns. Tabular locks them. Critical for "I3 044 1168" rendering at
    --text-display: the spacing between "044" and "1168" must be identical
    every paint, else the codice looks like marketing copy instead of a
    Camera di Commercio identifier.

Hero stat numerals (the "25+" hammer) and chapter numerals 01-05:
  - Display size --text-display, weight 700, Archivo Narrow
  - Tabular + lining (inherits global)
  - Tracking -0.02em (display tracking law)
  - Saffron #F4C430 (palette law: numerals get accent)

Codice "I3 044 1168" rendering rule:
  - Verbatim. NEVER hyphenated, NEVER line-broken between groups.
  - Apply: white-space: nowrap; on its inline span everywhere it appears.
  - At --text-display in chapter 04: this is the largest type weight on the
    page. The conversion lever.
  - At --text-body in hero-stats and footer: tabular-nums keeps the
    "I3 044 1168" visually aligned with surrounding stat columns.
  - Span class: .codice-tecnico — Builder enforces nowrap + tabular + the
    saffron color application here.

Phone numbers:
  - Format: "+39 0831 382539" with non-breaking space between country code
    and city code, regular space between city code and subscriber.
  - Weight 500 Archivo body in the CTA, weight 400 in the contact list.
  - Tabular numerals always. Three phone numbers in a column must align.

Italian dates ("DM 10 agosto 2007", "24 gennaio 2022", "26 maggio 2025"):
  - Sentence-case month name (Italian convention: "10 agosto 2007", not
    "10 Agosto 2007").
  - Tabular numerals — these run in certifications block as a stacked list,
    they need to align.
  - Year always lining-nums (already global).

Italian decimal separator (defensive — site has no prices, but if any future
copy adds them):
  - Comma not dot. "0,04 opacità grain" not "0.04". Builder grep should flag.

Anti-slop:
  - Never typeset "25+" with a superscript "+". The "+" stays inline at the
    same size and weight as the digits. Same height, same baseline.
  - Never use "I3-044-1168" or "I3.044.1168" or any abbreviation. Verbatim
    only: "I3 044 1168" with regular spaces (not non-breaking — let tabular-
    nums do the column alignment work).
```

---

## 5. Italian-specific guardrails

Italian technical vocabulary runs long. "Diagnostica", "manutenzione",
"tachigrafo", "calibratura", "centro tecnico", "opacimetro omologato",
"interventi esterni" — typesetting these without rules produces ragged columns
and orphan widows that read as amateur.

```
Line-length (measure):
  Body paragraphs:      max-width: 62ch  (Italian needs ~10% more measure
                                          than English to breathe — English
                                          rule is 60-65ch)
  Lead paragraph:       max-width: 56ch
  Card descriptions:    max-width: 48ch
  Hero sub-headline:    max-width: 38ch
  H1 / display lines:   max-width: 18ch (forces headline into 2-3 strong
                                          lines, not a typographic worm)

Hyphenation:
  hyphens: manual on body paragraphs. Italian hyphenation engines in
  browsers are inconsistent (Safari + Firefox split words weirdly:
  "tachigra-fo" instead of "ta-chi-grafo"). Manual control via &shy; on the
  three known long words ONLY when copy-composer hits a known break:
    - tachi&shy;grafo (between i and g, never between fo)
    - calibra&shy;tura (between a and t)
    - manuten&shy;zione (between n and z)
    - opaci&shy;metro (between i and m)
    - diagno&shy;stica (between o and s)

  Default: hyphens: none. Better a slightly-jagged right ragged edge than a
  badly-broken Italian compound.

Widow control:
  Body and lead paragraphs:  text-wrap: pretty;   (Chrome/Safari supported,
                                                    no-op fallback)
  Headlines (h1, h2):        text-wrap: balance;  (avoid orphan single-word
                                                    last lines on h1 — kills
                                                    the brutalist signage feel
                                                    when the last word floats
                                                    alone)

  Display (--text-display): NO text-wrap. Never auto-wrap a hero numeral or
  a chapter numeral. Hard line-breaks via <br> in copy.md if the headline
  needs them.

Italian quotation marks:
  Use «» (caporali) not "" — Italian convention. ASCII quotes "" are
  forbidden. If copy-composer ships a pull-quote (concept doesn't request
  any, but defensive): «...» with thin non-breaking spaces inside.

Forbidden character substitutions (Builder grep):
  - Em-dash —. Italian convention prefers comma + space + clause, or
    parenthesis. The em-dash in Italian copy reads English-translated.
    Concept rejection: we don't ship translation-shaped Italian.
  - "Smart" curly apostrophes ' on words like "l'opacimetro". Use the
    straight ASCII ' OR the Italian typographic apostrophe ' if the build
    tooling preserves it. Both acceptable; mixing is not.
  - Ellipsis as three periods "...". Use the single character … if at all,
    but concept register is declarative — copy.md should rarely use ellipsis.

Capitalization on Italian acronyms (preserve verbatim):
  TEXA, MCTC, MIT, P.IVA, SS7, DM, Z.I., Lun-Sab, art., lett., I3, BR, TO,
  Brindisi, Taranto, Lecce, Ceglie Messapica.

  These NEVER get title-cased, NEVER auto-corrected. Copy.md ships them
  verbatim, type-system passes them through. Code or directive titles may
  use small-caps presentation, but the underlying string stays uppercase.
```

---

## 6. Copy guardrails (for copy-composer + Builder grep gate)

Hard limits the Builder enforces via grep on copy.md before accepting the
draft:

```
Hero headline (h1):           ≤ 8 words
Hero sub-headline (lead):     ≤ 16 words
Eyebrow / kicker:             ≤ 4 words (Italian needs slightly more than
                                          English — 3 words too tight for
                                          "Centro tecnico tachigrafi")
Section H1:                   ≤ 7 words
Section H2:                   ≤ 9 words
Chapter card title (H3):      ≤ 6 words
Chapter card description:     ≤ 24 words per card
Body paragraph:               ≤ 55 words per paragraph (avg 35-45)
About block paragraph:        ≤ 70 words (one paragraph allowed at this length
                                          for the heritage block; rest stay
                                          tight)
FAQ answer:                   ≤ 80 words per answer
CTA label:                    ≤ 5 words ("Chiama 0831 382539" = 3 words OK,
                                          "Richiedi un preventivo subito" = 4
                                          words OK)
Footer audit-trail line:      ≤ 12 words per line

Hard bans (Builder rejects on grep match, asks copy-composer to redraft):
  - Exclamation marks. Zero. The whole register is declarative.
  - Superlatives: "migliore", "leader", "eccellenza", "qualità superiore",
    "alti standard". Replace with verifiable numbers or specific authority.
  - Boilerplate phrases: "soluzioni innovative", "passione", "famiglia",
    "team affiatato", "costruiamo il tuo futuro", "al servizio del cliente",
    "professionalità", "esperienza pluriennale" (use "25+ anni" instead),
    "sempre raggiungibili" (use "3 telefoni operativi" instead).
  - Anglicismi salvo brand reali. Allowed: TEXA, software, MCTC, DM,
    P.IVA, MIT, Unioncamere, Camera di Commercio, click-to-call. Forbidden:
    "team", "mission", "vision", "core business", "know-how", "skill",
    "performance", "feedback", "expertise".
  - Title Case on Italian phrases. Italian uses sentence case + proper
    nouns. "Centro Tecnico Tachigrafi" stays Title Case ONLY because it's
    the official designation in the Unioncamere registry; everything else
    is sentence case.
  - First-person plural ("noi", "siamo", "operiamo da..."): allowed but
    sparingly, at most once per section. Concept register is third-person
    procedural ("Conte srl opera...", "L'opacimetro omologato misura...").

Numeric-fact lock (Builder grep enforces literal match):
  - "25+ anni" — exact string, never "oltre 25 anni" mid-headline (footer +
    body OK, hero stat must be the literal "25+")
  - "I3 044 1168" — verbatim every appearance, no abbreviation
  - "DM 10 agosto 2007" — verbatim, never "DM 10/8/2007" in body copy
    (footer + Marquee certification row may use the slash form for spacing)
  - "0831 382539" — phone format with single space, "+39 0831 382539" when
    used with country code
  - Hours: "Lun-Ven 8:30-13:30 / 15:30-19:30, Sab 8:30-13:00" — exact
    string in footer and contact

Case rules:
  Uppercase (all caps, tracked +0.12em):
    - Eyebrows / kickers
    - Marquee certifications row
    - Chapter "CAPITOLO 04" labels
    - The single primary CTA inside MagneticButton: "CHIAMA ORA" prefix
      OR pure-number "0831 382539" — never a mixed-case CTA on the primary
      phone link. Concept §6 commits to phone-as-CTA.

  Sentence case:
    - Headlines, body, FAQ, about block, chapter card descriptions, nav
      links, secondary CTAs, footer audit trail, ServicesProcess steps.

  Title Case:
    - Forbidden except for proper nouns and the literal "Centro Tecnico
      Tachigrafi" official designation. Italian Title Case on phrases is
      English-translated slop.
```

---

## 7. Builder directives

```
Fontsource install (package.json):
  "@fontsource/archivo-narrow": "^5.0.0"
  "@fontsource/archivo": "^5.0.0"

BaseLayout.astro imports (preload-critical first):
  import "@fontsource/archivo-narrow/700.css";        // hero, h1, h2, numerals
  import "@fontsource/archivo/400.css";               // body — preload
  import "@fontsource/archivo-narrow/500.css";        // eyebrows, marquee
  import "@fontsource/archivo/500.css";               // CTA, inline emphasis
  import "@fontsource/archivo/600.css";               // h3 card titles only

Preload only weight 400 Archivo (body) + weight 700 Archivo Narrow (display).
Other weights load async. Use <link rel="preload" as="font" type="font/woff2">
on the two preload files. No FOIT — fall back to system stack until loaded:

CSS custom properties:
  --font-display: "Archivo Narrow", "Helvetica Neue Condensed",
                  "Arial Narrow", system-ui, sans-serif;
  --font-body:    "Archivo", "Helvetica Neue", Arial, system-ui, sans-serif;

Apply font-display: swap; on all @font-face declarations. Fontsource sets
this by default. Verify after install.

Tabular-nums + lining-nums applied at :root for global numeric correctness:

  :root {
    font-feature-settings: "tnum" 1, "lnum" 1;
    font-variant-numeric: tabular-nums lining-nums;
  }

Italian lang attribute on <html>: lang="it". Required for browser hyphenation
engines and screen-reader pronunciation of "tachigrafo" / "Ceglie Messapica".

Codice tecnico span class (apply where I3 044 1168 appears):
  .codice-tecnico {
    white-space: nowrap;
    color: var(--accent);              /* saffron #F4C430 */
    font-feature-settings: "tnum" 1;
    letter-spacing: 0.01em;            /* slight loosening — codice reads
                                          as identifier not as wordmark */
  }

Width-axis variable note: @fontsource-variable/archivo DOES expose a width
('wdth') axis. We are NOT using it — variable-width Archivo with wdth: 70
would technically replace Archivo Narrow at one package + ~30KB savings. We
deliberately ship the static narrow because: (1) Krefer pattern validated
the static approach through critique, (2) variable width axis with wdth: 70
renders ~5% wider than @fontsource/archivo-narrow at 700 — visibly less
condensed, weakens the signage register, (3) Safari < 16 has known bugs on
the wdth axis when stacked with weight axis. Static narrow is safer and
on-register.

NEVER fall back to Google Fonts CDN. GDPR-blocked. If Fontsource install
fails, halt the build — don't ship a draft with a CDN link.
```

---

## 8. Forbidden moves (anti-slop, this concept specifically)

```
- Inter anywhere on the page. Concept §3 explicit.
- Any humanist serif (Fraunces, Lora, Source Serif, Playfair). No editorial
  warmth — concept rejects "brochure" register.
- Italics anywhere. No exceptions.
- Three-font system. Single-family discipline is the concept's typographic
  spine. Adding a mono for "spec" register would dilute the brutalist move
  (and Conte does not have datasheets to typeset like amb-turning).
- Title Case on Italian phrases. Slop indicator.
- Letter-spacing >0.04em on body. Italian needs to breathe but not float.
- Letter-spacing >0 on display headlines. Display is locked tight (-0.02em),
  always.
- Old-style numerals. Forced to lining via global font-feature-settings.
- "Smart" auto-rendering of phone numbers as italic / colored / underlined
  link defaults. Phone CTA is styled deliberately (saffron weight 500), the
  three phones in ContactSplit are body weight 400 with a saffron underline
  on hover only.
- Any size below 0.7rem. Footer fine print floor. Anything smaller is
  illegible on a phone in a truck cab.
- Any size between bands. Pick the band, don't invent --text-1.5 or 1.234rem
  freeforms. Slop signature.
```

---

**Memory pulled:**
- conte-srl researcher procedural (gmem 20260504_134055_82) — confirmed
  Archivo single-family brutalism over signage as the right voice for Italian
  industrial-automotive workshops.
- conte-srl concept (gmem 20260504_135531_97) — committed brutalist grotesk
  voice, charcoal+saffron palette, signature numerals at chapter 04.
- krefer concept (gmem 20260503_143356_77) + critique (gmem 20260503_151948_78)
  — direct precedent. Same Archivo Narrow 700 + Archivo 400 single-family
  pattern shipped GREENLIGHT iter 1, 8/1/0 rubric. Type-system held verbatim
  through critique.
- tct24 type-system pattern (gmem 20260504_135401_92) — tabular-nums
  global rule for sites with >3 number moments, validated.
- amb-turning type-system (gmem 20260504_135441_94) — three-font system
  explicitly rejected for Conte; we have no datasheet register to typeset.

**Fontsource verification:** both packages confirmed available at fontsource.org.
@fontsource/archivo-narrow weights 400/500/600/700 + variable. @fontsource/archivo
weights 100-900 + variable. No halt, no re-pick.
