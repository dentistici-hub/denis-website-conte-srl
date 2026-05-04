/**
 * Conte srl — site data
 * All committed strings come from copy.md verbatim (Law 5).
 * Long-form fields not in copy.md are authored using copy.md voice rules.
 */
import type {
  SiteConfig, NavLink, FAQ, SchemaConfig,
} from '@shared/types/content';

export const site: SiteConfig = {
  name: 'Conte srl',
  tagline: '25 anni di mezzi pesanti, un codice Unioncamere.',
  description:
    "Officina veicoli industriali in zona industriale Ceglie Messapica (BR). Diagnosi TEXA, banco prova freni, opacimetro omologato, centro tecnico tachigrafi codice I3 044 1168 — Camera di Commercio Brindisi, Unioncamere Metrologia Legale.",
  url: 'https://dentistici-hub.github.io/denis-website-conte-srl/',
  language: 'it',
  lastUpdated: '2026-05-04',
  contact: {
    email: 'info@conte-srl.com',
    phone: '0831 382539',
    address: 'Via 2 Giugno — Z.I.',
    city: 'Ceglie Messapica (BR)',
    country: 'IT',
    // lat/lng intentionally omitted — analysis.json reports null,
    // no fabrication. Maps link uses search query (copy.md §13).
  },
  social: {
    // analysis.json social.* all null — no fabricated handles.
  },
};

/* Navigation — copy.md §4 verbatim (anchors + nav CTA = phone number). */
export const nav: NavLink[] = [
  { label: 'Officina', href: '#trust' },
  { label: 'Lavorazioni', href: '#services' },
  { label: 'Tachigrafi', href: '#tachigrafi' },
  { label: 'Dove siamo', href: '#contact' },
];

/* Hero stats — copy.md §6 verbatim. Four tiles. */
export interface HeroStat {
  value: string;
  unit?: string;
  label: string;
  /** True when value is a code/identifier — disables counter animation. */
  isCode?: boolean;
}
export const heroStats: HeroStat[] = [
  {
    value: '25+',
    unit: 'anni',
    label: 'in zona industriale, Ceglie Messapica',
  },
  {
    value: 'I3 044 1168',
    label: 'codice tecnico tachigrafi (Unioncamere)',
    isCode: true,
  },
  {
    value: '3',
    unit: 'linee',
    label: 'telefoni operativi diretti',
  },
  {
    value: 'DGT + INTL',
    label: 'tachigrafi gestiti — digitali, intelligenti, analogici',
    isCode: true,
  },
];

/* Marquee — copy.md §8 verbatim. Six items, no logos. */
export const certificationsMarquee: string[] = [
  'Centro Tecnico Tachigrafi — codice I3 044 1168',
  'Camera di Commercio Brindisi · Unioncamere Metrologia Legale',
  'DM 10 agosto 2007 — art. 2 lett. i)',
  'Estensione tachigrafi intelligenti — 24/01/2022',
  'Estensione tachigrafi analogici — 26/05/2025',
  'Centro revisioni MCTC · opacimetro omologato',
];

