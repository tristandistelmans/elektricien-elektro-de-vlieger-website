/**
 * LinkCard — Elegante kaart met hover-animatie en achtergrond-afbeelding
 *
 * Bron: 21st.dev (card-26)
 * Type: Kaart / link component
 * Stijl: Minimaal, elegant, serif typografie
 * Wanneer gebruiken: Social media links, partner links, portfolio items
 * Past bij niches: Creatieve bedrijven, designers, portfolio's
 *
 * Dependencies: framer-motion
 * Props: title, description, imageUrl, href
 */
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LinkCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  className?: string;
}

export function LinkCard({ className, title, description, imageUrl, href }: LinkCardProps) {
  return (
    <motion.a
      href={href} target="_blank" rel="noopener noreferrer"
      className={cn('group relative flex h-80 w-full max-w-sm flex-col justify-between overflow-hidden rounded-2xl border bg-bg p-6 shadow-sm', className)}
      initial={{ scale: 1, y: 0 }}
      whileHover={{ scale: 1.03, y: -5, transition: { type: 'spring' as const, stiffness: 300, damping: 15 } }}
      aria-label={`Link naar ${title}`}
    >
      <div className="z-10">
        <h3 className="mb-2 font-serif text-3xl font-medium tracking-tight">{title}</h3>
        <p className="max-w-[80%] text-sm text-text-muted">{description}</p>
      </div>
      <div className="absolute bottom-0 right-0 h-48 w-48 translate-x-1/4 translate-y-1/4 transform">
        <motion.img src={imageUrl} alt={`${title}`} className="h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-110" />
      </div>
    </motion.a>
  );
}
