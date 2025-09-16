import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
//The cn utility function is basically a helper for building Tailwind class strings safely and cleanly.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
