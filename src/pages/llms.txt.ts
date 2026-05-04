import type { APIRoute } from 'astro';
import { site, chapters, complementaryServices, phones, emails } from '../data/placeholder';

export const GET: APIRoute = () => {
  const chapterList = chapters
    .map((c) => `- ${c.number} ${c.headline.replace(/\.$/, '')}: ${c.body}`)
    .join('\n');

  const compList = complementaryServices
    .map((s) => `- ${s.label}: ${s.body}`)
    .join('\n');

  const phoneList = phones.map((p) => `- ${p.label}: ${p.value}`).join('\n');
  const emailList = emails.map((e) => `- ${e.label}: ${e.value}`).join('\n');

  const content = `# ${site.name}

> ${site.tagline}

${site.description}

## Centro tecnico tachigrafi — codice I3 044 1168

Conte srl è centro tecnico autorizzato Camera di Commercio Brindisi —
Unioncamere Metrologia Legale, codice identificativo I3 044 1168.
Autorizzazione DM 10 agosto 2007 art. 2 lett. i), con estensione
ai tachigrafi intelligenti dal 24/01/2022 e analogici dal 26/05/2025.
Verifica pubblica: https://www.metrologialegale.unioncamere.it/tachigrafi/centri-tecnici

## La chain operativa

${chapterList}

## Lavorazioni complementari

${compList}

## Contatti

### Telefoni

${phoneList}

### Email

${emailList}

### Sede

- Conte srl
- Via 2 Giugno — Z.I.
- 72013 Ceglie Messapica (BR), Italia
- P.IVA 01943880748

### Orari

- Lun – Ven: 8:30 – 13:30 / 15:30 – 19:30
- Sabato: 8:30 – 13:00
- Domenica: chiuso

## Pages

- Home: ${site.url}
- Privacy: ${site.url}privacy
- Cookie policy: ${site.url}cookie-policy
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
