import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "danger" | "info" | "outline" | "government" | "private";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800/80 dark:text-slate-200 dark:border-slate-700/80",
    secondary: "bg-cyan-100 text-cyan-900 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-500/30",
    success: "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-500/40 font-bold",
    warning: "bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-500/40 font-bold",
    danger: "bg-rose-100 text-rose-950 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-500/40 font-bold",
    info: "bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-500/30",
    outline: "border-cyan-600 text-cyan-800 dark:border-cyan-500/40 dark:text-cyan-300 bg-transparent font-bold",
    government: "bg-emerald-100 text-emerald-900 border-emerald-400 dark:bg-emerald-900/60 dark:text-emerald-200 dark:border-emerald-400/50 font-extrabold",
    private: "bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-900/60 dark:text-blue-200 dark:border-blue-400/50 font-bold"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold backdrop-blur-md transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
