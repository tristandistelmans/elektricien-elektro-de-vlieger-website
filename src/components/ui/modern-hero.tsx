"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function ModernHero() {
  return (
    <header className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="/images/hero-combined.jpg"
          alt="Elektro De Vlieger"
          fill
          className="object-cover object-[50%_40%]"
          priority
        />
      </div>

      {/* DE VLIEGER logo overlay - positioned at panel/sky horizon */}
      <div className="absolute z-10 top-[35.5%] md:top-[32.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] sm:w-[70%] md:w-[65%] lg:w-[58%]">
        <Image
          src="/images/logo-no-subtitle.png"
          alt="De Vlieger"
          width={1500}
          height={160}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Content */}
      <div className="absolute z-20 text-left px-6 md:px-12 max-w-7xl bottom-28 md:bottom-36 left-0 md:left-8 right-0">
        <motion.h2
          className="text-[#FFC736] font-sans font-black text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-wide leading-tight mb-8 md:mb-10"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Jouw installateur algemene<br className="hidden sm:block" /> elektriciteitswerken in Oost-<br className="hidden sm:block" /> en West-Vlaanderen
        </motion.h2>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Link
            href="/diensten"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-[#FFC736] text-[#10113d] font-sans font-bold text-xs sm:text-sm tracking-widest uppercase rounded hover:bg-[#e6b42f] transition-colors duration-300"
          >
            Onze diensten
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white hover:bg-white hover:text-[#10113d] transition-all duration-300 font-sans font-bold text-xs sm:text-sm tracking-widest uppercase rounded"
          >
            Offerte aanvragen
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-70 animate-bounce z-20">
        <span className="text-[10px] uppercase tracking-widest mb-2 text-gray-400 font-sans">Scroll</span>
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-[#FFC736] to-transparent" />
      </div>
    </header>
  );
}
