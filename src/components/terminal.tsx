"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  EMAIL,
  EXPERIENCE,
  LOCATION,
  NAME,
  SKILLS,
  TAGLINE,
  GITHUB_URL,
} from "@/lib/data";
import { cn, scrollToSection } from "@/lib/utils";

type Line = { type: "in" | "out" | "blank" | "err"; text: string; cls?: string };

const PRIMARY = "text-text-primary";
const DIM = "text-text-secondary";
const OK = "text-accent-emerald";
const ACCENT = "text-accent-cyan";
const WARN = "text-accent-amber";
const ERR = "text-red-400";

function help(): Line[] {
  const items: [string, string][] = [
    ["help", "list available commands"],
    ["whoami", "who am I"],
    ["skills", "tech stack by category"],
    ["projects", "things I built"],
    ["experience", "career timeline"],
    ["contact", "reach me"],
    ["neofetch", "system info"],
    ["goto <section>", "scroll to section"],
    ["theme", "toggle dark/light"],
    ["clear", "clear terminal"],
  ];
  return items.map(([cmd, desc]) => ({
    type: "out",
    text: `  ${cmd.padEnd(16, " ")} ${desc}`,
    cls: cmd.startsWith("g") || cmd === "theme" || cmd === "clear" || cmd === "neofetch" ? WARN : DIM,
  }));
}

function whoami(): Line[] {
  return [
    { type: "out", text: NAME, cls: `${ACCENT} font-semibold` },
    { type: "out", text: TAGLINE, cls: DIM },
    { type: "out", text: LOCATION, cls: DIM },
  ];
}

function neofetch(): Line[] {
  const role = EXPERIENCE[0]?.role ?? "Software Engineer";
  const company = EXPERIENCE[0]?.company ?? "—";
  const langs = "Python · C/C++ · TypeScript";
  const tools = "Docker · K8s · ROS2";
  const uptime = "2021";
  return [
    { type: "out", text: `  mmtrabya@portfolio`, cls: `${ACCENT} font-semibold` },
    { type: "out", text: "  ─────────────────────────────", cls: DIM },
    { type: "out", text: "  OS      Portfolio v2.0", cls: DIM },
    { type: "out", text: `  Host    ${LOCATION}`, cls: DIM },
    { type: "out", text: "  Kernel  Next.js 16 / React 19", cls: DIM },
    { type: "out", text: "  Shell   Interactive Terminal", cls: DIM },
    { type: "blank", text: "" },
    { type: "out", text: `  Role    ${role}`, cls: DIM },
    { type: "out", text: `  Work    ${company}`, cls: DIM },
    { type: "out", text: `  Lang    ${langs}`, cls: DIM },
    { type: "out", text: `  Tools   ${tools}`, cls: DIM },
    { type: "out", text: `  Since   ${uptime}`, cls: DIM },
    { type: "blank", text: "" },
    { type: "out", text: "  ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓", cls: ACCENT },
  ];
}

function skillsCmd(): Line[] {
  const out: Line[] = [];
  for (const [cat, items] of Object.entries(SKILLS)) {
    out.push({ type: "out", text: `▸ ${cat}`, cls: `${ACCENT} font-semibold` });
    out.push({
      type: "out",
      text: `  ${items.map((s) => s.name).join(", ")}`,
      cls: DIM,
    });
  }
  return out;
}

function projectsCmd(): Line[] {
  return [
    { type: "out", text: "▸ Featured projects", cls: `${ACCENT} font-semibold` },
    { type: "out", text: "  SDV · Smart Transportation System", cls: PRIMARY },
    { type: "out", text: "  DevOps Microservices — Voting App", cls: PRIMARY },
    { type: "out", text: "  SLAM Nurse Robot (ROS2)", cls: PRIMARY },
    { type: "out", text: "  Job Harvest — NLP Job Aggregator", cls: DIM },
    { type: "out", text: "  ResNet50 Plant Disease Detection", cls: DIM },
    { type: "out", text: "  Apache Spark Recommender", cls: DIM },
    { type: "blank", text: "" },
    { type: "out", text: "  scroll to #projects for details", cls: WARN },
  ];
}

