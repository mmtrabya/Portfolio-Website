import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "bg-main": "var(--bg-main)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-elevated": "var(--bg-elevated)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-on-accent": "var(--text-on-accent)",
        "border-subtle": "var(--border-subtle)",
        // Cyberpunk palette
        "accent-red": "var(--accent-red)",
        "accent-gold": "var(--accent-gold)",
        "accent-neon": "var(--accent-neon)",
        "accent-slate": "var(--accent-slate)",
        // Aliases so existing classes (accent-cyan/emerald/amber) keep working.
        "accent-cyan": "var(--accent-neon)",
        "accent-emerald": "var(--accent-gold)",
        "accent-amber": "var(--accent-red)",
      },
      boxShadow: {
        glow: "0 10px 40px -12px var(--accent-neon, #06fff058)",
        soft: "0 4px 24px -4px rgb(0 0 0 / 0.45), 0 0 0 1px rgb(255 255 255 / 0.06)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          "var(--font-jetbrains)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      animation: {
        gradient: "gradient 12s ease infinite",
        noise: "noise 1.2s steps(6) infinite",
        "loading-dot": "loadingDot 1.2s ease-in-out infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        noise: {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-2%,-1%)" },
          "20%": { transform: "translate(2%,1%)" },
          "30%": { transform: "translate(-1%,2%)" },
          "40%": { transform: "translate(1%,-2%)" },
          "50%": { transform: "translate(-2%,1%)" },
          "60%": { transform: "translate(2%,-1%)" },
          "70%": { transform: "translate(-1%,-2%)" },
          "80%": { transform: "translate(1%,2%)" },
          "90%": { transform: "translate(-2%,-1%)" },
        },
        loadingDot: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
