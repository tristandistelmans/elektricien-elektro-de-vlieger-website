import { clsx, type ClassValue } from "clsx";

// Lightweight cn utility - just uses clsx (no tailwind-merge needed for our use case)
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
