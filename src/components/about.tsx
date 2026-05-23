"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ABOUT_BODY,
  ABOUT_HEADLINE,
  NOW_BODY,
  NOW_LABEL,
  QUICK_FACTS,
} from "@/lib/data";
import { Section, SectionLabel, SectionPixelTitle } from "./section";
import { useMotionPreference } from "@/lib/use-motion-preference";

const OFFSETS = [
  { x: -60, y: -30, rotate: -8 },
  { x: 50, y: -40, rotate: 6 },
  { x: -40, y: 50, rotate: 5 },
  { x: 60, y: 30, rotate: -6 },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

export function About() {
  const { hydrated, motionEnabled } = useMotionPreference();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const animate = hydrated && motionEnabled;

  return (
    <Section id="about" className="space-y-10">
      <SectionPixelTitle text="ABOUT" icon="user" palette="default" />
      <div className="space-y-3">
        <SectionLabel>About</SectionLabel>
        <h2>{ABOUT_HEADLINE}</h2>
        <p className="max-w-3xl text-text-secondary">{ABOUT_BODY}</p>
      </div>

      <motion.div
        ref={ref}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={animate ? stagger : undefined}
        initial={animate ? "hidden" : false}
        animate={animate && inView ? "visible" : undefined}
      >
        {QUICK_FACTS.map((fact, i) => {
          const o = OFFSETS[i % OFFSETS.length];
          const variants = animate
            ? {
                hidden: {
                  opacity: 0,
                  x: o.x,
                  y: o.y,
                  scale: 0.85,
                  rotate: o.rotate,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotate: 0,
                  transition: { type: "spring" as const, stiffness: 180, damping: 22 },
                },
              }
            : undefined;
          return (
            <motion.div
              key={fact.label}
              variants={variants}
              className="glass-panel p-5 transition-transform hover:-translate-y-1 hover:shadow-glow"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
                {fact.label}
              </p>
              <p className="mt-2 font-semibold text-text-primary">{fact.value}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="glass-panel p-6 transition-transform hover:-translate-y-1 hover:shadow-glow">
        <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
          {NOW_LABEL}
        </p>
        <p className="mt-2 text-base leading-relaxed text-text-secondary sm:text-lg">
          {NOW_BODY}
        </p>
      </div>
    </Section>
  );
}
