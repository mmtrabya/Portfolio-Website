"use client";

import { motion } from "framer-motion";
import {
  Award,
  ExternalLink,
  GraduationCap,
  ScrollText,
  Trophy,
} from "lucide-react";
import { Section, SectionLabel, SectionPixelTitle } from "./section";
import { AWARDS, CERTIFICATIONS, EDUCATION } from "@/lib/data";
import { useMotionPreference } from "@/lib/use-motion-preference";
import { cn } from "@/lib/utils";

const CATEGORY_TONE = {
  Competition: "border-accent-amber/40 bg-accent-amber/10 text-accent-amber",
  "Student Activities":
    "border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan",
  Award: "border-accent-emerald/40 bg-accent-emerald/10 text-accent-emerald",
} as const;

export function Education() {
  const { hydrated, motionEnabled } = useMotionPreference();
  const animate = hydrated && motionEnabled;

  return (
    <Section id="education" className="space-y-10">
      <SectionPixelTitle text="EDUCATION" icon="graduation" palette="default" />
      <div className="space-y-3">
        <SectionLabel>Education & Achievements</SectionLabel>
        <h2>Foundations and recognition</h2>
      </div>

      {/* Schools */}
      <div className="grid gap-5 lg:grid-cols-2">
        {EDUCATION.map((e) => (
          <motion.div
            key={e.school}
            initial={animate ? { opacity: 0, y: 12 } : false}
            whileInView={animate ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.4 }}
            className="glass-panel p-6"
          >
            <div className="flex items-start gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-cyan/10 text-accent-cyan">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <a
                  href={e.schoolUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-lg font-semibold text-text-primary hover:text-accent-cyan"
                >
                  {e.school} <ExternalLink className="h-3 w-3" />
                </a>
                <p className="text-sm text-accent-cyan">{e.degree}</p>
                <p className="text-xs text-text-secondary">
                  {e.year} · GPA {e.gpa}
                </p>
                {e.details && (
                  <p className="mt-3 text-sm text-text-secondary">
                    {e.details}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Achievements */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-accent-amber" />
          <h3 className="text-base font-semibold text-text-primary">
            Achievements & Honors
          </h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {AWARDS.map((a, i) => (
            <motion.div
              key={a.title}
              initial={animate ? { opacity: 0, y: 12 } : false}
              whileInView={animate ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="glass-panel relative flex h-full flex-col gap-3 p-5"
            >
              <div className="flex items-start justify-between gap-2">
                <Award className="h-5 w-5 shrink-0 text-accent-amber" />
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider",
                    CATEGORY_TONE[a.category]
                  )}
                >
                  {a.category}
                </span>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold leading-tight text-text-primary">
                  {a.title}
                </p>
                <p className="text-xs text-text-secondary">
                  {a.issuer} · {a.year}
                </p>
              </div>
              <p className="text-xs leading-relaxed text-text-secondary">
                {a.details}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <motion.div
        initial={animate ? { opacity: 0, y: 12 } : false}
        whileInView={animate ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.4 }}
        className="glass-panel p-6"
      >
        <div className="flex items-center gap-2">
          <ScrollText className="h-4 w-4 text-accent-emerald" />
          <h3 className="text-base font-semibold text-text-primary">
            Certifications ({CERTIFICATIONS.length})
          </h3>
        </div>
        <ul className="mt-4 grid gap-x-6 gap-y-2 md:grid-cols-2">
          {CERTIFICATIONS.map((c) => (
            <li
              key={c.title + c.issuer + (c.certificateId ?? "")}
              className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border-subtle/60 pb-2 last:border-0"
            >
              <div className="min-w-0 flex-1">
                {c.url ? (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-text-primary hover:text-accent-cyan"
                  >
                    {c.title}
                  </a>
                ) : (
                  <span className="text-sm font-medium text-text-primary">
                    {c.title}
                  </span>
                )}
                <p className="text-xs text-text-secondary">{c.issuer}</p>
              </div>
              <span className="text-xs text-text-secondary">
                {c.issueDate ?? ""}
                {c.expiryDate ? ` — ${c.expiryDate}` : ""}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </Section>
  );
}
