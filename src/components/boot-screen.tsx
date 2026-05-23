"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type BootLine = {
  text: string;
  mobile?: string;
  delay: number;
  color?: "ok" | "warn" | "accent" | "card" | "ready";
};

// dmesg-style boot lines tailored for an AI/DevOps/Robotics engineer.
const LINES: BootLine[] = [
  {
    text: "[    0.000000] mmtrabya: initializing runtime …",
    mobile: "[0.000] initializing runtime …",
    delay: 280,
  },
  {
    text: "[    0.005821] ACPI: RSDP validated, mapping system tables",
    mobile: "[0.005] ACPI: RSDP validated",
    delay: 560,
  },
  {
    text: "[    0.012490] pci 0000:01:00.0: CUDA device detected — RTX 4090",
    mobile: "[0.012] CUDA device — RTX 4090",
    delay: 900,
    color: "accent",
  },
  {
    text: "[    0.019773] kubelet: 3 nodes ready · pods scheduled",
    mobile: "[0.019] kubelet: 3 nodes ready",
    delay: 1240,
    color: "accent",
  },
  {
    text: "[    0.027104] ros2: humble-hawksbill · 14 nodes online",
    mobile: "[0.027] ros2: 14 nodes online",
    delay: 1600,
  },
  {
    text: "[    0.034882] yolov8: weights loaded · onnx-runtime v1.18",
    mobile: "[0.034] yolov8 + onnxrt v1.18",
    delay: 1940,
  },
  {
    text: "[    0.041250] esp32-mesh: v2x mesh formed · 8 peers",
    mobile: "[0.041] v2x mesh · 8 peers",
    delay: 2280,
  },
  {
    text: "[    0.048019] terraform: drift = 0 · plan: 0 to add, 0 to change",
    mobile: "[0.048] terraform drift = 0 ✓",
    delay: 2620,
    color: "ok",
  },
  {
    text: "[    0.053771] argocd: 5 microservices synced · healthy",
    mobile: "[0.053] argocd 5 svc healthy",
    delay: 2940,
    color: "ok",
  },
  {
    text: "[    0.060000] portfolio: all subsystems nominal",
    mobile: "[0.060] all subsystems nominal",
    delay: 3260,
    color: "ok",
  },
  { text: "", delay: 3520 },
  {
    text: "  ┌──────────────────────────────────────────────┐",
    mobile: " ┌──────────────────────────────────┐",
    delay: 3700,
    color: "card",
  },
  {
    text: "  │  Mohammed Tarabay                            │",
    mobile: " │ Mohammed Tarabay                 │",
    delay: 3880,
    color: "card",
  },
  {
    text: "  │  Software Engineer · AI · DevOps · Robotics  │",
    mobile: " │ SWE · AI · DevOps · Robotics     │",
    delay: 4060,
    color: "card",
  },
  {
    text: "  │  Cairo, Egypt · Open Feb 2026                │",
    mobile: " │ Cairo · Open Feb 2026            │",
    delay: 4240,
    color: "card",
  },
  {
    text: "  └──────────────────────────────────────────────┘",
    mobile: " └──────────────────────────────────┘",
    delay: 4420,
    color: "card",
  },
  { text: "", delay: 4720 },
  {
    text: "[    0.071339] ready. transferring control to userspace …",
    mobile: "[0.071] transferring to userspace …",
    delay: 4960,
    color: "ready",
  },
];

const COLOR_CLASS: Record<NonNullable<BootLine["color"]>, string> = {
  ok: "text-accent-emerald",
  warn: "text-accent-amber",
  accent: "text-accent-cyan",
  card: "text-accent-cyan/90",
  ready: "text-accent-emerald font-semibold",
};

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    const timers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisible((v) => Math.max(v, i + 1));
          setProgress(((i + 1) / LINES.length) * 100);
        }, line.delay)
      );
    });
    timers.push(setTimeout(onDone, LINES[LINES.length - 1].delay + 600));
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [visible]);

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-bg-main">
      <MatrixCanvas />
      <div className="relative z-10 w-[min(640px,calc(100vw-32px))]">
        <div className="glass-panel overflow-hidden font-mono">
          <div className="flex items-center gap-2 border-b border-border-subtle px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-emerald" />
            <span className="ml-3 text-[11px] text-text-secondary">
              dmesg — mmtrabya@build-node
            </span>
          </div>
          <div
            ref={scrollRef}
            className="scrollbar-thin max-h-[420px] overflow-y-auto whitespace-pre px-3 py-3 text-[10px] leading-[1.8] sm:px-4 sm:text-xs"
          >
            {LINES.slice(0, visible).map((line, i) => (
              <div key={i} className="loading-line">
                <span className={cn(line.color && COLOR_CLASS[line.color])}>
                  {line.text === ""
                    ? " "
                    : isMobile && line.mobile
                      ? line.mobile
                      : line.text}
                </span>
              </div>
            ))}
            {visible < LINES.length && (
              <span
                aria-hidden
                className="loading-cursor inline-block h-3 w-1.5 bg-accent-emerald"
              />
            )}
          </div>
        </div>
        <div className="mt-4 h-[2px] overflow-hidden rounded-full bg-bg-elevated">
          <div
            className="loading-progress h-full rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = window.innerWidth;
    let h = window.innerHeight;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const cols = Math.ceil(w / 18) + 1;
    const rows = Math.ceil(h / 18) + 1;
    const cells = Array.from({ length: cols * rows }, () => Math.random());
    let t = 0;
    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const v =
            cells[r * cols + c] *
            (0.5 * Math.sin(0.006 * t + 0.14 * c + 0.1 * r) + 0.5);
          if (v > 0.86) {
            ctx.fillStyle = `rgba(6,255,240,${((v - 0.86) / 0.14) * 0.08})`;
            ctx.fillRect(c * 18, r * 18, 17, 17);
          }
        }
      }
      const beam = (0.8 * t) % h;
      const grad = ctx.createLinearGradient(0, beam - 60, 0, beam + 60);
      grad.addColorStop(0, "rgba(244,63,94,0)");
      grad.addColorStop(0.5, "rgba(244,63,94,0.04)");
      grad.addColorStop(1, "rgba(244,63,94,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, beam - 60, w, 120);
      t++;
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden
    />
  );
}
