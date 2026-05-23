"use client";

import { useEffect, useRef } from "react";
import { useMotionPreference } from "@/lib/use-motion-preference";

type Particle = {
  x: number;
  y: number;
  // Two target positions — particle lerps between them based on `progress`.
  wordX: number;
  wordY: number;
  iconX: number;
  iconY: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  phase: number;
};

// Cyberpunk palette: crimson + gold + electric cyan.
const PALETTES = {
  default: ["#f43f5e", "#fcd34d", "#06fff0"],
  cyan: ["#06fff0", "#22d3ee", "#67e8f9", "#fcd34d"],
  emerald: ["#fcd34d", "#facc15", "#fde047", "#f43f5e"],
  warm: ["#f43f5e", "#fb7185", "#fcd34d"],
} as const;

/**
 * PixelText with morph: dots form `text` when in view, and morph into the SVG
 * `iconPath` (a `path d=…` string from any Lucide icon) when scrolled away.
 *
 * The mouse-repel scatter still applies on hover.
 */
export function PixelText({
  text,
  iconPath,
  height = 200,
  density = 6,
  dotSize = 2.4,
  palette = "default",
  className = "",
  fontWeight = 900,
}: {
  text: string;
  /** Optional Lucide-style SVG path data (`d` attribute). If provided, the
   *  dots morph into this shape when the section is out of view. */
  iconPath?: string | string[];
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
    const repelR = 90;
    const repelR2 = repelR * repelR;
    // 0 = pure icon shape, 1 = pure word.
    let progress = 0;

    const samplePositions = (drawFn: (ctx: CanvasRenderingContext2D) => void): {
      x: number;
      y: number;
    }[] => {
      const oc = document.createElement("canvas");
      oc.width = width;
      oc.height = h;
      const octx = oc.getContext("2d", { willReadFrequently: true });
      if (!octx) return [];
      drawFn(octx);
      const img = octx.getImageData(0, 0, width, h).data;
      const pts: { x: number; y: number }[] = [];
      for (let y = 0; y < h; y += density) {
        for (let x = 0; x < width; x += density) {
          const idx = (y * width + x) * 4 + 3;
          if (img[idx] > 128) pts.push({ x, y });
        }
      }
      return pts;
    };

    const init = () => {
      width = canvas.offsetWidth;
      h = canvas.offsetHeight;
      if (width === 0 || h === 0) return;
      canvas.width = width * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const fontFamily =
        getComputedStyle(canvas).getPropertyValue("--font-inter") ||
        "ui-sans-serif, system-ui, sans-serif";

      // Word sample.
      const wordPoints = samplePositions((c) => {
        let fontSize = h * 0.9;
        c.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
        let measure = c.measureText(text).width;
        const maxW = width * 0.96;
        if (measure > maxW) {
          fontSize = fontSize * (maxW / measure);
          c.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
        }
        c.fillStyle = "white";
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText(text, width / 2, h / 2);
      });

      // Icon sample (if iconPath provided). Lucide path data uses a 24×24
      // viewBox — we scale & center it.
      const iconPoints = iconPath
        ? samplePositions((c) => {
            const paths = Array.isArray(iconPath) ? iconPath : [iconPath];
            const iconSize = h * 0.7; // smaller than word so morph is clearly different
            const tx = width / 2 - iconSize / 2;
            const ty = h / 2 - iconSize / 2;
            c.save();
            c.translate(tx, ty);
            c.scale(iconSize / 24, iconSize / 24);
            c.fillStyle = "white";
            c.strokeStyle = "white";
            c.lineWidth = 2;
            c.lineJoin = "round";
            c.lineCap = "round";
            for (const d of paths) {
              const p = new Path2D(d);
              c.stroke(p);
              c.fill(p);
            }
            c.restore();
          })
        : wordPoints;

      // Pair points 1:1 — extend the smaller set by sampling extra points.
      const total = Math.max(wordPoints.length, iconPoints.length);
      const wp = (i: number) => wordPoints[i % wordPoints.length];
      const ip = (i: number) => iconPoints[i % iconPoints.length];

      const next: Particle[] = [];
      for (let i = 0; i < total; i++) {
        const w = wp(i);
        const ic = ip(i);
        const color = colors[i % colors.length];
        next.push({
          x: width / 2 + (Math.random() - 0.5) * width,
          y: h + Math.random() * h,
          wordX: w.x,
          wordY: w.y,
          iconX: ic.x,
          iconY: ic.y,
          vx: 0,
          vy: 0,
          color,
          size: dotSize + Math.random() * 0.8,
          phase: Math.random() * Math.PI * 2,
        });
      }
      particles = next;
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, h);

      for (const p of particles) {
        // Lerp target between icon (progress=0) and word (progress=1).
        const tx = p.iconX + (p.wordX - p.iconX) * progress;
        const ty = p.iconY + (p.wordY - p.iconY) * progress;

        // Mouse repulsion.
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
        // Spring toward (lerped) target.
        p.vx += (tx - p.x) * 0.06;
        p.vy += (ty - p.y) * 0.06;
        p.vx *= 0.84;
        p.vy *= 0.84;
        p.x += p.vx;
        p.y += p.vy;

        p.phase += 0.04;
        const alpha = 0.78 + 0.12 * Math.sin(p.phase);
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

    // Visibility → progress. We want:
    //   - When the section title is fully visible (centered-ish) → progress = 1 (word)
    //   - When fully off-screen → progress = 0 (icon)
    // We use intersectionRatio when partially visible, and check scroll
    // position to handle the "fully out" case.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // intersectionRatio is 0..1 — use it directly as progress.
          progress = Math.max(progress, entry.intersectionRatio);
          if (entry.isIntersecting) {
            start();
          } else {
            // When out of view, animate to icon — easing handled inside tick.
            progress = 0;
            // Keep running briefly so the morph animates out before we stop.
            setTimeout(() => {
              if (!entry.isIntersecting) stop();
            }, 800);
          }
        }
      },
      // Multiple thresholds so we get smooth progress updates as the title
      // scrolls in/out.
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0] }
    );

    const onResize = () => init();

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
  }, [text, iconPath, density, dotSize, palette, fontWeight]);

  // Reduced-motion: render a static heading instead of the animated canvas.
  if (hydrated && !motionEnabled) {
    return (
      <div className={`grid place-items-center ${className}`} style={{ height }}>
        <span
          className="font-black uppercase tracking-tight text-text-primary text-glow"
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
