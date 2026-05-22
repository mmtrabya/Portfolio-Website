"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Section, SectionLabel, SectionPixelTitle } from "./section";
import { TESTIMONIALS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useMotionPreference } from "@/lib/use-motion-preference";

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const { hydrated, motionEnabled } = useMotionPreference();
  const animate = hydrated && motionEnabled;

  const total = TESTIMONIALS.length;
  const goTo = (next: number, dir: 1 | -1) => {
    setDirection(dir);
    setIdx(((next % total) + total) % total);
  };
  const prev = () => goTo(idx - 1, -1);
  const next = () => goTo(idx + 1, 1);

  const t = TESTIMONIALS[idx];

  return (
    <Section id="testimonials" className="space-y-10">
      <SectionPixelTitle text="TESTIMONIALS" palette="default" />
      <div className="flex items-end justify-between gap-3">
        <div className="space-y-3">
          <SectionLabel>Testimonials</SectionLabel>
          <h2>What teammates say</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="grid h-9 w-9 place-items-center rounded-md border border-border-subtle text-text-secondary hover:border-accent-cyan hover:text-accent-cyan"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="grid h-9 w-9 place-items-center rounded-md border border-border-subtle text-text-secondary hover:border-accent-cyan hover:text-accent-cyan"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.figure
            key={idx}
            custom={direction}
            initial={
              animate
                ? { opacity: 0, x: direction * 30 }
                : false
            }
            animate={animate ? { opacity: 1, x: 0 } : false}
            exit={animate ? { opacity: 0, x: direction * -30 } : undefined}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel relative overflow-hidden p-6 pt-14 sm:p-10 sm:pt-16"
          >
            {/* Small visible quote chip badge (no large watermark) */}
            <span
              aria-hidden
              className="absolute left-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan shadow-glow sm:left-8 sm:top-8"
            >
              <Quote className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <blockquote className="relative ml-0 mt-4 text-base leading-relaxed text-text-secondary sm:text-lg sm:leading-[1.7]">
              {t.quote}
            </blockquote>
            <figcaption className="mt-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  {t.name}
                </p>
                <p className="text-xs text-text-secondary">{t.title}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-text-secondary">
                  {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* Dot pagination */}
      <div className="flex justify-center gap-1.5">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > idx ? 1 : -1)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === idx
                ? "w-8 bg-accent-cyan"
                : "w-1.5 bg-border-subtle hover:bg-text-secondary"
            )}
          />
        ))}
      </div>
    </Section>
  );
}
