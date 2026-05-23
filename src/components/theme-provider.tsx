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
// AND paint a full-screen boot overlay if this is the first session visit.
// This eliminates the "site flashes for a moment, then boot screen overlays"
// problem — instead the user sees black/boot immediately.
// Rendered into <head> via dangerouslySetInnerHTML, so the React-19
// "script tag inside component" warning is not triggered.
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

  // Pre-paint a solid black overlay on first visit so the site never flashes
  // through before the React boot screen mounts. The overlay sits at z-index
  // 50 — under the React BootScreen (z-100) but over everything else.
  var seen=sessionStorage.getItem('boot-seen');
  if(!seen){
    d.classList.add('booting');
    var s=document.createElement('style');
    s.id='boot-pre-style';
    s.textContent='#boot-pre{position:fixed;inset:0;z-index:50;background:var(--bg-main,#050507);}';
    document.head.appendChild(s);
    var addPre=function(){
      if(document.body && !document.getElementById('boot-pre')){
        var pre=document.createElement('div');
        pre.id='boot-pre';
        document.body.appendChild(pre);
      }
    };
    if(document.readyState==='loading'){
      document.addEventListener('DOMContentLoaded',addPre);
    }else{
      addPre();
    }
  }
}catch(e){}})();
`;
