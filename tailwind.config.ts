import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#132A35",
        bg: "#FFFFFF",
        sand: "#F3F8F9",
        line: "#E1E9EA",
        primary: {
          DEFAULT: "#0D7377",
          dark: "#0A5C5F",
          light: "#DFF3F1",
        },
        accent: {
          DEFAULT: "#DC3B3E",
          dark: "#B32A2D",
          light: "#FBE1E1",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Iowan Old Style", "Palatino Linotype", "serif"],
        body: ["var(--font-body)", "Seravek", "Gill Sans Nova", "Ubuntu", "Calibri", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
      },
      backgroundImage: {
        "ledger-lines":
          "repeating-linear-gradient(to bottom, transparent, transparent 39px, rgba(19,42,53,0.08) 40px)",
        "radial-fade": "radial-gradient(circle at center, black, transparent 75%)",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(19, 42, 53, 0.2)",
        warm: "0 20px 50px -18px rgba(220, 59, 62, 0.35)",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.1)" },
          "66%": { transform: "translate(-25px, 25px) scale(0.95)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "80%, 100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        blob: "blob 12s infinite ease-in-out",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out forwards",
        marquee: "marquee 28s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
