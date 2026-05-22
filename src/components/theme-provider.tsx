"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark" | "system";
type Resolved = "light" | "dark";

type Ctx = {
  theme: Theme;
  resolvedTheme: Resolved;
  setTheme: (t: Theme) => void;
  mounted: boolean;
};

const ThemeContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "theme";

function getSystem(): Resolved {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyClass(resolved: Resolved) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [resolved, setResolved] = useState<Resolved>("dark");
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage / system on mount.
  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) ?? "dark") as Theme;
    setThemeState(stored);
    const r = stored === "system" ? getSystem() : stored;
    setResolved(r);
    applyClass(r);
    setMounted(true);
  }, []);

  // Listen for system preference changes when theme === "system".
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const r: Resolved = mq.matches ? "dark" : "light";
      setResolved(r);
      applyClass(r);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem(STORAGE_KEY, t);
    const r = t === "system" ? getSystem() : t;
    setResolved(r);
    applyClass(r);
  }, []);

  const value = useMemo<Ctx>(
    () => ({ theme, resolvedTheme: resolved, setTheme, mounted }),
    [theme, resolved, setTheme, mounted]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    // Safe defaults for SSR/early render before provider mounts.
    return {
      theme: "dark" as Theme,
      resolvedTheme: "dark" as Resolved,
      setTheme: () => {},
      mounted: false,
    } satisfies Ctx;
  }
  return ctx;
}

// Inline script that runs BEFORE React hydrates to apply the saved theme
// and avoid a flash. Rendered into <head> via dangerouslySetInnerHTML, so the
// React-19 "script tag inside component" warning is not triggered.
export const THEME_BOOTSTRAP_SCRIPT = `
(function(){try{
  var d=document.documentElement;
  var t=localStorage.getItem('theme');
  var resolved=t;
  if(!t||t==='system'){
    resolved=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  }
  d.classList.remove('light','dark');
  d.classList.add(resolved);
  d.style.colorScheme=resolved;
}catch(e){}})();
`;
