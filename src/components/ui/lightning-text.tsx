"use client";

import React, { useEffect, useRef, useCallback } from "react";

class TextRenderer {
  size: number;
  copy: string;
  color: string;
  delay: number;
  basedelay: number;
  bound: TextMetrics & { height: number };
  x: number;
  y: number;
  data: ImageData;
  index: number;

  constructor(
    options: { size?: number; copy?: string; color?: string; delay?: number },
    canvasWidth: number,
    canvasHeight: number
  ) {
    const pool = document.createElement("canvas");
    const buffer = pool.getContext("2d")!;
    pool.width = canvasWidth;
    pool.height = canvasHeight;
    buffer.fillStyle = "#000000";
    buffer.fillRect(0, 0, pool.width, pool.height);

    this.size = options.size || 100;
    this.copy = (options.copy || "DE VLIEGER") + " ";
    this.color = options.color || "#C5A059";
    this.delay = options.delay || 2;
    this.basedelay = this.delay;

    buffer.font = `900 ${this.size}px "Montserrat", sans-serif`;
    const metrics = buffer.measureText(this.copy);
    this.bound = Object.assign(metrics, { height: this.size * 1.5 });

    this.x = canvasWidth * 0.5 - this.bound.width * 0.5;
    this.y = canvasHeight * 0.5 - this.bound.height * 0.5;

    buffer.strokeStyle = this.color;
    buffer.lineWidth = 2;
    buffer.strokeText(this.copy, 0, this.bound.height * 0.8);
    this.data = buffer.getImageData(0, 0, Math.ceil(this.bound.width), Math.ceil(this.bound.height));
    this.index = 0;
  }

  update(thunder: Thunder[], particles: Particles[]) {
    if (this.index >= this.bound.width) {
      this.index = 0;
      return;
    }

    const data = this.data.data;
    for (let i = this.index * 4; i < data.length; i += 4 * this.data.width) {
      const bitmap = data[i] + data[i + 1] + data[i + 2] + data[i + 3];
      if (bitmap > 255 && Math.random() > 0.94) {
        const x = this.x + this.index;
        const y = this.y + i / this.data.width / 4;
        thunder.push(new Thunder({ x, y }));
        if (Math.random() > 0.3) {
          particles.push(new Particles({ x, y }));
        }
      }
    }

    if (this.delay-- < 0) {
      this.index += 2;
      this.delay += this.basedelay;
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.putImageData(this.data, this.x, this.y, 0, 0, this.index, this.bound.height);
  }
}

class Thunder {
  lifespan: number;
  maxlife: number;
  color: string;
  glow: string;
  x: number;
  y: number;
  width: number;
  segments: { direct: number; length: number; change: number }[];

  constructor(options: Partial<{ lifespan: number; color: string; glow: string; x: number; y: number; width: number; direct: number; max: number }> = {}) {
    this.lifespan = options.lifespan || Math.round(Math.random() * 10 + 10);
    this.maxlife = this.lifespan;
    this.color = options.color || "#fefefe";
    this.glow = options.glow || "#C5A059";
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 2;
    const direct = options.direct || Math.random() * Math.PI * 2;
    const max = options.max || Math.round(Math.random() * 10 + 20);
    this.segments = [...new Array(max)].map(() => ({
      direct: direct + (Math.PI * Math.random() * 0.2 - 0.1),
      length: Math.random() * 20 + 80,
      change: Math.random() * 0.04 - 0.02,
    }));
  }

  update(index: number, array: Thunder[]) {
    this.segments.forEach((s) => {
      s.direct += s.change;
      if (Math.random() > 0.96) s.change *= -1;
    });
    if (this.lifespan > 0) {
      this.lifespan--;
    } else {
      array.splice(index, 1);
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.lifespan <= 0) return;

    ctx.beginPath();
    ctx.globalAlpha = this.lifespan / this.maxlife;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width;
    ctx.shadowBlur = 32;
    ctx.shadowColor = this.glow;
    ctx.moveTo(this.x, this.y);

    let prev = { x: this.x, y: this.y };
    this.segments.forEach((s) => {
      const x = prev.x + Math.cos(s.direct) * s.length;
      const y = prev.y + Math.sin(s.direct) * s.length;
      prev = { x, y };
      ctx.lineTo(x, y);
    });

    ctx.stroke();
    ctx.closePath();
    ctx.shadowBlur = 0;

    const strength = Math.random() * 80 + 40;
    const light = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, strength);
    light.addColorStop(0, "rgba(197, 160, 89, 0.6)");
    light.addColorStop(0.1, "rgba(197, 160, 89, 0.2)");
    light.addColorStop(0.4, "rgba(197, 160, 89, 0.06)");
    light.addColorStop(0.65, "rgba(197, 160, 89, 0.01)");
    light.addColorStop(0.8, "rgba(197, 160, 89, 0)");

