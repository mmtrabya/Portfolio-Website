"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useTheme } from "./theme-provider";
import {
  ArrowUpRight,
  Command,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  NAV_ITEMS,
  RESUME_PATH,
} from "@/lib/data";
import { cn, scrollToSection, withBasePath } from "@/lib/utils";

type Item = {
  id: string;
  label: string;
  hint?: string;
  group: "navigate" | "actions" | "links";
  icon?: React.ReactNode;
  action: () => void;
};

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { resolvedTheme, setTheme } = useTheme();

  const close = () => onOpenChange(false);

  const items = useMemo<Item[]>(() => {
    const navItems: Item[] = NAV_ITEMS.map((n) => ({
      id: `nav-${n.id}`,
      label: `Go to ${n.label}`,
      hint: `#${n.id}`,
      group: "navigate",
      icon: <ArrowUpRight className="h-4 w-4" />,
      action: () => {
        close();
        setTimeout(() => scrollToSection(n.id), 50);
      },
    }));
    const actions: Item[] = [
      {
        id: "act-resume",
        label: "Download résumé",
        hint: "PDF",
        group: "actions",
        icon: <Download className="h-4 w-4" />,
        action: () => {
          const a = document.createElement("a");
          a.href = withBasePath(RESUME_PATH);
          a.download = "";
          a.click();
          close();
        },
      },
      {
        id: "act-theme",
        label:
          resolvedTheme === "dark"
            ? "Switch to light theme"
            : "Switch to dark theme",
        hint: "theme",
        group: "actions",
        icon:
          resolvedTheme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          ),
        action: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          close();
        },
      },
    ];
    const links: Item[] = [
      {
        id: "link-gh",
        label: "Open GitHub",
        hint: "@mmtrabya",
        group: "links",
        icon: <Github className="h-4 w-4" />,
        action: () => {
          window.open(GITHUB_URL, "_blank", "noopener");
          close();
        },
      },
      {
        id: "link-li",
        label: "Open LinkedIn",
        hint: "@themohammedtarabay",
        group: "links",
        icon: <Linkedin className="h-4 w-4" />,
        action: () => {
          window.open(LINKEDIN_URL, "_blank", "noopener");
          close();
        },
      },
      {
        id: "link-mail",
        label: "Email Mohammed",
        hint: EMAIL,
        group: "links",
        icon: <Mail className="h-4 w-4" />,
        action: () => {
          window.location.href = `mailto:${EMAIL}`;
          close();
        },
      },
    ];
    return [...navItems, ...actions, ...links];
  }, [resolvedTheme, setTheme]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (it) =>
        it.label.toLowerCase().includes(q) ||
        it.hint?.toLowerCase().includes(q) ||
        it.group.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) {
      setQuery("");
    } else {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[activeIdx]?.action();
    }
  };

  const groups: { key: Item["group"]; label: string }[] = [
    { key: "navigate", label: "Navigate" },
    { key: "actions", label: "Actions" },
    { key: "links", label: "Links" },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          onKeyDown={onKeyDown}
          className="fixed left-1/2 top-[12vh] z-50 w-[min(640px,calc(100vw-32px))] -translate-x-1/2 overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary shadow-soft focus:outline-none"
        >
          <Dialog.Title className="sr-only">Command palette</Dialog.Title>
          <div className="flex items-center gap-2 border-b border-border-subtle px-4 py-3">
            <Search className="h-4 w-4 text-text-secondary" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sections, actions, links…"
              className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
              autoComplete="off"
            />
            <span className="flex items-center gap-1 rounded border border-border-subtle bg-bg-elevated px-1.5 py-0.5 font-mono text-[10px] text-text-secondary">
              <Command className="h-3 w-3" />K
            </span>
          </div>

          <div className="max-h-[60vh] overflow-y-auto py-2">
            {filtered.length === 0 && (
              <p className="px-4 py-6 text-center text-sm text-text-secondary">
                No matches for &ldquo;{query}&rdquo;.
              </p>
            )}
            {groups.map((g) => {
              const groupItems = filtered.filter((it) => it.group === g.key);
              if (!groupItems.length) return null;
              return (
                <div key={g.key} className="px-2 py-1">
                  <p className="px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-text-secondary">
                    {g.label}
                  </p>
                  <ul>
                    {groupItems.map((it) => {
                      const idx = filtered.indexOf(it);
                      const isActive = idx === activeIdx;
                      return (
                        <li key={it.id}>
                          <button
                            onMouseEnter={() => setActiveIdx(idx)}
                            onClick={it.action}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                              isActive
                                ? "bg-accent-cyan/10 text-accent-cyan"
                                : "text-text-primary hover:bg-bg-elevated"
                            )}
                          >
                            <span
                              className={cn(
                                "grid h-7 w-7 place-items-center rounded-md",
                                isActive
                                  ? "bg-accent-cyan/15 text-accent-cyan"
                                  : "bg-bg-elevated text-text-secondary"
                              )}
                            >
                              {it.icon ?? <ExternalLink className="h-4 w-4" />}
                            </span>
                            <span className="flex-1">{it.label}</span>
                            {it.hint && (
                              <span className="font-mono text-[10px] text-text-secondary">
                                {it.hint}
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between border-t border-border-subtle bg-bg-elevated px-4 py-2 text-[11px] text-text-secondary">
            <span>
              <kbd className="rounded border border-border-subtle bg-bg-secondary px-1.5">↑</kbd>{" "}
              <kbd className="rounded border border-border-subtle bg-bg-secondary px-1.5">↓</kbd>{" "}
              to navigate
            </span>
            <span>
              <kbd className="rounded border border-border-subtle bg-bg-secondary px-1.5">enter</kbd>{" "}
              to select ·{" "}
              <kbd className="rounded border border-border-subtle bg-bg-secondary px-1.5">esc</kbd>{" "}
              to close
            </span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
