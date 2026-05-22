"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "motion-enabled";

export function useMotionPreference() {
  const [hydrated, setHydrated] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(true);

  useEffect(() => {
    setHydrated(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (stored !== null) {
      setMotionEnabled(stored === "true");
    } else {
      setMotionEnabled(!prefersReducedMotion);
    }
  }, []);

  const toggleMotion = () => {
    setMotionEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };

  return { hydrated, motionEnabled, toggleMotion };
}
