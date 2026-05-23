"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "glow-enabled";

// Brand palette as three parallel flat arrays — crimson → gold → electric cyan.
// Flat arrays avoid any tuple/iterator destructuring quirks under Turbopack.
const PAL_R = [244, 252, 6];
const PAL_G = [63, 211, 255];
const PAL_B = [94, 77, 240];
const PAL_N = 3;
const CYCLE_MS = 6000;

function colorAt(phase: number): string {
  // phase in [0, 1)
  const p = phase * PAL_N;
  const i = Math.floor(p) % PAL_N;
  const j = (i + 1) % PAL_N;
  const t = p - Math.floor(p);
  const r = Math.round(PAL_R[i] + (PAL_R[j] - PAL_R[i]) * t);
  const g = Math.round(PAL_G[i] + (PAL_G[j] - PAL_G[i]) * t);
  const b = Math.round(PAL_B[i] + (PAL_B[j] - PAL_B[i]) * t);
  return `${r}, ${g}, ${b}`;
}

export function CursorGlow() {
  const [enabled, setEnabled] = useState(true);
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [hydrated, setHydrated] = useState(false);
  const [rgb, setRgb] = useState("6, 255, 240"); // start cyan
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setHydrated(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) setEnabled(stored === "true");

    const onMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    const onToggle = (e: Event) => {
      const detail = (e as CustomEvent<boolean>).detail;
      queueMicrotask(() => setEnabled(detail));
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("glow:toggle", onToggle as EventListener);

    // Smooth color cycle through the palette.
    const start = performance.now();
    const tick = (now: number) => {
      const phase = ((now - start) % CYCLE_MS) / CYCLE_MS;
      setRgb(colorAt(phase));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("glow:toggle", onToggle as EventListener);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!hydrated || !enabled) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 1,
        left: pos.x - 200,
        top: pos.y - 200,
        width: 400,
        height: 400,
        background: `radial-gradient(circle, rgba(${rgb}, 0.38) 0%, rgba(${rgb}, 0.18) 30%, transparent 65%)`,
        transition: "left 0s, top 0s",
        mixBlendMode: "screen",
        filter: "blur(2px)",
      }}
    />
  );
}
