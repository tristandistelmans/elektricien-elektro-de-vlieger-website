/**
 * ParticleHero — Canvas particle-systeem met opwaarts bewegende deeltjes
 *
 * Bron: 21st.dev
 * Type: Hero background / decoratief
 * Stijl: Dark, ruimtelijk, elegant
 * Wanneer gebruiken: Premium/luxe uitstraling, subtiele achtergrond
 * Past bij niches: Tech, consultants, premium dienstverleners
 * Niet geschikt voor: Warme/huiselijke niches
 *
 * Dependencies: geen (pure canvas)
 * Props: geen (standalone full-screen component)
 */
"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  fadeDelay: number;
  fadeStart: number;
  fadingOut: boolean;
  reset: () => void;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)

  const createParticle = (canvas: HTMLCanvasElement): Particle => {
    const particle = {
      x: 0, y: 0, speed: 0, opacity: 1, fadeDelay: 0, fadeStart: 0, fadingOut: false,
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() / 5 + 0.1;
        this.opacity = 1;
        this.fadeDelay = Math.random() * 600 + 100;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
      },
      update() {
        this.y -= this.speed;
        if (this.y < 0) this.reset();
        if (!this.fadingOut && Date.now() > this.fadeStart) this.fadingOut = true;
        if (this.fadingOut) {
          this.opacity -= 0.008;
          if (this.opacity <= 0) this.reset();
        }
      },
      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(${255 - (Math.random() * 255) / 2}, 255, 255, ${this.opacity})`;
        ctx.fillRect(this.x, this.y, 0.4, Math.random() * 2 + 1);
      },
    };
    particle.reset();
    particle.y = Math.random() * canvas.height;
    return particle;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particleCount = Math.floor((canvas.width * canvas.height) / 6000);
    particlesRef.current = Array.from({ length: particleCount }, () => createParticle(canvas));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => { p.update(); p.draw(ctx); });
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = Array.from({ length: Math.floor((canvas.width * canvas.height) / 6000) }, () => createParticle(canvas));
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden" style={{ background: "#05060f" }}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter text-center">
          Particle<br />Background
        </h1>
      </div>
    </div>
  );
}
