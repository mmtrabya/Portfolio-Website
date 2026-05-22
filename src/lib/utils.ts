import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const headerOffset = window.innerWidth < 768 ? 96 : 112;
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: "smooth" });
}

// Prepends the configured basePath (e.g. "/Portfolio-Website" on GH Pages)
// to a public-asset URL. Plain <a> and href= attributes do NOT get auto-prefixed
// by Next.js — only next/link, next/image, next/router do — so anything referenced
// from a raw <a download> needs this.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export function withBasePath(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE}${path}`;
}
