import type { Config } from "tailwindcss";

/**
 * Design system Step Communication
 * Palette dark-first: nero profondo, bianco puro, arancio elettrico come accento.
 * I colori usano canali RGB in CSS variables (vedi globals.css) per supportare
 * i modificatori di opacità Tailwind (es. bg-accent/50).
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "2rem",
        lg: "2.5rem",
        xl: "3rem",
      },
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        "bg-elevated": "rgb(var(--bg-elevated) / <alpha-value>)",
        "bg-subtle": "rgb(var(--bg-subtle) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        "fg-muted": "rgb(var(--fg-muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "fluid-hero": "clamp(2.75rem, 7vw, 7rem)",
        "fluid-h2": "clamp(2rem, 4.5vw, 4rem)",
        "fluid-h3": "clamp(1.5rem, 2.5vw, 2.25rem)",
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.03em",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.21, 0.47, 0.32, 0.98)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.08)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "glow-pulse": "glow-pulse 9s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
