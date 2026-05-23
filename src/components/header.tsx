"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import {
  Command,
  Download,
  Menu,
  Moon,
  Sparkles,
  Sun,
  X,
  Zap,
} from "lucide-react";
import { Button } from "./button";
import { NAV_ITEMS, RESUME_PATH } from "@/lib/data";
import { cn, scrollToSection, withBasePath } from "@/lib/utils";
import { useMotionPreference } from "@/lib/use-motion-preference";

const GLOW_KEY = "glow-enabled";

// Each nav link gets its own brand color, cycling through the palette.
// `active` is the bright color when the section is in view; `hover` is the
// subtle hint on mouse-over for inactive links.
const NAV_TONES = [
  {
    active: "text-accent-red [text-shadow:0_0_18px_rgba(244,63,94,0.55)]",
    hover: "hover:text-accent-red",
  },
  {
    active: "text-accent-gold [text-shadow:0_0_18px_rgba(252,211,77,0.55)]",
    hover: "hover:text-accent-gold",
  },
  {
    active: "text-accent-neon [text-shadow:0_0_18px_rgba(6,255,240,0.6)]",
    hover: "hover:text-accent-neon",
  },
];

export function Header({ onOpenCommand }: { onOpenCommand: () => void }) {
  const { resolvedTheme, setTheme, mounted: themeMounted } = useTheme();
  const { motionEnabled, toggleMotion, hydrated } = useMotionPreference();
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [glowOn, setGlowOn] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(GLOW_KEY);
    if (stored !== null) setGlowOn(stored === "true");
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const headerOffset = window.innerWidth < 768 ? 108 : 128;
        const items = NAV_ITEMS.map((n) => document.getElementById(n.id))
          .filter((el): el is HTMLElement => !!el)
          .map((el) => {
            const r = el.getBoundingClientRect();
            return { id: el.id, top: r.top, bottom: r.bottom };
          });
        if (!items.length) {
          ticking = false;
          return;
        }
        // bottom of page → last
        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 4
        ) {
          setActive(items[items.length - 1].id);
          ticking = false;
          return;
        }
        const current =
          items.find((it) => it.top <= headerOffset && it.bottom > headerOffset)
            ?.id ?? items[0].id;
        setActive(current);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cmd-K listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenCommand();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpenCommand]);

  const toggleGlow = () => {
    const next = !glowOn;
    setGlowOn(next);
    localStorage.setItem(GLOW_KEY, String(next));
    // Defer the cross-component notification so the listener's setState
    // doesn't run during this component's commit phase.
    queueMicrotask(() => {
      window.dispatchEvent(new CustomEvent("glow:toggle", { detail: next }));
    });
  };

  const cycleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleNav = (id: string) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  // Avoid hydration mismatch: render a neutral placeholder until theme is known.
  const themeIcon = !themeMounted ? (
    <span className="block h-4 w-4" aria-hidden />
  ) : resolvedTheme === "dark" ? (
    <Moon className="h-4 w-4" />
  ) : (
    <Sun className="h-4 w-4" />
  );

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border-subtle/60 bg-bg-main/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => handleNav("home")}
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-text-primary"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md bg-accent-cyan/15 text-accent-cyan">
            MT
          </span>
          <span className="hidden sm:inline">mohammed.tarabay</span>
        </button>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item, i) => {
            const tone = NAV_TONES[i % NAV_TONES.length];
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  isActive
                    ? tone.active
                    : `text-text-secondary ${tone.hover}`
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <Button
            variant="subtle"
            size="sm"
            onClick={onOpenCommand}
            className="hidden gap-2 md:inline-flex"
            aria-label="Open command palette"
          >
            <Command className="h-3.5 w-3.5" />
            <span className="text-xs text-text-secondary">Ctrl K</span>
          </Button>

          {hydrated && (
            <button
              onClick={toggleMotion}
              aria-label="Toggle motion"
              title={`Motion: ${motionEnabled ? "on" : "off"}`}
              className={cn(
                "hidden h-9 w-9 items-center justify-center rounded-md border border-border-subtle md:inline-flex",
                motionEnabled ? "text-accent-cyan" : "text-text-secondary"
              )}
            >
              <Zap className="h-4 w-4" />
            </button>
          )}

          <button
            onClick={toggleGlow}
            aria-label="Toggle cursor glow"
            title={`Glow: ${glowOn ? "on" : "off"}`}
            className={cn(
              "hidden h-9 w-9 items-center justify-center rounded-md border border-border-subtle md:inline-flex",
              glowOn ? "text-accent-cyan" : "text-text-secondary"
            )}
          >
            <Sparkles className="h-4 w-4" />
          </button>

          <button
            onClick={cycleTheme}
            aria-label="Toggle theme"
            className="hidden h-9 w-9 items-center justify-center rounded-md border border-border-subtle text-text-secondary hover:text-text-primary md:inline-flex"
          >
            {themeIcon}
          </button>

          <Button asChild size="sm" className="hidden lg:inline-flex">
            <a href={withBasePath(RESUME_PATH)} download className="gap-2">
              <Download className="h-3.5 w-3.5" />
              Resume
            </a>
          </Button>

          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-subtle text-text-primary lg:hidden"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-border-subtle bg-bg-secondary lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {NAV_ITEMS.map((item, i) => {
              const tone = NAV_TONES[i % NAV_TONES.length];
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={cn(
                    "rounded-md px-3 py-2 text-left text-sm",
                    isActive
                      ? `bg-bg-elevated ${tone.active}`
                      : `text-text-secondary hover:bg-bg-elevated ${tone.hover}`
                  )}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Button asChild size="sm" className="w-full">
                <a href={withBasePath(RESUME_PATH)} download>
                  Download Resume
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenCommand();
                }}
              >
                <Command className="mr-1 h-3.5 w-3.5" /> Cmd Palette
              </Button>
            </div>
            <div className="mt-2 flex gap-2">
              <button
                onClick={toggleMotion}
                className={cn(
                  "flex-1 rounded-md border border-border-subtle py-2 text-xs",
                  motionEnabled ? "text-accent-cyan" : "text-text-secondary"
                )}
              >
                Motion: {motionEnabled ? "on" : "off"}
              </button>
              <button
                onClick={toggleGlow}
                className={cn(
                  "flex-1 rounded-md border border-border-subtle py-2 text-xs",
                  glowOn ? "text-accent-cyan" : "text-text-secondary"
                )}
              >
                Glow: {glowOn ? "on" : "off"}
              </button>
              <button
                onClick={cycleTheme}
                className="flex-1 rounded-md border border-border-subtle py-2 text-xs text-text-secondary"
              >
                Theme
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
