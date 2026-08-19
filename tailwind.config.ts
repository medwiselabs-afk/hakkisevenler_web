import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        bg: "#FFFFFF",
        sand: "#F8FAFC",
        line: "#E2E8F0",
        primary: {
          DEFAULT: "#1B8FA6",
          dark: "#145A6F",
          light: "#E6F3F7",
        },
        accent: {
          DEFAULT: "#E74C3C",
          dark: "#C82E1D",
          light: "#FADBD8",
        },
        success: {
          DEFAULT: "#10B981",
          dark: "#047857",
          light: "#D1FAE5",
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
          "repeating-linear-gradient(to bottom, transparent, transparent 39px, rgba(15,23,42,0.08) 40px)",
        "radial-fade": "radial-gradient(circle at center, black, transparent 75%)",
        "gradient-cta": "linear-gradient(135deg, #1B8FA6 0%, #E74C3C 100%)",
        "gradient-subtle": "linear-gradient(135deg, rgba(27,143,166,0.1) 0%, rgba(231,76,60,0.1) 100%)",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(15, 23, 42, 0.15)",
        warm: "0 20px 50px -18px rgba(231, 76, 60, 0.25)",
        "glow-primary": "0 0 30px -5px rgba(27, 143, 166, 0.4)",
        "glow-accent": "0 0 30px -5px rgba(231, 76, 60, 0.4)",
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
        "glow-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
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
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
