"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

export default function OverOns() {
  return (
    <div className="pt-24">
      {/* Hero banner */}
      <section className="relative bg-bg-alt py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.25em] text-accent font-medium mb-6">Over ons</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-[4.5vw] font-black tracking-tight leading-[1.1] max-w-3xl">
              Elektriciteit zit in{" "}
              <span className="accent-italic text-accent">de familie</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Verhaal */}
      <section className="bg-bg py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <Reveal>
                <p className="text-text-muted text-lg leading-relaxed">
                  Robbe De Vlieger groeide op tussen de kabels en verdeelkasten. Wat begon als meehelpen
                  in het familiebedrijf van zijn vader Christ, groeide uit tot een eigen onderneming
                  met meer dan 14 jaar ervaring in het vak.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-text-muted text-lg leading-relaxed">
                  Vanuit Maldegem bedient Robbe klanten in heel Oost- en West-Vlaanderen. Van een
                  complete nieuwbouwinstallatie tot zonnepanelen, domotica of een laadpaal - elk
                  project krijgt dezelfde aandacht en zorg.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 text-text-muted text-lg leading-relaxed">
                  Als RESCert gecertificeerd installateur staat kwaliteit voorop. Geen halve maatregelen,
                  geen compromissen. Elk project wordt opgeleverd volgens de strengste normen, met oog voor
                  detail en netheid.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="mt-6 text-text-muted text-lg leading-relaxed">
                  Wat Elektro De Vlieger anders maakt? Persoonlijk contact. U belt rechtstreeks met Robbe,
                  niet met een callcenter. Korte communicatielijnen, snelle reactietijd en altijd bereikbaar.
                  Dat is de belofte.
                </p>
              </Reveal>
            </div>

            <Reveal direction="right" delay={0.2}>
              <div className="relative">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/robbe.png"
                    alt="Robbe De Vlieger"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-accent/30 rounded-2xl -z-10" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-bg-alt py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-3 gap-6">
              <Counter value={14} suffix="+" label="Jaar ervaring" />
              <Counter value={3} suffix="" label="Vakmensen" />
              <Counter value={9} suffix="/10" label="Klantscore" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Waarden */}
      <section className="bg-bg py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.25em] text-accent font-medium mb-4">Onze waarden</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl sm:text-5xl md:text-[4.5vw] font-black tracking-tight mb-16">
              Waar we voor staan
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Betrouwbaarheid", text: "Afspraak is afspraak. We komen op tijd, communiceren helder en leveren wat we beloven. Geen verrassingen." },
              { title: "Vakmanschap", text: "14 jaar ervaring, RESCert gecertificeerd en altijd op de hoogte van de nieuwste technieken en normen." },
              { title: "Persoonlijk contact", text: "U belt rechtstreeks met Robbe. Korte lijnen, snelle reactietijd en altijd bereikbaar - ook in het weekend." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={0.15 * i}>
                <div>
                  <h3 className="text-2xl font-bold text-text mb-4">{item.title}</h3>
                  <p className="text-text-muted leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
