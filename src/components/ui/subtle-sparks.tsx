"use client";

import { useEffect, useRef } from "react";

interface SubtleSparksProps {
  className?: string;
}

class Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  width: number;
  prevX: number;
  prevY: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 0.5;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed + 0.3;
    this.life = Math.round(Math.random() * 15 + 10);
    this.maxLife = this.life;
    this.width = Math.random() * 1.5 + 0.5;
  }

  update(): boolean {
    this.prevX = this.x;
    this.prevY = this.y;
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.96;
    this.vy *= 0.96;
    this.life--;
    return this.life > 0;
  }

  render(ctx: CanvasRenderingContext2D) {
    const alpha = this.life / this.maxLife;
    ctx.beginPath();
    ctx.globalAlpha = alpha * 0.7;
    ctx.strokeStyle = `rgba(255, 199, 54, ${alpha})`;
    ctx.lineWidth = this.width;
    ctx.moveTo(this.prevX, this.prevY);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  }
}

class MiniBolt {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  segments: { x: number; y: number }[];

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.life = Math.round(Math.random() * 6 + 4);
    this.maxLife = this.life;

    // Short bolt with 3-5 segments
    const count = Math.round(Math.random() * 2 + 3);
    let cx = x;
    let cy = y;
    const dir = Math.random() * Math.PI * 2;
    this.segments = [{ x: cx, y: cy }];
    for (let i = 0; i < count; i++) {
      cx += Math.cos(dir + (Math.random() - 0.5) * 1.5) * (Math.random() * 12 + 6);
      cy += Math.sin(dir + (Math.random() - 0.5) * 1.5) * (Math.random() * 12 + 6);
      this.segments.push({ x: cx, y: cy });
    }
  }

  update(): boolean {
    this.life--;
    return this.life > 0;
  }

  render(ctx: CanvasRenderingContext2D) {
    const alpha = this.life / this.maxLife;
    ctx.beginPath();
    ctx.globalAlpha = alpha * 0.5;
    ctx.strokeStyle = `rgba(255, 220, 100, ${alpha})`;
    ctx.lineWidth = 1;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "rgba(255, 199, 54, 0.4)";
    ctx.moveTo(this.segments[0].x, this.segments[0].y);
    for (let i = 1; i < this.segments.length; i++) {
      ctx.lineTo(this.segments[i].x, this.segments[i].y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Tiny glow at origin
    const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 15);
    glow.addColorStop(0, `rgba(255, 199, 54, ${alpha * 0.25})`);
    glow.addColorStop(1, "rgba(255, 199, 54, 0)");
    ctx.beginPath();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = glow;
    ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function SubtleSparks({ className = "" }: SubtleSparksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    const sparks: Spark[] = [];
    const bolts: MiniBolt[] = [];
    let frame = 0;

    const loop = () => {
      frame++;
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, w, h);

      // Spawn subtle sparks occasionally around the center area
      if (frame % 8 === 0 && Math.random() > 0.4) {
        const x = w * 0.1 + Math.random() * w * 0.8;
        const y = h * 0.2 + Math.random() * h * 0.6;
        sparks.push(new Spark(x, y));
      }

      // Spawn a mini bolt rarely
      if (frame % 30 === 0 && Math.random() > 0.5) {
        const x = w * 0.15 + Math.random() * w * 0.7;
        const y = h * 0.1 + Math.random() * h * 0.8;
        bolts.push(new MiniBolt(x, y));
        // Add sparks at bolt origin
        for (let i = 0; i < 3; i++) {
          sparks.push(new Spark(x + (Math.random() - 0.5) * 4, y + (Math.random() - 0.5) * 4));
        }
      }

      ctx.globalCompositeOperation = "screen";

      for (let i = sparks.length - 1; i >= 0; i--) {
        if (!sparks[i].update()) {
          sparks.splice(i, 1);
        } else {
          sparks[i].render(ctx);
        }
      }

      for (let i = bolts.length - 1; i >= 0; i--) {
        if (!bolts[i].update()) {
          bolts.splice(i, 1);
        } else {
          bolts[i].render(ctx);
        }
      }

      requestAnimationFrame(loop);
    };

    const animId = requestAnimationFrame(loop);

    const handleResize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