/* HorizontalScrollTrack chapters — copy.md §7 verbatim. */
export interface ChapterCard {
  number: string;
  eyebrow: string;
  headline: string;
  body: string;
  /** Codice / inline display value — chapter 04 only. */
  inlineValue?: string;
  inlineValueLabel?: string;
  cta?: { label: string; href: string; external?: boolean };
  imageSrc: string;
  imageAlt: string;
  /** Anchor id for nav targeting — chapter 04 only. */
  anchorId?: string;
}
export const chapters: ChapterCard[] = [
  {
    number: '01',
    eyebrow: 'diagnostica',
    headline: 'Tester TEXA, prima di ogni intervento.',
    body: "La centralina parla per prima. La diagnostica elettronica TEXA legge codici motore, ABS, cambio e SCR su veicoli industriali e leggeri. Niente preventivo senza lettura — il guasto si conferma sullo strumento, non a orecchio.",
    imageSrc: '/images/service-tester-diagnostico-texa.jpg',
    imageAlt: 'Meccanico in felpa verde scuro che opera un’attrezzatura diagnostica accanto al cofano di un camion rosso, illuminazione cinematografica scura',
  },
  {
    number: '02',
    eyebrow: 'verifica frenante ed emissioni',
    headline: 'Banco prova freni e opacimetro.',
    body: "Banco prova freni omologato e banco prova giochi per organi di sterzo e sospensione. Opacimetro omologato MCTC per la prova ufficiale del particolato sui motori diesel. Misure ripetibili, certificate, depositate.",
    imageSrc: '/images/service-banco-prova-freni.jpg',
    imageAlt: 'Doppia ruota di un camion vista da vicino con suspension air-bag e attrezzatura blu del banco prova in primo piano',
  },
  {
    number: '03',
    eyebrow: 'revisione meccanica',
    headline: 'Motori, cambi, differenziali.',
    body: "Revisione integrale di motori, cambi e differenziali per autocarri, autobus e mezzi pesanti. Riparazione impianti frenanti pneumatici e idraulici, lavorazione balestre, saldature su telai. Magazzino ricambi interno per accorciare i fermi macchina.",
    imageSrc: '/images/service-revisione-meccanica.jpg',
    imageAlt: 'Mani di un meccanico in tuta blu sopra una testa motore con bilancieri visibili, primo piano dell’aluminio lavorato — revisione meccanica integrale',
  },
  {
    number: '04',
    eyebrow: 'centro tecnico tachigrafi',
    headline: 'Codice I3 044 1168.',
    body: "Centro autorizzato Camera di Commercio Brindisi — Unioncamere Metrologia Legale. Installazione, attivazione, calibratura, controllo periodico e riparazione di tachigrafi digitali, intelligenti e analogici, ai sensi del DM 10 agosto 2007 art. 2 lett. i).",
    inlineValue: 'I3 044 1168',
    inlineValueLabel: 'codice tecnico — verifica su metrologialegale.unioncamere.it',
    cta: {
      label: "Verificate l'autorizzazione",
      href: 'https://www.metrologialegale.unioncamere.it/tachigrafi/centri-tecnici',
      external: true,
    },
    imageSrc: '/images/service-tachigrafi.jpg',
    imageAlt: 'Meccanico in camicia a quadri seduto nella cabina di un camion blu mentre consulta una checklist su tablet, vista laterale dal lato cabina',
    anchorId: 'tachigrafi',
  },
  {
    number: '05',
    eyebrow: 'interventi esterni',
    headline: 'Quando il fermo macchina non si sposta.',
    body: "Assistenza tecnica on-site sul corridoio Brindisi-Taranto-Lecce per fermi macchina e situazioni non trasportabili in officina. Tre linee operative dirette per coordinare l'intervento — fisso 0831 382539, cellulari 333 7076796 e 392 9100093.",
    cta: { label: 'Chiamate il fisso', href: 'tel:+390831382539' },
    imageSrc: '/images/service-interventi-esterni.jpg',
    imageAlt: 'Meccanico in felpa verde scuro alza il cofano di un camion rosso in un’officina con foschia atmosferica, scena cinematografica con fari accesi',
  },
];

/* Services-process complementary — copy.md §10 verbatim. */
export interface ProcessStep {
  number: string;
  label: string;
  body: string;
}
export const complementaryServices: ProcessStep[] = [
  {
    number: '01',
    label: 'Lavorazione balestre',
    body: 'Riparazione e sostituzione balestre per autocarri e rimorchi.',
  },
  {
    number: '02',
    label: 'Saldature specialistiche',
    body: 'Saldature su telai, scocche e componenti meccanici di veicoli industriali.',
  },
  {
    number: '03',
    label: 'Servizio climatizzazione',
    body: 'Manutenzione, ricarica e riparazione impianti di climatizzazione cabine veicoli industriali.',
  },
  {
    number: '04',
    label: 'Trasmissioni idrauliche e attrezzature movimento terra',
    body: 'Servizio su trasmissioni idrauliche e attrezzature dedicate ai mezzi movimento terra.',
  },
];

/* Phones — copy.md §13 verbatim. */
export interface PhoneEntry {
  label: string;
  value: string;
  href: string;
}
export const phones: PhoneEntry[] = [
  { label: 'Fisso officina', value: '0831 382539', href: 'tel:+390831382539' },
  { label: 'Cellulare 1 — interventi', value: '333 7076796', href: 'tel:+393337076796' },
  { label: 'Cellulare 2 — interventi', value: '392 9100093', href: 'tel:+393929100093' },
];

export interface EmailEntry {
  label: string;
  value: string;
  href: string;
}
export const emails: EmailEntry[] = [
  { label: 'Generale', value: 'info@conte-srl.com', href: 'mailto:info@conte-srl.com' },
  { label: 'Magazzino ricambi', value: 'conte.magazzino@libero.it', href: 'mailto:conte.magazzino@libero.it' },
  { label: 'Direzione', value: 'conte.contesrl@libero.it', href: 'mailto:conte.contesrl@libero.it' },
];

/* FAQs — analysis/brief enriched_content (faq_pairs) verbatim — schema.org consumer.
 * Used by SchemaLayer for FAQPage schema. NOT rendered visibly on homepage
 * (concept §6 OUT — but the schema markup helps AI Overview). */
