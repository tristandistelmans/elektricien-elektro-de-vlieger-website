"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/lib/data";

export default function Realisaties() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative bg-bg-alt py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.25em] text-accent font-medium mb-6">Realisaties</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-[4.5vw] font-black tracking-tight leading-[1.1] max-w-3xl">
              Ons werk in beeld
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-text-muted text-lg leading-relaxed max-w-xl">
              Van luxe interieurs tot zonnepaneelinstallaties. Bekijk een selectie van onze realisaties.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="bg-bg py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {projects.map((project, i) => (
              <Reveal key={project.title + i} delay={0.05 * (i % 3)}>
                <div className="break-inside-avoid group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl">
                    <Image
                      src={project.src}
                      alt={project.title}
                      width={800}
                      height={800}
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="text-sm font-bold text-white">{project.title}</p>
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
