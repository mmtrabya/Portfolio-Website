"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionLabel, SectionPixelTitle } from "./section";
import { SKILLS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useMotionPreference } from "@/lib/use-motion-preference";

export function Skills() {
  const categories = Object.keys(SKILLS);
  const [active, setActive] = useState(categories[0]);
  const { hydrated, motionEnabled } = useMotionPreference();
  const animate = hydrated && motionEnabled;

  return (
    <Section id="skills" className="space-y-10">
      <SectionPixelTitle text="SKILLS" palette="cyan" />
      <div className="space-y-3">
        <SectionLabel>Skills</SectionLabel>
        <h2>Technologies and expertise across systems, AI and DevOps</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-all",
              active === c
                ? "border-accent-cyan bg-accent-cyan/10 text-accent-cyan"
                : "border-border-subtle text-text-secondary hover:border-accent-cyan/40 hover:text-text-primary"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={animate ? { opacity: 0, y: 8 } : false}
          animate={animate ? { opacity: 1, y: 0 } : false}
          exit={animate ? { opacity: 0, y: -8 } : undefined}
          transition={{ duration: 0.25 }}
          className="flex flex-wrap gap-2"
        >
          {SKILLS[active].map((skill) => (
            <span key={skill.name} className="chip text-sm">
              {skill.name}
            </span>
          ))}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