    ctx.beginPath();
    ctx.fillStyle = light;
    ctx.arc(this.x, this.y, strength, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

class Spark {
  x: number;
  y: number;
  v: { direct: number; weight: number; friction: number };
  a: { change: number; min: number; max: number };
  g: { direct: number; weight: number };
  width: number;
  lifespan: number;
  maxlife: number;
  color: string;
  prev: { x: number; y: number };

  constructor(options: Partial<{ x: number; y: number }> = {}) {
    this.x = options.x || 0;
    this.y = options.y || 0;
    const direct = Math.random() * Math.PI * 2;
    this.v = { direct, weight: Math.random() * 14 + 2, friction: 0.88 };
    this.a = { change: Math.random() * 0.4 - 0.2, min: direct - Math.PI * 0.4, max: direct + Math.PI * 0.4 };
    this.g = { direct: Math.PI * 0.5 + (Math.random() * 0.4 - 0.2), weight: Math.random() * 0.25 + 0.25 };
    this.width = Math.random() * 3;
    this.lifespan = Math.round(Math.random() * 20 + 40);
    this.maxlife = this.lifespan;
    this.color = "#C5A059";
    this.prev = { x: this.x, y: this.y };
  }

  update(index: number, array: Spark[]) {
    this.prev = { x: this.x, y: this.y };
    this.x += Math.cos(this.v.direct) * this.v.weight + Math.cos(this.g.direct) * this.g.weight;
    this.y += Math.sin(this.v.direct) * this.v.weight + Math.sin(this.g.direct) * this.g.weight;
    if (this.v.weight > 0.2) this.v.weight *= this.v.friction;
    this.v.direct += this.a.change;
    if (this.v.direct > this.a.max || this.v.direct < this.a.min) this.a.change *= -1;
    if (this.lifespan > 0) this.lifespan--;
    else array.splice(index, 1);
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.lifespan <= 0) return;
    ctx.beginPath();
    ctx.globalAlpha = this.lifespan / this.maxlife;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.prev.x, this.prev.y);
    ctx.stroke();
    ctx.closePath();
  }
}

class Particles {
  sparks: Spark[];
  constructor(options: Partial<{ x: number; y: number }> = {}) {
    this.sparks = [...new Array(Math.round(Math.random() * 10 + 10))].map(() => new Spark(options));
  }
  update() { this.sparks.forEach((s, i) => s.update(i, this.sparks)); }
  render(ctx: CanvasRenderingContext2D) { this.sparks.forEach((s) => s.render(ctx)); }
}

interface LightningTextProps {
  text?: string;
  className?: string;
}

export default function LightningText({ text = "DE VLIEGER", className = "" }: LightningTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const thunderRef = useRef<Thunder[]>([]);
  const particlesRef = useRef<Particles[]>([]);
  const textRef = useRef<TextRenderer | null>(null);

  const initText = useCallback((w: number, h: number) => {
    const fontSize = Math.min(w * 0.1, 140);
    textRef.current = new TextRenderer({ copy: text, size: fontSize }, w, h);
  }, [text]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    initText(w, h);

    const loop = () => {
      if (!textRef.current) return;
      textRef.current.update(thunderRef.current, particlesRef.current);
      thunderRef.current.forEach((l, i) => l.update(i, thunderRef.current));
      particlesRef.current.forEach((p) => p.update());

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "screen";
      textRef.current.render(ctx);
      thunderRef.current.forEach((l) => l.render(ctx));
      particlesRef.current.forEach((p) => p.render(ctx));

      animationRef.current = requestAnimationFrame(loop);
    };

    loop();

    const handleResize = () => {
      const nw = canvas.offsetWidth;
      const nh = canvas.offsetHeight;
      canvas.width = nw;
      canvas.height = nh;
      initText(nw, nh);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [initText]);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full ${className}`}
    />
  );
}
