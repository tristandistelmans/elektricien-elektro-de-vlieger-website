"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, ArrowRight } from "lucide-react";

interface VideoHeroProps {
  src: string;
  brandName: string;
  tagline: string;
  cta: { text: string; href: string };
}

export function VideoHero({ src, brandName, tagline, cta }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Probeer geluid aan te zetten zodra gebruiker ergens klikt
  useEffect(() => {
    const unmute = () => {
      if (videoRef.current && videoRef.current.muted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
      document.removeEventListener("click", unmute);
    };
    document.addEventListener("click", unmute);
    return () => document.removeEventListener("click", unmute);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Brand name — outline text */}
        <motion.h1
          className="text-outline text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none select-none uppercase"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {brandName}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="mt-6 max-w-lg text-base md:text-lg text-white/60 font-light tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {tagline}
        </motion.p>

        {/* CTA */}
        <motion.a
          href={cta.href}
          className="mt-10 group inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {cta.text}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </motion.a>
      </div>

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-8 z-20 flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2.5 text-sm transition-colors hover:bg-white/20"
        aria-label={isMuted ? "Geluid aan" : "Geluid uit"}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        {isMuted && <span className="hidden sm:inline">Geluid aan</span>}
      </button>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.div
          className="h-10 w-px bg-white/40"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