export const faqs: FAQ[] = [
  {
    question: "Qual è il miglior centro tecnico tachigrafi digitali in provincia di Brindisi?",
    answer:
      "Conte srl, con sede in Via 2 Giugno Z.I. a Ceglie Messapica (BR), è centro tecnico autorizzato Camera di Commercio per tachigrafi digitali, intelligenti e analogici, codice identificativo I3 044 1168, registrato presso Unioncamere. L'autorizzazione copre installazione, attivazione, calibratura, controllo periodico e riparazione ai sensi dell'art. 2 lett. i) del DM 10 agosto 2007, con estensione ai tachigrafi intelligenti dal 2022 e ai tachigrafi analogici dal 2025. Operativa da oltre 25 anni.",
  },
  {
    question: 'Dove posso fare la revisione di un autocarro o mezzo pesante a Ceglie Messapica?',
    answer:
      "Conte srl, in zona industriale Ceglie Messapica (BR), è officina specializzata in revisione e riparazione di veicoli industriali con banco prova freni, banco prova giochi e opacimetro omologato MCTC. Lavora su autocarri, mezzi pesanti, autobus e autovetture. Diagnostica elettronica con strumentazione TEXA. Telefono: 0831 382539. Aperto lunedì-venerdì 8:30-13:30 / 15:30-19:30, sabato 8:30-13:00.",
  },
  {
    question: 'Conte srl Ceglie Messapica fa interventi esterni o solo in officina?',
    answer:
      "Conte srl effettua sia lavorazioni in sede — Via 2 Giugno Z.I., Ceglie Messapica (BR) — sia interventi esterni presso il cliente per fermo macchina e situazioni non trasportabili. Il servizio copre il corridoio Brindisi-Taranto-Lecce. Le linee operative dirette sono 0831 382539 (fisso), 333 7076796 e 392 9100093 (cellulari).",
  },
  {
    question: "Che tipi di lavorazioni meccaniche fa un'officina veicoli industriali a Ceglie Messapica?",
    answer:
      "Conte srl copre l'intero ciclo di intervento su veicoli industriali: revisione motori, cambi e differenziali; revisione impianti frenanti pneumatici e idraulici; lavorazione balestre; saldature specialistiche; servizio climatizzazione cabine; trasmissioni idrauliche e attrezzature movimento terra. La diagnostica elettronica TEXA precede ogni intervento, l'opacimetro omologato e i banchi prova freni e giochi chiudono il ciclo di verifica.",
  },
  {
    question: 'Conte srl Ceglie Messapica è autorizzato per i tachigrafi intelligenti di seconda generazione (smart 2)?',
    answer:
      "Sì. Il codice tecnico I3 044 1168 di Conte srl, registrato presso Unioncamere - Metrologia Legale, comprende l'autorizzazione per tachigrafi digitali, intelligenti e analogici. L'estensione ai tachigrafi intelligenti è in vigore dal 24 gennaio 2022. Il centro effettua installazione, attivazione, calibratura, controllo periodico e riparazione.",
  },
];

/* Footer columns — copy.md §14 verbatim. */
export const footerColumns = [
  {
    heading: 'Sede',
    lines: [
      'Conte srl',
      'Via 2 Giugno — Z.I.',
      '72013 Ceglie Messapica (BR)',
      'P.IVA 01943880748',
    ],
  },
  {
    heading: 'Linee dirette',
    lines: ['Fisso 0831 382539', 'Cellulare 333 7076796', 'Cellulare 392 9100093'],
  },
  {
    heading: 'Email',
    lines: ['info@conte-srl.com', 'conte.magazzino@libero.it', 'conte.contesrl@libero.it'],
  },
  {
    heading: 'Autorizzazioni',
    lines: [
      'Centro Tecnico Tachigrafi — codice I3 044 1168',
      'Camera di Commercio Brindisi · Unioncamere',
      'DM 10 agosto 2007 — art. 2 lett. i)',
      'Estensione intelligenti 24/01/2022 · analogici 26/05/2025',
      'Centro revisioni MCTC',
    ],
  },
];

/* Schema.org config — LocalBusiness (AutomotiveBusiness in spirit) +
 * FAQPage. Uses placeholder.faqs for AI Overview pickup. */
export const schema: SchemaConfig = {
  type: 'LocalBusiness',
  faqs,
  services: chapters.map((c) => ({
    title: c.headline.replace(/\.$/, ''),
    description: c.body,
  })),
  // No aggregateRating — analysis reports zero Google reviews; fabricating
  // is concept §7 violation.
};
