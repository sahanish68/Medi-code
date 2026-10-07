import { type HTMLAttributes } from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "warning" | "error" | "success" | "medical";
  title?: string;
}

export function Alert({ className, variant = "info", title, children, ...props }: AlertProps) {
  const icons = {
    info: <Info className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-400" />,
    warning: <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />,
    error: <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />,
    success: <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />,
    medical: <ShieldAlert className="h-5 w-5 shrink-0 text-amber-700 dark:text-amber-400" />
  };

  const variants = {
    info: "border-cyan-200 bg-cyan-50/90 text-cyan-950 dark:border-cyan-500/30 dark:bg-cyan-950/40 dark:text-cyan-200 backdrop-blur-md shadow-xs",
    warning: "border-amber-200 bg-amber-50/90 text-amber-950 dark:border-amber-500/40 dark:bg-amber-950/40 dark:text-amber-200 backdrop-blur-md shadow-xs",
    error: "border-rose-200 bg-rose-50/90 text-rose-950 dark:border-rose-500/40 dark:bg-rose-950/40 dark:text-rose-200 backdrop-blur-md shadow-xs",
    success: "border-emerald-200 bg-emerald-50/90 text-emerald-950 dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-200 backdrop-blur-md shadow-xs",
    medical: "border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-500/40 dark:bg-amber-950/50 dark:text-amber-200 backdrop-blur-xl shadow-xs font-medium"
  };

  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3.5 rounded-2xl border p-4.5 text-sm leading-relaxed transition-all",
        variants[variant],
        className
      )}
      {...props}
    >
      <div className="mt-0.5">{icons[variant]}</div>
      <div className="flex-1">
        {title && <h5 className="mb-1.5 font-bold leading-none tracking-tight text-slate-900 dark:text-white">{title}</h5>}
        <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">{children}</div>
      </div>
    </div>
  );
}
