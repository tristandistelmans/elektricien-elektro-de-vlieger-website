"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, FadeInOnScroll } from "@/components/ui";
import type { ClientConfig, GalleryData } from "@/types/client";

interface GalleryProps {
  data: GalleryData;
  variant: string;
  config: ClientConfig;
}

function Masonry({ data }: GalleryProps) {
  return (
    <section id="gallery" className="py-24 lg:py-32">
      <Container>
        <FadeInOnScroll direction="none">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted mb-6">
            Ons werk
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text tracking-tight leading-[1.05] mb-14">
            Recente{" "}
            <span className="font-serif italic font-normal">realisaties</span>
          </h2>
        </FadeInOnScroll>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {data.images.map((image, i) => (
            <FadeInOnScroll key={i} delay={i * 0.08} direction="none">
              <div className="break-inside-avoid mb-4 group relative overflow-hidden rounded-lg cursor-pointer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                {image.caption && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end">
                    <p className="p-5 text-sm font-medium text-white opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      {image.caption}
                    </p>
                  </div>
                )}
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Carousel({ data }: GalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="gallery" className="py-24 lg:py-32">
      <Container>
        <FadeInOnScroll direction="none">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted mb-6">
            Ons werk
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text tracking-tight leading-[1.05] mb-14">
            Recente{" "}
            <span className="font-serif italic font-normal">realisaties</span>
          </h2>
        </FadeInOnScroll>
      </Container>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 lg:px-8 pb-4 no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {data.images.map((image, i) => (
          <motion.div
            key={i}
            className="shrink-0 w-[85vw] sm:w-[55vw] lg:w-[40vw] snap-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div className="aspect-[3/2] rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
            {image.caption && (
              <p className="mt-4 text-sm text-text-muted">{image.caption}</p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function GridOverlay({ data }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 lg:py-32">
      <Container>
        <FadeInOnScroll direction="none">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted mb-6">
            Ons werk
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text tracking-tight leading-[1.05] mb-14">
            Recente{" "}
            <span className="font-serif italic font-normal">realisaties</span>
          </h2>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.images.map((image, i) => (
            <FadeInOnScroll key={i} delay={i * 0.06} direction="none">
              <button
                onClick={() => setLightboxIndex(i)}
                className="group relative aspect-[4/3] rounded-lg overflow-hidden w-full block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                {/* Overlay that slides up from bottom */}
                <div className="absolute inset-0 flex items-end">
                  <div className="w-full bg-gradient-to-t from-black/60 via-black/20 to-transparent p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    {image.caption && (
                      <p className="text-sm font-medium text-white">
                        {image.caption}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            </FadeInOnScroll>
          ))}
        </div>
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50"
              onClick={() => setLightboxIndex(null)}
              aria-label="Sluiten"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <motion.div
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-5xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.images[lightboxIndex].src}
                alt={data.images[lightboxIndex].alt}
                className="w-full h-full object-contain rounded-lg"
              />
              {data.images[lightboxIndex].caption && (
                <p className="mt-4 text-center text-white/60 text-sm">
                  {data.images[lightboxIndex].caption}
                </p>
              )}
            </motion.div>

            {/* Navigation */}
            {lightboxIndex > 0 && (
              <button
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(lightboxIndex - 1);
                }}
                aria-label="Vorige"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
            )}
            {lightboxIndex < data.images.length - 1 && (
              <button
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(lightboxIndex + 1);
                }}
                aria-label="Volgende"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function Gallery(props: GalleryProps) {
  switch (props.variant) {
    case "carousel":
      return <Carousel {...props} />;
    case "grid-overlay":
      return <GridOverlay {...props} />;
    case "masonry":
    default:
      return <Masonry {...props} />;
  }
}
