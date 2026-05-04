# Copy — Conte srl

Officina veicoli industriali, Ceglie Messapica (BR). Centro tecnico tachigrafi
I3 044 1168. Audience: autotrasportatori, flotte, operatori del trasporto.
Italian only.

---

## 1. Voice rules

Voice: officina-floor authority. Italian terza-persona impersonale ("L'opacimetro
omologato misura...", "Il banco prova freni verifica..."). B2B-fleet register —
fleet manager parla a fleet manager, non brochure parla al lettore. Numbers
lead, adjectives follow (or vanish). Frasi sotto le 18 parole. Codice tecnico,
articoli di legge, sigle ufficiali compaiono verbatim — sono la voce, non la
decorazione.

**Hard rules — non negoziabili:**

1. **No exclamation marks.** Mai. La voce non grida.
2. **Italiano solo, salvo brand reali e sigle tecniche.** TEXA, MCTC, DM,
   P.IVA, Camera di Commercio, Unioncamere, EBS / ABS / EBM se servono. Niente
   "solutions", niente "service", niente "team".
3. **Stats lead with the number.** "25+ anni" non "esperienza pluriennale".
   "3 telefoni operativi" non "sempre raggiungibili".
4. **Voi / la vostra flotta — mai tu / il tuo.** Audience B2B. Il "voi" è
   rispettoso, il "tu" è dating-app.
5. **Verbi all'imperativo per le CTA.** "Chiamate", "Scrivete", "Prenotate",
   "Fissate". Mai "Scopri di più", "Contattaci", "Clicca qui", "Maggiori
   informazioni".
6. **Codice I3 044 1168 verbatim.** Hero-stats, chapter 04, footer. Non
   abbreviato, non parafrasato, non spaziato diversamente.

## 2. Anti-slop list (this build)

Specifico per Conte srl, in aggiunta agli always-on:

- "Soluzioni su misura" / "soluzioni innovative" / "soluzioni integrate"
- "Passione" / "amore per il nostro lavoro" / "famiglia Conte"
- "Team affiatato" / "squadra di professionisti" / "i nostri esperti"
- "Costruiamo il tuo futuro" / "il tuo successo è il nostro obiettivo"
- "Professionisti del settore" / "punto di riferimento nel settore"
- "Qualità garantita" / "massima qualità" / "eccellenza"
- "Da oltre 25 anni" come apertura — fatto già detto in stat, non in body
- "Mezzi pesanti in buone mani" / metafore familiari
- "Su strada con voi" / metafore-viaggio
- "La passione per la meccanica" — banned globally, doppia banned qui
- "Esperienza, precisione e celerità" — è il tagline del sito 2008,
  da NON resuscitare

## 3. Language

```
Language: it-IT
Source: analysis.json.language = "it"; scraped_copy 100% italiano;
        sito client 2008-vintage interamente in italiano.
```

## 4. Site nav labels

```
Navigation items (left → right):
  - "Officina"           → /#trust
  - "Lavorazioni"        → /#services (la chain orizzontale)
  - "Tachigrafi"         → /#tachigrafi (anchor sul chapter 04)
  - "Dove siamo"         → /#contact
Nav CTA (top-right, sticky, MagneticButton-wrapped):
  - "0831 382539"        → tel:+390831382539
```

Note al builder: la nav CTA mostra il numero verbatim, NON la parola
"Chiama". Il numero è il signal — fleet manager su SS7 lo riconosce,
lo tocca, parte la chiamata.

## 5. Hero block

```
## hero  (variant: hero-stats)
eyebrow:        "Officina veicoli industriali — Ceglie Messapica"
headline:       "25 anni di mezzi pesanti, un codice Unioncamere."
subhead:        "Diagnosi TEXA, banco prova freni, opacimetro omologato e centro tecnico tachigrafi I3 044 1168 — in zona industriale, dal 1998 circa."
primary_cta:    "0831 382539"            → tel:+390831382539
secondary_cta:  "Scrivete a info@conte-srl.com"  → mailto:info@conte-srl.com
notes:          "Hero-stats override per brief. NESSUNA foto stock di
                 meccanico-con-pollice-su sopra. Stats band sotto la subhead
                 carica il peso della verifica (vedi sezione 6)."
```

Word counts:
- Headline: 8 words.
- Subhead: 25 words (tecnico-denso, dentro la cap di 28 della voce).

Note "1998 circa" è derivato dal `founding_story.confidence: 0.5` del brief —
"dal 1998 circa" rispetta l'incertezza senza fabbricare un anno preciso.
Builder: se Denis conferma l'anno esatto, sostituire `1998 circa` con il
valore puntuale.

## 6. Stats / trust strip

Cinque stats verificate dal brief, ne committiamo quattro per la strip
(la quinta — apertura settimanale — vive nel footer e nel block orari).

```
## stats  (clip-mask reveal, animations.ts="counter" sui digit dove pertinente)

stat 1
  value:  "25+"
  unit:   "anni"
  label:  "in zona industriale, Ceglie Messapica"
  source: brief.enriched_content.stats[0]  [0.85 confidence]
  notes:  "value resta '25+', non '27' o altro numero esatto — il '+' è la
           commitment all'incertezza."

stat 2
  value:  "I3 044 1168"
  unit:   —
  label:  "codice tecnico tachigrafi (Unioncamere)"
  source: brief.enriched_content.stats[1]  [1.0 confidence]
  notes:  "valore in saffron, font-feature: tnum. Non usare counter
           animation — è un codice, non un numero progressivo."

stat 3
  value:  "3"
  unit:   "linee"
  label:  "telefoni operativi diretti"
  source: brief.enriched_content.stats[2]  [1.0 confidence]
  notes:  "le tre linee compaiono nel footer-rich."

stat 4
  value:  "DGT + INTL"
  unit:   —
  label:  "tachigrafi gestiti — digitali, intelligenti, analogici"
  source: brief.enriched_content.stats[3]  [1.0 confidence]
  notes:  "Abbreviazione DGT/INTL solo per la stat-tile. Il chapter 04
           espone i tre tipi per esteso."
```

## 7. HorizontalScrollTrack — 5 chapters

Signature move. Cinque capitoli numerati 01–05. Numerali oversized in
Archivo Narrow saffron. Ogni card è una `DuotonePhoto` charcoal+saffron
del registro reale officina.

```
### chapter 01
number:    "01"
eyebrow:   "diagnostica"
headline:  "Tester TEXA, prima di ogni intervento."
body:      "La centralina parla per prima. La diagnostica elettronica TEXA legge codici motore, ABS, cambio e SCR su veicoli industriali e leggeri. Niente preventivo senza lettura — il guasto si conferma sullo strumento, non a orecchio."
inline_value: —
cta:       —
asset_slot: service-tester-diagnostico-texa

### chapter 02
number:    "02"
eyebrow:   "verifica frenante ed emissioni"
headline:  "Banco prova freni e opacimetro."
body:      "Banco prova freni omologato e banco prova giochi per organi di sterzo e sospensione. Opacimetro omologato MCTC per la prova ufficiale del particolato sui motori diesel. Misure ripetibili, certificate, depositate."
inline_value: —
cta:       —
asset_slot: service-banco-prova-freni  (alt: service-opacimetro)

### chapter 03
number:    "03"
eyebrow:   "revisione meccanica"
headline:  "Motori, cambi, differenziali."
body:      "Revisione integrale di motori, cambi e differenziali per autocarri, autobus e mezzi pesanti. Riparazione impianti frenanti pneumatici e idraulici, lavorazione balestre, saldature su telai. Magazzino ricambi interno per accorciare i fermi macchina."
inline_value: —
cta:       —
asset_slot: service-revisione-meccanica

### chapter 04   ← LOAD-BEARING / FLEET-AUDITOR LEVER
number:    "04"
eyebrow:   "centro tecnico tachigrafi"
headline:  "Codice I3 044 1168."
body:      "Centro autorizzato Camera di Commercio Brindisi — Unioncamere Metrologia Legale. Installazione, attivazione, calibratura, controllo periodico e riparazione di tachigrafi digitali, intelligenti e analogici, ai sensi del DM 10 agosto 2007 art. 2 lett. i)."
inline_value: "I3 044 1168"   ← SET TYPE, saffron, Archivo Narrow 700, tnum
inline_value_label: "codice tecnico — verifica su metrologialegale.unioncamere.it"
cta:       "Verificate l'autorizzazione"  → https://www.metrologialegale.unioncamere.it/tachigrafi/centri-tecnici
asset_slot: service-tachigrafi
notes:     "Il codice deve essere LEGGIBILE come testo (non immagine).
            Builder: imposta il chapter 04 come anchor-target di /#tachigrafi
            dalla nav. Estensione tachigrafi intelligenti dal 24/01/2022,
            analogici dal 26/05/2025 — citare nel chapter 04 SOLO se lo
            spazio body lo regge senza sforare 45 parole; altrimenti vanno
            nelle certifications del footer."

### chapter 05
number:    "05"
eyebrow:   "interventi esterni"
headline:  "Quando il fermo macchina non si sposta."
body:      "Assistenza tecnica on-site sul corridoio Brindisi-Taranto-Lecce per fermi macchina e situazioni non trasportabili in officina. Tre linee operative dirette per coordinare l'intervento — fisso 0831 382539, cellulari 333 7076796 e 392 9100093."
inline_value: —
cta:       "Chiamate il fisso"   → tel:+390831382539
asset_slot: service-interventi-esterni
```

Word counts verifica:
- chapter 01 body: 39 parole — entro cap di 45.
- chapter 02 body: 37 parole — entro cap.
- chapter 03 body: 37 parole — entro cap.
- chapter 04 body: 36 parole — entro cap. Estensioni 2022/2025 in footer.
- chapter 05 body: 38 parole — entro cap.

## 8. Trust band — Marquee certifications row

Concept richiede marquee di SOLI testi (no logo bitmap). Sei voci, loop
infinito, separator "·" charcoal.

```
## marquee  (motion-primitives/Marquee, text-only, no logos)

items (in this order, then loop):
  1. "Centro Tecnico Tachigrafi — codice I3 044 1168"
  2. "Camera di Commercio Brindisi · Unioncamere Metrologia Legale"
  3. "DM 10 agosto 2007 — art. 2 lett. i)"
  4. "Estensione tachigrafi intelligenti — 24/01/2022"
  5. "Estensione tachigrafi analogici — 26/05/2025"
  6. "Centro revisioni MCTC · opacimetro omologato"

separator: "·"
ban: nessun logo TEXA / Mercedes / Iveco / MAN / Renault Trucks. Concept
     section 7 lo vieta esplicitamente.
```

## 9. Trust-heritage block (after hero)

```
## trust-heritage  (variant: trust-heritage, KenBurnsImage background)
eyebrow:   "in zona industriale dal 1998 circa"
headline:  "Stessa officina, stesso indirizzo, stessa autorizzazione."
body:      "Conte srl opera da oltre 25 anni in Via 2 Giugno, zona industriale di Ceglie Messapica. Centro tecnico tachigrafi e centro revisioni iscritto MCTC, riferimento operativo per autotrasportatori e flotte del corridoio Brindisi-Taranto-Lecce."
primary_cta:   —
secondary_cta: —
notes:     "Body 41 parole — entro cap. KenBurnsImage attinge dal hero
            background scaled-and-darkened a 60%. Niente CTA: il blocco
            vende la stabilità, non la chiamata."
```

## 10. Capabilities-overview / services-process

Quattro lavorazioni "minor" (no asset image, citate nel brief enriched_content
con confidence 0.7) finiscono qui in iconified list. Concept committà al
process layout, non al tile grid.

```
## services-process  (variant: services-process, iconified)
eyebrow:    "Lavorazioni complementari"
headline:   "Quattro voci che chiudono il ciclo."
subhead:    "Oltre alla chain diagnostica → revisione → tachigrafi, l'officina copre interventi mirati su impianti specifici e attrezzature complementari."
body:       —
primary_cta: —
notes:      "Builder: rendi come 4 step numerati con icona statica, non come card hover. La lista che segue è la lista da renderizzare."

### item 1
label:      "Lavorazione balestre"
body:       "Riparazione e sostituzione balestre per autocarri e rimorchi."
source_confidence: 0.7

### item 2
label:      "Saldature specialistiche"
body:       "Saldature su telai, scocche e componenti meccanici di veicoli industriali."
source_confidence: 0.7

### item 3
label:      "Servizio climatizzazione"
body:       "Manutenzione, ricarica e riparazione impianti di climatizzazione cabine veicoli industriali."
source_confidence: 0.7

### item 4
label:      "Trasmissioni idrauliche e attrezzature movimento terra"
body:       "Servizio su trasmissioni idrauliche e attrezzature dedicate ai mezzi movimento terra."
source_confidence: 0.7
```

## 11. About / content block

```
## content-about  (variant: content-about, after services-process)
eyebrow:    "Chi opera"
headline:   "Officina specializzata, non multibrand di passaggio."
body:       "Conte srl è officina specializzata in revisione, riparazione e diagnosi di veicoli industriali e autovetture. Le attrezzature in dotazione coprono l'intero ciclo di verifica e ripristino. La sede è il riferimento operativo per autotrasportatori, flotte e operatori dei trasporti del corridoio Brindisi-Taranto-Lecce."
primary_cta:   —
secondary_cta: —
notes:      "Body 44 parole — entro cap di 45 stretto. Concept rifiuta
            'famiglia Conte' / 'tre generazioni' — non c'è team data e
            il founding_story confidence è 0.5. Restiamo sul fatto operativo."
```

## 12. Codice-trust band (just-before-contact)

Concept richiama "the codice I3 044 1168 must be readable, ideally as set
type". Lo amplifichiamo qui un'ultima volta prima del contact, come
banderuola di chiusura.

```
## codice-band  (ClipMaskReveal, set type oversized)
eyebrow:   —
headline:  "I3 044 1168"
subhead:   "Codice tecnico tachigrafi — Camera di Commercio Brindisi, Unioncamere Metrologia Legale. Verificabile online."
primary_cta:   "Verificate il codice"   → https://www.metrologialegale.unioncamere.it/tachigrafi/centri-tecnici
secondary_cta: —
notes:     "Saffron sul codice. Subhead bone su charcoal. Niente foto."
```

## 13. Contact section

```
## contact-split  (variant: contact-split, 3 phones + 3 emails + map)
eyebrow:    "Dove e come"
headline:   "Tre linee dirette, una sede, orario continuato."
subhead:    "Per fermo macchina e interventi esterni le tre linee sono presidiate negli orari di apertura. Niente form: chiamate, oppure scrivete a una delle tre email."
primary_cta:   "0831 382539"          → tel:+390831382539
secondary_cta: "info@conte-srl.com"   → mailto:info@conte-srl.com
notes:      "Builder rende: 3 phone tiles + 3 email tiles + map tile.
            La copy per ogni tile sta sotto."

### phones
phone_1_label: "Fisso officina"
phone_1_value: "0831 382539"
phone_1_href:  "tel:+390831382539"

phone_2_label: "Cellulare 1 — interventi"
phone_2_value: "333 7076796"
phone_2_href:  "tel:+393337076796"

phone_3_label: "Cellulare 2 — interventi"
phone_3_value: "392 9100093"
phone_3_href:  "tel:+393929100093"

### emails
email_1_label: "Generale"
email_1_value: "info@conte-srl.com"
email_1_href:  "mailto:info@conte-srl.com"

email_2_label: "Magazzino ricambi"
email_2_value: "conte.magazzino@libero.it"
email_2_href:  "mailto:conte.magazzino@libero.it"

email_3_label: "Direzione"
email_3_value: "conte.contesrl@libero.it"
email_3_href:  "mailto:conte.contesrl@libero.it"

### address
line_1: "Conte srl"
line_2: "Via 2 Giugno — Z.I."
line_3: "72013 Ceglie Messapica (BR)"
line_4: "Italia"
maps_label: "Apri in Google Maps"
maps_href:  "https://www.google.com/maps/search/?api=1&query=Conte+srl+Via+2+Giugno+Ceglie+Messapica"
notes: "lat/lng nel brief sono null — builder usa il search-query URL,
        non un embed con coordinate fabbricate."

### hours
heading: "Orario continuato"
weekday_label: "Lun – Ven"
weekday_value: "8:30 – 13:30  ·  15:30 – 19:30"
saturday_label: "Sabato"
saturday_value: "8:30 – 13:00"
sunday_label:   "Domenica"
sunday_value:   "Chiuso"
```

## 14. Global microcopy

```
### Footer (variant: footer-rich)

footer_tagline:   "Officina veicoli industriali — zona industriale Ceglie Messapica, dal 1998 circa."

footer_columns:
  col_1_heading:  "Sede"
  col_1_lines:
    - "Conte srl"
    - "Via 2 Giugno — Z.I."
    - "72013 Ceglie Messapica (BR)"
    - "P.IVA 01943880748"

  col_2_heading:  "Linee dirette"
  col_2_lines:
    - "Fisso 0831 382539"
    - "Cellulare 333 7076796"
    - "Cellulare 392 9100093"

  col_3_heading:  "Email"
  col_3_lines:
    - "info@conte-srl.com"
    - "conte.magazzino@libero.it"
    - "conte.contesrl@libero.it"

  col_4_heading:  "Autorizzazioni"
  col_4_lines:
    - "Centro Tecnico Tachigrafi — codice I3 044 1168"
    - "Camera di Commercio Brindisi · Unioncamere"
    - "DM 10 agosto 2007 — art. 2 lett. i)"
    - "Estensione intelligenti 24/01/2022 · analogici 26/05/2025"
    - "Centro revisioni MCTC"

footer_legal_line:
  "© 2026 Conte srl — P.IVA 01943880748 — sede legale Via 2 Giugno Z.I., 72013 Ceglie Messapica (BR)."

footer_legal_links:
  - label: "Privacy"
    href:  "/privacy"
  - label: "Cookie"
    href:  "/cookie-policy"


### Form labels — NOT USED

— (not used) — concept forbids contact form. Audience non compila form.
La sezione contact espone telefono ed email. Builder: NON istanziare
ContactQuoteForm né form alternativi.


### 404 page

404_eyebrow:  "Errore 404"
404_headline: "Questa pagina non esiste."
404_subhead:  "Tornate alla home, oppure chiamate l'officina al 0831 382539."
404_cta_1:    "Torna alla home"   → /
404_cta_2:    "0831 382539"        → tel:+390831382539


### Cookie banner (demo mode)

cookie_body: "Sito di anteprima — cookie tecnici soltanto. Nessun tracciamento, nessun analytics."
cookie_cta:  "Ho capito"


### Demo banner (demo mode)

demo_body: "Anteprima non indicizzata. URL definitivo in corso di configurazione."
demo_cta:  —


### Aria / accessibility microcopy

aria_nav_main:        "Navigazione principale"
aria_nav_phone_cta:   "Chiama l'officina al numero zero otto tre uno tre otto due cinque tre nove"
aria_logo_link:       "Conte srl — torna alla home"
aria_marquee:         "Elenco autorizzazioni e certificazioni"
aria_chapter_track:   "Cinque capitoli operativi — diagnostica, banco prova freni, revisione meccanica, tachigrafi, interventi esterni"
aria_skip_to_content: "Salta al contenuto"


### Phone format rule

Display: "0831 382539" (spazi, no prefisso visibile)
href:    "tel:+390831382539"  (E.164 con +39)

Display: "333 7076796"  →  href: "tel:+393337076796"
Display: "392 9100093"  →  href: "tel:+393929100093"


### Hours block (canonical — usabile in contact e footer)

"Lun – Ven  8:30 – 13:30  ·  15:30 – 19:30
 Sab        8:30 – 13:00
 Dom        chiuso"
```

## 15. Brand factual claims (≥ 3 must surface on the page)

Builder DEVE far comparire almeno 3 di queste sulla pagina (hero, stats,
trust-heritage, codice-band, footer — la sede preferita è indicata).

```
1. Operativa da oltre 25 anni in zona industriale Ceglie Messapica.
   source: brief.enriched_content.stats[0]  [confidence 0.85]
   render: stats tile #1 + trust-heritage body + footer tagline.
   anchor: "25+ anni"

2. Codice tecnico tachigrafi I3 044 1168 — Camera di Commercio Brindisi,
   Unioncamere.
   source: brief.enriched_content.stats[1] + certifications[0]  [1.0]
   render: stats tile #2 + chapter 04 inline_value + codice-band headline
           + marquee item 1 + footer col_4 line 1.
   anchor: "I3 044 1168" — verbatim, sempre.

3. Tre linee operative dirette (1 fisso + 2 cellulari).
   source: brief.enriched_content.stats[2]  [1.0]
   render: stats tile #3 + contact-split phones + footer col_2.

4. Tachigrafi gestiti — digitali, intelligenti e analogici (DM 10/8/2007
   art. 2 lett. i, estensioni 24/01/2022 e 26/05/2025).
   source: brief.enriched_content.stats[3] + certifications[1..2]  [1.0]
   render: stats tile #4 + chapter 04 body + marquee items 3-5 + footer col_4.

5. Centro revisioni MCTC con opacimetro omologato.
   source: brief.enriched_content.certifications[3..4]  [0.7 / 0.85]
   render: chapter 02 body + marquee item 6 + footer col_4.
   note: confidence 0.7 sul "centro revisioni MCTC" — render come
         affermazione ma SENZA inventare numero di iscrizione MCTC.

6. Sede in Via 2 Giugno, Z.I., Ceglie Messapica (BR) — corridoio
   Brindisi-Taranto-Lecce.
   source: analysis.json.location + brief.about  [1.0 sull'indirizzo,
           0.85 sul corridoio]
   render: trust-heritage body + chapter 05 body + contact-split address
           + footer col_1.

7. P.IVA 01943880748.
   source: analysis.json._notes  [1.0]
   render: footer legal line + footer col_1 line 4.
   note: legale, non marketing.
```

7 fatti verificabili, builder ne renderizza tutti 7 (hero+chain+codice-band+
contact+footer collettivamente). Soglia minima di 3 ampiamente superata.

## 16. Rejections — committed

Frasi specificamente RIFIUTATE, con motivazione. Mirror lato-copy della
section 7 di concept.md.

```
- "Esperienza, precisione e celerità al servizio del cliente"
  → tagline del sito 2008 attuale. Triplet di astratti, zero informazione
    verificabile. Sostituito da "25 anni di mezzi pesanti, un codice
    Unioncamere".

- "La nostra officina è il vostro punto di riferimento"
  → primo-personale plurale + slop B2B italiano. La voce è terza-persona
    impersonale.

- "Costruiamo insieme il vostro futuro su strada"
  → metafora-viaggio + first-person plurale + futuro vuoto. Concept
    section 7 lo vieta esplicitamente.

- "Soluzioni complete per il trasporto pesante"
  → "soluzioni" come suffisso = always-on slop. "Complete" = empty
    intensifier. La pagina elenca lavorazioni reali, non vende
    "soluzioni".

- "Il team di esperti meccanici Conte"
  → niente team data nel brief, niente headshot da concept section 7.
    Inventare un "team" significherebbe stub-with-stock, vietato.

- "Scopri di più sui nostri servizi"
  → CTA generica vietata dalla voice rule #5. Sostituita da imperativi
    specifici: "Verificate l'autorizzazione", "Chiamate il fisso".

- "Hai bisogno di una revisione?"
  → headline-question. Voice è dichiarativa, non conversazionale. Fleet
    manager non ha bisogno di domande retoriche, ha bisogno di un
    codice da verificare.

- "Da sempre al servizio dei trasportatori"
  → "da sempre" è anti-fact (founding_story confidence 0.5 — nemmeno
    Conte sa l'anno esatto). Rispettiamo l'incertezza con "1998 circa"
    e "oltre 25 anni".
```

---

**Memory pulled:**
- amb-turning copy procedural (gmem 20260504_135518_96) — confermato:
  Italian B2B industriale → terza persona impersonale, numbers prima di
  adjectives, mono spec callouts come headline content (qui: il codice
  I3 044 1168 ha lo stesso ruolo).
- conte-srl researcher procedural (gmem 20260504_134055_82) — confermato:
  drop team+testimonials, hero-stats con verificabili numerici, codice
  Unioncamere come trust signal primario.
- conte-srl concept.md section 1 + 7 — voice "officina-floor authority"
  e rejection list applicate verbatim.

**Through-line gut check.** "25 anni, un codice, zero teatro": l'hero la
dichiara, la chain la mostra in 5 capitoli, il chapter 04 e la codice-band
la incidono sul codice, le rejections la difendono. Pass.
