"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost" | "link" | "glow";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, disabled, children, ...props }, ref) => {
    const variants = {
      primary:
        "bg-cyan-700 hover:bg-cyan-800 text-white font-bold dark:bg-gradient-to-r dark:from-cyan-500 dark:to-blue-600 dark:text-slate-950 dark:hover:from-cyan-400 dark:hover:to-blue-500 shadow-sm dark:shadow-[0_0_25px_rgba(6,182,212,0.3)] border border-cyan-600 dark:border-cyan-300/40 active:translate-y-[1px]",
      glow:
        "bg-cyan-700 hover:bg-cyan-800 text-white font-extrabold dark:bg-gradient-to-r dark:from-teal-400 dark:via-cyan-400 dark:to-blue-500 dark:text-slate-950 shadow-md dark:shadow-[0_0_30px_rgba(20,184,166,0.4)] active:translate-y-[1px]",
      secondary:
        "bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 hover:border-slate-400 dark:bg-slate-900/80 dark:border-slate-700/80 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:border-cyan-500/40 dark:hover:text-white shadow-xs active:translate-y-[1px]",
      outline:
        "border border-cyan-700 text-cyan-800 bg-cyan-50/50 hover:bg-cyan-100/80 dark:border-cyan-500/40 dark:text-cyan-300 dark:bg-cyan-950/40 dark:hover:bg-cyan-500/20 dark:hover:border-cyan-400 font-bold active:translate-y-[1px]",
      danger:
        "bg-rose-700 hover:bg-rose-800 text-white font-bold dark:bg-gradient-to-r dark:from-rose-600 dark:to-rose-700 shadow-sm active:translate-y-[1px]",
      ghost:
        "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-cyan-300 font-bold active:translate-y-[1px]",
      link:
        "text-cyan-700 dark:text-cyan-400 hover:underline underline-offset-4 p-0 h-auto font-bold"
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
      md: "px-4.5 py-2.5 text-sm rounded-xl gap-2",
      lg: "px-6 py-3.5 text-base rounded-2xl gap-2.5 font-bold"
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed select-none group cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin text-current" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
