"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function ModernHero() {
  return (
    <header className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with logo baked in */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="/images/hero-combined.jpg"
          alt="Elektro De Vlieger"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="absolute z-20 text-left px-6 md:px-12 max-w-7xl bottom-36 left-4 md:left-8">
        <motion.h2
          className="text-[#FFC736] font-sans font-black text-3xl md:text-5xl lg:text-6xl tracking-wide leading-tight mb-10 max-w-full w-full"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Jouw installateur algemene elektriciteitswerken in Oost- en West-Vlaanderen
        </motion.h2>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-start"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Link
            href="/diensten"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#FFC736] text-[#10113d] font-sans font-bold text-sm tracking-widest uppercase rounded hover:bg-[#e6b42f] transition-colors duration-300"
          >
            Onze diensten
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#10113d] transition-all duration-300 font-sans font-bold text-sm tracking-widest uppercase rounded"
          >
            Offerte aanvragen
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-70 animate-bounce z-20">
        <span className="text-[10px] uppercase tracking-widest mb-2 text-gray-400 font-sans">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#FFC736] to-transparent" />
      </div>
    </header>
  );
}
