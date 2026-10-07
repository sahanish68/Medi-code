import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#040711",
          900: "#070c1b",
          850: "#0c1329",
          800: "#111a36",
          700: "#1a264e",
          600: "#27386d"
        },
        cyan: {
          450: "#14b8a6",
          500: "#06b6d4"
        },
        medical: {
          dark: "#080e1e",
          card: "rgba(13, 22, 45, 0.75)",
          border: "rgba(56, 189, 248, 0.15)",
          accent: "#38bdf8"
        }
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 180, 216, 0.08)",
        "glass-hover": "0 12px 40px 0 rgba(6, 182, 212, 0.2)",
        glow: "0 0 25px -5px rgba(56, 189, 248, 0.3)",
        "glow-cyan": "0 0 35px -5px rgba(6, 182, 212, 0.4)",
        "glow-green": "0 0 35px -5px rgba(16, 185, 129, 0.4)"
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "scan": "scan 2.5s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        scan: {
          "0%": { top: "0%" },
          "50%": { top: "95%" },
          "100%": { top: "0%" }
        }
      }
    }
  },
  plugins: []
};

export default config;

