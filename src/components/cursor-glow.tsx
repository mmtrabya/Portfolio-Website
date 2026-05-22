"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "glow-enabled";

export function CursorGlow() {
  const [enabled, setEnabled] = useState(true);
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) setEnabled(stored === "true");

    const onMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    const onToggle = (e: Event) => {
      const detail = (e as CustomEvent<boolean>).detail;
      // Defer state update so callers' commit phase isn't disturbed.
      queueMicrotask(() => {
        setEnabled(detail);
      });
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("glow:toggle", onToggle as EventListener);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("glow:toggle", onToggle as EventListener);
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
        background:
          "radial-gradient(circle, var(--cursor-glow) 0%, transparent 60%)",
        transition: "background 0.2s",
        mixBlendMode: "screen",
      }}
    />
  );
}
