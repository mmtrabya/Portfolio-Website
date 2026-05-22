"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border-subtle">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-xs text-text-secondary">
          © {year} Mohammed Tarabay. Built with Next.js, Framer Motion &amp;
          Tailwind.
        </p>
        <div className="flex items-center gap-2">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid h-8 w-8 place-items-center rounded-md border border-border-subtle text-text-secondary hover:border-accent-cyan hover:text-accent-cyan"
          >
            <Github className="h-3.5 w-3.5" />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid h-8 w-8 place-items-center rounded-md border border-border-subtle text-text-secondary hover:border-accent-cyan hover:text-accent-cyan"
          >
            <Linkedin className="h-3.5 w-3.5" />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Email"
            className="grid h-8 w-8 place-items-center rounded-md border border-border-subtle text-text-secondary hover:border-accent-cyan hover:text-accent-cyan"
          >
            <Mail className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
