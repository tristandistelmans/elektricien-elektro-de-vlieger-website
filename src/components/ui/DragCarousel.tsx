"use client";

import { useRef, useEffect, useCallback } from "react";

interface DragCarouselProps {
  children: React.ReactNode;
  gap?: number;
  className?: string;
}

export function DragCarousel({ children, gap = 24, className = "" }: DragCarouselProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Once we know the width of one set of children, keep scroll in the middle copy
  const clamp = useCallback(() => {
    const el = outerRef.current;
    if (!el || !innerRef.current) return;
    // Each "set" is exactly 1/3 of scrollWidth because we render children 3×
    const setWidth = el.scrollWidth / 3;
    if (setWidth === 0) return;

    if (el.scrollLeft >= setWidth * 2) {
      el.scrollLeft -= setWidth;
    } else if (el.scrollLeft < setWidth * 0.05) {
      el.scrollLeft += setWidth;
    }
  }, []);

  // Initialise scroll to middle copy
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    // Wait one frame for layout
    requestAnimationFrame(() => {
      const setWidth = el.scrollWidth / 3;
      el.scrollLeft = setWidth;
    });
  }, [children]);

  // Listen to scroll for looping
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const onScroll = () => clamp();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [clamp]);

  // Mouse drag
  const onPointerDown = (e: React.PointerEvent) => {
    const el = outerRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
    el.style.scrollBehavior = "auto";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !outerRef.current) return;
    const dx = e.clientX - startX.current;
    outerRef.current.scrollLeft = scrollLeft.current - dx;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!outerRef.current) return;
    isDragging.current = false;
    outerRef.current.releasePointerCapture(e.pointerId);
    outerRef.current.style.cursor = "grab";
    outerRef.current.style.scrollBehavior = "";
  };

  return (
    <div
      ref={outerRef}
      className={`overflow-x-scroll scrollbar-hide cursor-grab select-none ${className}`}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" as never, scrollBehavior: "auto" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <div ref={innerRef} className="flex w-max" style={{ gap: `${gap}px` }}>
        {children}
        {children}
        {children}
      </div>
    </div>
  );
}
