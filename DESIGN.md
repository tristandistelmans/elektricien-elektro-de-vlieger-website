# Design Referenties & Richtlijnen

## Kernprincipe: Elegantie door terughoudendheid

Elke website die we bouwen moet visueel op het niveau liggen van de referentie-sites hieronder. Geen AI-template gevoel, geen generieke componenten. Handgemaakt gevoel met premium uitstraling.

---

## Referentie-websites

### Vakmannen / Dienstverleners
| URL | Wat er goed aan is |
|-----|-------------------|
| https://somervilles.co.uk/ | Prachtige typografie, asymmetrische layouts, warm kleurenpalet, veel whitespace |
| https://uneevo.com/ | Strakke hero met grote headline + italic accent, minimale navigatie, elegant |
| https://www.atuin.media/en/ | Full-bleed hero met video, staggered animaties, premium feel |
| https://www.icomat.co.uk/ | Industrieel maar elegant, sterke typografische hierarchie |

### Gezondheid / Wellness
| URL | Wat er goed aan is |
|-----|-------------------|
| https://aventuradentalarts.com/ | Warm en uitnodigend, grote foto's, persoonlijke uitstraling |
| https://coreatelierpilates.com/ | Minimalistisch, serif accenten, veel lucht, lifestyle fotografie |
| https://www.soundphysicians.com/ | Professioneel maar persoonlijk, clean layout, subtiele animaties |

### Corporate / Tech
| URL | Wat er goed aan is |
|-----|-------------------|
| https://www.nexomics.org/ | Wetenschappelijk maar accessible, grote headlines, clean grid |
| https://www.abtc.com/ | Zakelijk maar warm, goede balans tekst/beeld |

---

## Design DNA

### Typografie
- **Headlines:** `text-5xl md:text-7xl lg:text-8xl` (48px → 72px → 96px) — NOOIT kleiner
- **Selectieve italics:** Eén kernwoord in de headline in een serif italic font (Playfair Display)
- **Body text:** `text-base lg:text-lg` met `leading-relaxed` (1.625)
- **Letter-spacing:** `tracking-tight` op headlines, `tracking-normal` op body
- **Font pairing:** Sans-serif (Inter/DM Sans) voor body + Serif (Playfair Display) voor accenten

### Layout
- **Asymmetrisch:** Tekst neemt 5 kolommen, beeld neemt 7 (of omgekeerd). Nooit 50/50.
- **Full-width secties** afgewisseld met `max-w-6xl` content blokken
- **Verticale ritme:** Secties hebben `py-24 lg:py-32` minimum, sommige `py-32 lg:py-44`
- **Offset elementen:** Foto's die buiten het grid vallen, tekst die niet uitlijnt met de foto

### Kleur
- **Minimaal:** Zwart/wit/grijs + 1 accentkleur (amber, teal, navy, groen)
- **Fotografie als kleur:** Hoge kwaliteit foto's doen het visuele zware werk
- **Muted tinten:** Gebruik `text-text-muted` voor secundaire tekst, niet een andere kleur
- **Geen gradiënten, geen glassmorphism, geen schaduwen op cards**

### Animaties
- **Scroll-triggered reveals:** `whileInView` met `translateY(20px)` → `translateY(0)`
- **Staggered delays:** Kinderen animeren met 0.1s-0.15s vertraging
- **Cubic-bezier easing:** `[0.25, 0.4, 0.25, 1]` — vloeiender dan linear
- **Hover states:** Subtiel — text underline, lichte kleurshift, scale(1.02) max
- **Duur:** 0.5s-0.8s voor reveals, 0.2s-0.3s voor hover

### Witruimte
- **Minimum padding:** `py-24` per sectie, liever `py-32`
- **Geen "volproppen":** Als een sectie maar 3 items heeft, geef ze de ruimte
- **Tussenruimte items:** `gap-12 lg:gap-16` minimum in grids
- **Marges:** `my-2` nooit — gebruik `my-4` of meer

### Navigatie
- **Header:** Transparant op load → solide met `backdrop-blur` bij scroll
- **Items:** Maximaal 4-5 nav items + 1 CTA button
- **Mobile:** Full-screen overlay met animatie, niet een sidebar
- **CTA in nav:** Altijd aanwezig, opvallend maar niet schreeuwerig

### Content
- **NOOIT generiek:** "Wij leveren kwaliteit" → "Jan lost uw elektriciteit op binnen 24 uur"
- **Specifieke getallen:** "15 jaar ervaring", "400+ klanten", "Binnen 24u antwoord"
- **Testimonials met naam + context:** "Jan D., verbouwing in Gent" — niet alleen "Jan D."
- **Over sectie:** Persoonlijk verhaal, niet een bedrijfsbeschrijving

---

## Per niche: Welke referentie past best

| Niche | Primaire referentie | Stijl |
|-------|-------------------|-------|
| Elektricien/Loodgieter/Schilder | somervilles.co.uk | Warm, vakmanschap, eerlijk |
| Kapper/Schoonheidssalon | coreatelierpilates.com | Minimaal, lifestyle, serif accenten |
| Restaurant/Bakkerij | atuin.media | Vol sfeer, grote foto's, warm |
| Tandarts/Kinesist | aventuradentalarts.com | Uitnodigend, vertrouwen, clean |
| Advocaat/Consultant | nexomics.org | Professioneel, strak, serieus |
| Trainer/Coach | coreatelierpilates.com | Persoonlijk, energie, transformatie |

---

## Workflow: Referenties gebruiken

1. **Voordat je begint:** Open de referentie-site die past bij de niche
2. **Match het niveau:** Jouw output moet visueel op hetzelfde niveau liggen
3. **Kopieer niet letterlijk:** Gebruik dezelfde *principes* (typografie, witruimte, layout), niet het exacte design
4. **Check jezelf:** Zou iemand €2000 betalen voor wat je net gebouwd hebt? Zo niet → opnieuw.
