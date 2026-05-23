"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronDown, MapPin } from "lucide-react";
import { Section, SectionLabel, SectionPixelTitle } from "./section";
import { EXPERIENCE, type Experience as Exp } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useMotionPreference } from "@/lib/use-motion-preference";

const CATEGORY_TONE: Record<NonNullable<Exp["category"]>, string> = {
  Engineering: "border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan",
  Leadership: "border-accent-amber/40 bg-accent-amber/10 text-accent-amber",
  Internship: "border-accent-emerald/40 bg-accent-emerald/10 text-accent-emerald",
};

export function Experience() {
  const { hydrated, motionEnabled } = useMotionPreference();
  const animate = hydrated && motionEnabled;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <Section id="experience" className="space-y-10">
      <SectionPixelTitle text="EXPERIENCE" icon="briefcase" palette="cyan" />
      <div className="space-y-3">
        <SectionLabel>Experience</SectionLabel>
        <h2>Impactful roles</h2>
      </div>

      <div className="relative">
        <div
          aria-hidden
          className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-accent-cyan via-accent-emerald to-accent-amber/40 sm:left-4"
        />
        <ol className="space-y-4">
          {EXPERIENCE.map((exp, i) => {
            const isOpen = openIdx === i;
            const hasDetails =
              (exp.bullets && exp.bullets.length > 0) ||
              (exp.tech && exp.tech.length > 0);
            return (
              <motion.li
                key={exp.company + exp.role}
                initial={animate ? { opacity: 0, x: -16 } : false}
                whileInView={animate ? { opacity: 1, x: 0 } : undefined}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.25) }}
                className="relative pl-10 sm:pl-14"
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-1.5 top-5 h-3 w-3 rounded-full ring-4 ring-bg-main sm:left-2.5",
                    exp.current ? "bg-accent-emerald" : "bg-accent-cyan"
                  )}
                />
                <article className="glass-panel overflow-hidden transition-transform hover:-translate-y-0.5 hover:shadow-glow">
                  <button
                    onClick={() =>
                      hasDetails ? setOpenIdx(isOpen ? null : i) : undefined
                    }
                    className={cn(
                      "flex w-full items-start justify-between gap-3 p-5 text-left",
                      hasDetails && "cursor-pointer"
                    )}
                    aria-expanded={isOpen}
                  >
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold text-text-primary sm:text-lg">
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-emerald/40 bg-accent-emerald/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent-emerald">
                            <span className="relative grid h-1.5 w-1.5 place-items-center">
                              <span className="absolute h-1.5 w-1.5 animate-ping rounded-full bg-accent-emerald/70" />
                              <span className="h-1 w-1 rounded-full bg-accent-emerald" />
                            </span>
                            Current
                          </span>
                        )}
                        {exp.category && (
                          <span
                            className={cn(
                              "rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider",
                              CATEGORY_TONE[exp.category]
                            )}
                          >
                            {exp.category}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="font-medium text-accent-cyan hover:text-accent-emerald"
                          >
                            {exp.company}
                          </a>
                        ) : (
                          <span className="font-medium text-accent-cyan">
                            {exp.company}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 text-text-secondary">
                          <Briefcase className="h-3 w-3" /> {exp.dates}
                        </span>
                        {exp.location && (
                          <span className="inline-flex items-center gap-1 text-text-secondary">
                            <MapPin className="h-3 w-3" /> {exp.location}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary">
                        {exp.summary}
                      </p>
                    </div>
                    {hasDetails && (
                      <ChevronDown
                        className={cn(
                          "mt-1 h-4 w-4 shrink-0 text-text-secondary transition-transform",
                          isOpen && "rotate-180 text-accent-cyan"
                        )}
                      />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && hasDetails && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-3 border-t border-border-subtle/60 px-5 py-4">
                          {exp.bullets && exp.bullets.length > 0 && (
                            <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                              {exp.bullets.map((b, j) => (
                                <li key={j}>{b}</li>
                              ))}
                            </ul>
                          )}
                          {exp.tech && exp.tech.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {exp.tech.map((t) => (
                                <span key={t} className="chip text-[11px]">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
