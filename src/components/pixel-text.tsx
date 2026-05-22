"use client";

import { useEffect, useRef } from "react";
import { useMotionPreference } from "@/lib/use-motion-preference";

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  phase: number;
};

// Red + Gold + Slate palette.
const PALETTES = {
  default: ["#ef4444", "#fbbf24", "#94a3b8"],
  cyan: ["#ef4444", "#dc2626", "#f87171", "#fbbf24"],
  emerald: ["#fbbf24", "#f59e0b", "#fcd34d"],
  warm: ["#ef4444", "#f97316", "#fbbf24"],
} as const;

export function PixelText({
  text,
  height = 180,
  density = 6,
  dotSize = 2.4,
  palette = "default",
  className = "",
  fontWeight = 900,
}: {
  text: string;
  height?: number;
  density?: number;
  dotSize?: number;
  palette?: keyof typeof PALETTES;
  className?: string;
  fontWeight?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { motionEnabled, hydrated } = useMotionPreference();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    let width = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -10000, y: -10000, active: false };
    const colors = [...PALETTES[palette]];
    let running = false;
    let isInView = false;
    const repelR = 90;
    const repelR2 = repelR * repelR;

    const init = () => {
      width = canvas.offsetWidth;
      h = canvas.offsetHeight;
      if (width === 0 || h === 0) return;
      canvas.width = width * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const oc = document.createElement("canvas");
      oc.width = width;
      oc.height = h;
      const octx = oc.getContext("2d", { willReadFrequently: true });
      if (!octx) return;

      const fontFamily =
        getComputedStyle(canvas).getPropertyValue("--font-inter") ||
        "ui-sans-serif, system-ui, sans-serif";

      // Find a font size that fits the text in the canvas width.
      let fontSize = h * 0.9;
      octx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      let measure = octx.measureText(text).width;
      const maxW = width * 0.96;
      if (measure > maxW) {
        fontSize = fontSize * (maxW / measure);
        octx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
        measure = octx.measureText(text).width;
      }

      octx.fillStyle = "white";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillText(text, width / 2, h / 2);

      const img = octx.getImageData(0, 0, width, h).data;
      const next: Particle[] = [];
      for (let y = 0; y < h; y += density) {
        for (let x = 0; x < width; x += density) {
          const idx = (y * width + x) * 4 + 3;
          if (img[idx] > 128) {
            const color = colors[(x + y) % colors.length];
            next.push({
              x: width / 2 + (Math.random() - 0.5) * width,
              y: h + Math.random() * h,
              tx: x,
              ty: y,
              vx: 0,
              vy: 0,
              color,
              size: dotSize + Math.random() * 0.8,
              phase: Math.random() * Math.PI * 2,
            });
          }
        }
      }
      particles = next;
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, h);

      for (const p of particles) {
        // Repulsion from cursor.
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < repelR2 && d2 > 1) {
            const d = Math.sqrt(d2);
            const force = (1 - d / repelR) * 3.2;
            p.vx += (dx / d) * force;
            p.vy += (dy / d) * force;
          }
        }
        // Spring back to target.
        p.vx += (p.tx - p.x) * 0.06;
        p.vy += (p.ty - p.y) * 0.06;
        // Damping.
        p.vx *= 0.84;
        p.vy *= 0.84;
        // Update.
        p.x += p.vx;
        p.y += p.vy;
        // Subtle idle shimmer.
        p.phase += 0.04;
        const alpha = 0.78 + 0.12 * Math.sin(p.phase);
        // Draw.
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active =
        mouse.x >= -repelR &&
        mouse.x <= width + repelR &&
        mouse.y >= -repelR &&
        mouse.y <= h + repelR;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isInView = entry.isIntersecting;
          if (isInView) start();
          else stop();
        }
      },
      { threshold: 0.05 }
    );

    const onResize = () => {
      init();
    };

    init();
    observer.observe(canvas);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, [text, density, dotSize, palette, fontWeight]);

  // Reduced-motion: render static heading instead.
  if (hydrated && !motionEnabled) {
    return (
      <div
        className={`grid place-items-center ${className}`}
        style={{ height }}
      >
        <span
          className="text-text-glow font-black uppercase tracking-tight text-text-primary"
          style={{ fontSize: `${Math.min(height * 0.6, 96)}px` }}
        >
          {text}
        </span>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full ${className}`}
      style={{ height }}
      aria-label={text}
      role="img"
    />
  );
}
