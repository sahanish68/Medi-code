"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, disabled, children, ...props }, ref) => {
    const variants = {
      primary: "bg-teal-600 text-white hover:bg-teal-700 shadow-sm active:bg-teal-800 disabled:bg-teal-300",
      secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 disabled:opacity-50",
      outline: "border border-teal-600 text-teal-700 bg-transparent hover:bg-teal-50 active:bg-teal-100 disabled:opacity-50",
      danger: "bg-rose-600 text-white hover:bg-rose-700 shadow-sm active:bg-rose-800 disabled:bg-rose-300",
      ghost: "text-slate-600 hover:bg-slate-100 active:bg-slate-200 disabled:opacity-50",
      link: "text-teal-600 hover:underline p-0 h-auto font-medium"
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
      md: "px-4 py-2.5 text-sm rounded-xl gap-2",
      lg: "px-6 py-3.5 text-base rounded-2xl gap-2.5 font-semibold"
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed select-none",
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
