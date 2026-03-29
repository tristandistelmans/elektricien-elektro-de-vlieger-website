"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/data";

export default function DienstDetailClient({ slug }: { slug: string }) {
  const service = services.find((s) => s.slug === slug);
  const currentIndex = services.findIndex((s) => s.slug === slug);
  const nextService = services[(currentIndex + 1) % services.length];

  if (!service) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <p className="text-text-muted">Dienst niet gevonden.</p>
      </div>
    );
  }

  return (
    <div className="pt-24">
      {/* Back link */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-8">
        <Link href="/diensten" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Alle diensten
        </Link>
      </div>

      {/* Hero */}
      <section className="bg-bg py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <Reveal>
                <p className="text-sm uppercase tracking-[0.25em] text-accent font-medium mb-6">Diensten</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="text-4xl sm:text-5xl md:text-[4vw] font-black tracking-tight leading-[1.1] mb-8">
                  {service.title}
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-text-muted text-lg leading-relaxed">
                  {service.description}
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <Link
                  href="/contact"
                  className="mt-8 group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-[#10113d] transition-all duration-300 hover:scale-105"
                >
                  Offerte aanvragen
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>

            <Reveal direction="right" delay={0.2}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="bg-bg-alt py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.25em] text-accent font-medium mb-4">Wat we doen</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-12">
              Dit mag u verwachten
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.details.map((detail, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <div className="flex items-start gap-4 p-6 bg-bg rounded-xl">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-text leading-relaxed">{detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#10113d] py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
              Interesse in {service.title.toLowerCase()}?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
              Neem vrijblijvend contact op voor advies of een offerte op maat.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-[#10113d] transition-all duration-300 hover:scale-105"
            >
              Neem contact op
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Next service */}
      <section className="bg-bg py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Link href={`/diensten/${nextService.slug}`} className="group flex items-center justify-between py-6 border-t border-border">
            <div>
              <p className="text-sm text-text-muted mb-1">Volgende dienst</p>
              <p className="text-2xl font-bold text-text group-hover:text-accent transition-colors">{nextService.title}</p>
            </div>
            <ArrowRight className="h-6 w-6 text-text-muted group-hover:text-accent group-hover:translate-x-2 transition-all" />
          </Link>
        </div>
      </section>
    </div>
  );
}