function experienceCmd(): Line[] {
  const top = EXPERIENCE.slice(0, 6);
  return [
    { type: "out", text: "▸ Career timeline (recent)", cls: `${ACCENT} font-semibold` },
    ...top.flatMap<Line>((e) => [
      { type: "out", text: `  ${e.role}`, cls: PRIMARY },
      { type: "out", text: `    ${e.company} · ${e.dates}`, cls: DIM },
    ]),
  ];
}

function contactCmd(): Line[] {
  return [
    { type: "out", text: `  mail   ${EMAIL}`, cls: PRIMARY },
    { type: "out", text: `  gh     ${GITHUB_URL}`, cls: DIM },
    { type: "out", text: `  loc    ${LOCATION}`, cls: DIM },
  ];
}

export function InlineTerminal({ className }: { className?: string }) {
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const [history, setHistory] = useState<Line[]>(() => [
    { type: "out", text: "Type `help` for commands. Try `whoami` or `neofetch`.", cls: DIM },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  const run = (raw: string) => {
    const trimmed = raw.trim();
    const echo: Line = {
      type: "in",
      text: `mmtrabya@portfolio:~$ ${trimmed}`,
      cls: PRIMARY,
    };
    if (!trimmed) {
      setHistory((h) => [...h, echo]);
      return;
    }
    const [cmd, ...args] = trimmed.split(/\s+/);

    let result: Line[] = [];
    switch (cmd) {
      case "help":
        result = help();
        break;
      case "whoami":
        result = whoami();
        break;
      case "neofetch":
        result = neofetch();
        break;
      case "skills":
        result = skillsCmd();
        break;
      case "projects":
        result = projectsCmd();
        break;
      case "experience":
      case "xp":
        result = experienceCmd();
        break;
      case "contact":
        result = contactCmd();
        break;
      case "goto": {
        const target = args[0];
        if (target) {
          scrollToSection(target);
          result = [{ type: "out", text: `→ scrolling to #${target}`, cls: OK }];
        } else {
          result = [{ type: "err", text: "usage: goto <section>", cls: ERR }];
        }
        break;
      }
      case "theme": {
        const html = document.documentElement;
        if (html.classList.contains("dark")) {
          html.classList.remove("dark");
          html.classList.add("light");
          localStorage.setItem("theme", "light");
          result = [{ type: "out", text: "theme → light", cls: OK }];
        } else {
          html.classList.remove("light");
          html.classList.add("dark");
          localStorage.setItem("theme", "dark");
          result = [{ type: "out", text: "theme → dark", cls: OK }];
        }
        break;
      }
      case "clear":
        setHistory([]);
        return;
      case "echo":
        result = [{ type: "out", text: args.join(" "), cls: PRIMARY }];
        break;
      case "date":
        result = [{ type: "out", text: new Date().toLocaleString(), cls: DIM }];
        break;
      case "sudo":
        result = args.join(" ").includes("rm -rf")
          ? [{ type: "out", text: "Nice try. 😎", cls: WARN }]
          : [{ type: "err", text: `sudo: ${args[0] ?? "?"}: not found`, cls: ERR }];
        break;
      case "ping":
        result = [{ type: "out", text: `${args[0] || "mmtrabya"}: 0.04ms`, cls: DIM }];
        break;
      default:
        result = [
          {
            type: "err",
            text: `command not found: ${cmd}`,
            cls: ERR,
          },
          { type: "out", text: "type `help` to see available commands", cls: DIM },
        ];
    }
    setHistory((h) => [...h, echo, ...result]);
  };

  return (
    <div
      className={cn(
        "glass-panel relative w-full overflow-hidden font-mono",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-border-subtle px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-emerald" />
        <span className="ml-3 text-[11px] text-text-secondary">
          bash — mmtrabya@portfolio
        </span>
      </div>
      <div
        ref={scrollRef}
        className="scrollbar-thin max-h-72 overflow-y-auto whitespace-pre-wrap px-3 py-3 text-[11px] leading-[1.8] sm:text-xs"
      >
        {history.map((line, i) => (
          <div key={i} className={cn(line.cls)}>
            {line.text || " "}
          </div>
        ))}
        <div className="relative mt-1 flex items-center gap-2">
          <span className="text-accent-emerald">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                run(input);
                setInput("");
              }
            }}
            className="flex-1 bg-transparent text-text-primary outline-none placeholder:text-text-secondary"
            placeholder="type a command (try `help`)"
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
          />
          {!focused && <span className="terminal-cursor" />}
        </div>
      </div>
    </div>
  );
}
