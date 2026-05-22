"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./button";
import { InlineTerminal } from "./terminal";
import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  NAME,
  TAGLINE,
  TAGS,
} from "@/lib/data";
import { useMotionPreference } from "@/lib/use-motion-preference";
import { scrollToSection } from "@/lib/utils";

export function Hero() {
  const { hydrated, motionEnabled } = useMotionPreference();
  const enableMotion = hydrated && motionEnabled;
  const hoverProps = enableMotion ? { y: -3, scale: 1.01 } : undefined;
  const spring = { type: "spring" as const, stiffness: 360, damping: 24, mass: 0.35 };

  return (
    <section
      id="home"
      className="mx-auto w-full max-w-6xl scroll-mt-28 px-4 pb-12 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border-subtle bg-bg-secondary/80 px-6 py-10 shadow-soft sm:px-10">
        <div
          aria-hidden
          className="absolute inset-0 animate-gradient bg-gradient-hero opacity-80 dark:opacity-100"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-20 mix-blend-overlay dark:opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,.15) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6 lg:max-w-xl">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-emerald/30 bg-accent-emerald/10 px-3 py-1 text-accent-emerald">
                <span className="relative grid h-2 w-2 place-items-center">
                  <span className="absolute h-2 w-2 animate-ping rounded-full bg-accent-emerald/60" />
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald" />
                </span>
                Open to roles · Feb 2026
              </span>
              {TAGS.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>

            <h1>
              Hi, I’m <span className="text-accent-cyan text-glow">{NAME}</span>
            </h1>
            <p className="text-base text-text-secondary sm:text-lg">{TAGLINE}</p>

            <InlineTerminal />

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <motion.div
                  whileHover={hoverProps}
                  transition={spring}
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={() => scrollToSection("projects")}
                  >
                    View Projects
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={hoverProps}
                  transition={spring}
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={() => scrollToSection("contact")}
                  >
                    Contact Me
                  </Button>
                </motion.div>
              </div>

              <div className="flex items-center gap-2 text-text-secondary sm:gap-3">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border-subtle text-text-secondary transition-colors hover:border-accent-cyan hover:text-accent-cyan"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border-subtle text-text-secondary transition-colors hover:border-accent-cyan hover:text-accent-cyan"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  aria-label="Email"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border-subtle text-text-secondary transition-colors hover:border-accent-cyan hover:text-accent-cyan"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="order-first flex justify-center lg:order-last">
            <Portrait />
          </div>
        </div>
      </div>
    </section>
  );
}

function Portrait() {
  const [errored, setErrored] = useState(false);
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-full bg-accent-cyan/20 blur-3xl"
      />
      <div className="relative h-56 w-56 overflow-hidden rounded-full border border-border-subtle bg-bg-secondary shadow-glow sm:h-64 sm:w-64 lg:h-72 lg:w-72">
        {!errored ? (
          <Image
            src="/portrait.jpg"
            alt={`Portrait of ${NAME}`}
            fill
            sizes="(min-width: 1024px) 18rem, (min-width: 640px) 16rem, 14rem"
            className="object-cover"
            priority
            onError={() => setErrored(true)}
          />
        ) : (
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 h-full w-full"
            aria-label={`Portrait of ${NAME}`}
          >
            <defs>
              <linearGradient id="bg-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0.3" />
                <stop offset="50%" stopColor="var(--accent-emerald)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="var(--accent-amber)" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="text-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--accent-cyan)" />
                <stop offset="100%" stopColor="var(--accent-emerald)" />
              </linearGradient>
            </defs>
            <rect width="200" height="200" fill="url(#bg-grad)" />
            <text
              x="100"
              y="118"
              textAnchor="middle"
              fontFamily="var(--font-jetbrains), monospace"
              fontWeight="700"
              fontSize="64"
              fill="url(#text-grad)"
            >
              MT
            </text>
            <text
              x="100"
              y="148"
              textAnchor="middle"
              fontFamily="var(--font-jetbrains), monospace"
              fontWeight="400"
              fontSize="10"
              fill="var(--text-secondary)"
              letterSpacing="2"
            >
              AI · DEVOPS · ROBOTICS
            </text>
          </svg>
        )}
      </div>
    </div>
  );
}
