"use client";

import { Sun, Moon } from "lucide-react";
import { useAppStore } from "@/features/app/hooks/useAppStore";
import { cn } from "@/lib/utils/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useAppStore();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      aria-label={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      className={cn(
        "relative flex h-9 w-16 shrink-0 items-center rounded-full p-1 border transition-all duration-300 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950",
        isDark
          ? "bg-slate-900 border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          : "bg-sky-100/90 border-slate-300/80 text-amber-600 shadow-inner hover:border-sky-400",
        className
      )}
    >
      <span className="sr-only">Toggle Theme</span>

      {/* Sun Icon (Left) */}
      <Sun size={14} className={cn("ml-1 transition-opacity duration-200", isDark ? "opacity-40 text-slate-500" : "opacity-100 text-amber-500")} />

      {/* Moon Icon (Right) */}
      <Moon size={14} className={cn("mr-1 ml-auto transition-opacity duration-200", isDark ? "opacity-100 text-cyan-300" : "opacity-40 text-slate-400")} />

      {/* Sliding Knob */}
      <span
        className={cn(
          "absolute left-1 top-1 grid h-7 w-7 place-items-center rounded-full transition-transform duration-300 shadow-md",
          isDark
            ? "translate-x-7 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950"
            : "translate-x-0 bg-white text-amber-500 border border-slate-200"
        )}
      >
        {isDark ? <Moon size={14} className="fill-current" /> : <Sun size={14} className="fill-current" />}
      </span>
    </button>
  );
}
