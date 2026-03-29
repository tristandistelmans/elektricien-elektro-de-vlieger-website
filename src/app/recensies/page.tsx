"use client";

import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { reviews } from "@/lib/data";

export default function Recensies() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative bg-bg-alt py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.25em] text-accent font-medium mb-6">Recensies</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-[4.5vw] font-black tracking-tight leading-[1.1] max-w-3xl">
              Wat klanten zeggen
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-text-muted text-lg">9/10 op Google</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-bg py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-16">
            {reviews.map((review, i) => (
              <Reveal key={review.author} delay={0.1 * i}>
                <div className="max-w-3xl">
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-text leading-[1.3] tracking-tight mb-8">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-px bg-text" />
                    <div>
                      <p className="text-base font-medium text-text">{review.author}</p>
                      <p className="text-sm text-text-muted">{review.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
