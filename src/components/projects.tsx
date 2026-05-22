"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Github, X } from "lucide-react";
import { Section, SectionLabel, SectionPixelTitle } from "./section";
import { PROJECTS, type Project } from "@/lib/data";
import { useMotionPreference } from "@/lib/use-motion-preference";

const cardVariants = (i: number) => ({
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: i * 0.06,
    },
  },
});

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const { hydrated, motionEnabled } = useMotionPreference();
  const animate = hydrated && motionEnabled;

  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <Section id="projects" className="space-y-10">
      <SectionPixelTitle text="PROJECTS" palette="default" />
      <div className="space-y-3">
        <SectionLabel>Projects</SectionLabel>
        <h2>Building systems that last</h2>
        <p className="max-w-3xl text-text-secondary">
          A mix of graduation-grade systems work, DevOps platforms, and AI/ML
          builds. Click any card for problem · approach · results.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {featured.map((p, i) => (
          <motion.div
            key={p.title}
            variants={animate ? cardVariants(i) : undefined}
            initial={animate ? "hidden" : false}
            whileInView={animate ? "visible" : undefined}
            viewport={{ once: true, margin: "-10%" }}
          >
            <ProjectCard p={p} featured onOpen={setOpen} />
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p, i) => (
          <motion.div
            key={p.title}
            variants={animate ? cardVariants(i) : undefined}
            initial={animate ? "hidden" : false}
            whileInView={animate ? "visible" : undefined}
            viewport={{ once: true, margin: "-10%" }}
          >
            <ProjectCard p={p} onOpen={setOpen} />
          </motion.div>
        ))}
      </div>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </Section>
  );
}

function ProjectCard({
  p,
  featured,
  onOpen,
}: {
  p: Project;
  featured?: boolean;
  onOpen: (p: Project) => void;
}) {
  const gradientStyle = {
    background: `linear-gradient(135deg, ${p.gradient.from} 0%, ${p.gradient.via ?? p.gradient.from} 50%, ${p.gradient.to} 100%)`,
  };

  return (
    <button
      onClick={() => onOpen(p)}
      className="group block w-full overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary text-left transition-all hover:-translate-y-1 hover:shadow-glow"
    >
      {/* Gradient hero */}
      <div
        className="relative flex aspect-[2/1] flex-col items-center justify-center overflow-hidden px-6 py-8 text-center"
        style={gradientStyle}
      >
        {/* Subtle dot grid overlay */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-25 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,.4) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Subtle vignette */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"
        />
        <div className="relative space-y-1.5">
          <h3 className="text-3xl font-black tracking-tight text-white drop-shadow-sm sm:text-4xl">
            {p.shortTitle}
          </h3>
          <p className="text-sm font-medium text-white/90 sm:text-base">
            {p.tagline}
          </p>
          {p.metrics && (
            <p className="pt-2 text-[11px] font-mono uppercase tracking-[0.18em] text-white/75">
              {p.metrics}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="truncate text-sm font-semibold text-text-primary group-hover:text-accent-cyan">
              {p.title}
            </h4>
            <p className="text-xs text-text-secondary">{p.role}</p>
          </div>
          <div className="flex items-center gap-2">
            {featured && (
              <span className="rounded-full border border-accent-amber/40 bg-accent-amber/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent-amber">
                Featured
              </span>
            )}
            <ArrowUpRight className="h-4 w-4 shrink-0 text-text-secondary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-cyan" />
          </div>
        </div>

        <p className="line-clamp-2 text-xs text-text-secondary">
          {p.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {p.tech.slice(0, 5).map((t) => (
            <span key={t} className="chip text-[10px]">
              {t}
            </span>
          ))}
          {p.tech.length > 5 && (
            <span className="chip text-[10px]">+{p.tech.length - 5}</span>
          )}
        </div>
      </div>
    </button>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <Dialog.Root open={!!project} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 grid max-h-[85vh] w-[min(720px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary shadow-soft focus:outline-none">
          {project && (
            <div className="flex max-h-[85vh] flex-col">
              <div
                className="relative flex items-end justify-between gap-4 p-6"
                style={{
                  background: `linear-gradient(135deg, ${project.gradient.from} 0%, ${project.gradient.via ?? project.gradient.from} 50%, ${project.gradient.to} 100%)`,
                }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-25 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, rgba(255,255,255,.4) 1px, transparent 0)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="relative">
                  <Dialog.Title className="text-2xl font-black tracking-tight text-white">
                    {project.shortTitle}
                  </Dialog.Title>
                  <Dialog.Description className="text-sm text-white/85">
                    {project.tagline}
                  </Dialog.Description>
                </div>
                <Dialog.Close
                  aria-label="Close"
                  className="relative grid h-8 w-8 place-items-center rounded-md bg-black/30 text-white hover:bg-black/50"
                >
                  <X className="h-4 w-4" />
                </Dialog.Close>
              </div>

              <div className="overflow-y-auto p-6">
                <h3 className="text-lg font-semibold text-text-primary">
                  {project.title}
                </h3>
                <p className="text-sm text-text-secondary">{project.role}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="chip text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 space-y-4 text-sm leading-relaxed text-text-secondary">
                  <Block
                    label="Problem"
                    tone="text-accent-cyan"
                    body={project.details.problem}
                  />
                  <Block
                    label="Approach"
                    tone="text-accent-emerald"
                    body={project.details.approach}
                  />
                  <Block
                    label="Results"
                    tone="text-accent-amber"
                    body={project.details.results}
                  />
                  <div className="rounded-lg border border-border-subtle bg-bg-elevated p-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
                      Outcomes
                    </p>
                    <p className="mt-1 text-text-primary">{project.outcomes}</p>
                  </div>
                </div>

                {project.repo && (
                  <div className="mt-5">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-bg-elevated px-4 py-2 text-sm text-text-primary hover:border-accent-cyan hover:text-accent-cyan"
                    >
                      <Github className="h-4 w-4" /> View on GitHub
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Block({
  label,
  tone,
  body,
}: {
  label: string;
  tone: string;
  body: string;
}) {
  return (
    <div>
      <p className={`text-xs uppercase tracking-[0.2em] ${tone}`}>{label}</p>
      <p className="mt-1">{body}</p>
    </div>
  );
}
