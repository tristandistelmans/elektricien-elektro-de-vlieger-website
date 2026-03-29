"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/data";

export default function Diensten() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative bg-bg-alt py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.25em] text-accent font-medium mb-6">Diensten</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-[4.5vw] font-black tracking-tight leading-[1.1] max-w-3xl">
              Wat we voor u doen
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-text-muted text-lg leading-relaxed max-w-xl">
              Van een complete nieuwbouwinstallatie tot zonnepanelen, domotica of een laadpaal.
              Ontdek ons volledige aanbod.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-bg py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={0.1 * (i % 2)}>
                <Link href={`/diensten/${service.slug}`} className="group block">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-text tracking-tight mb-2 group-hover:text-accent transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-text-muted leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all mt-1 flex-shrink-0" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
