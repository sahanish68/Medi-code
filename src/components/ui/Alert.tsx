import { type HTMLAttributes } from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "warning" | "error" | "success" | "medical";
  title?: string;
}

export function Alert({ className, variant = "info", title, children, ...props }: AlertProps) {
  const icons = {
    info: <Info className="h-5 w-5 shrink-0 text-sky-600" />,
    warning: <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />,
    error: <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />,
    success: <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />,
    medical: <ShieldAlert className="h-5 w-5 shrink-0 text-amber-700" />
  };

  const variants = {
    info: "border-sky-200 bg-sky-50 text-sky-900",
    warning: "border-amber-200 bg-amber-50 text-amber-900",
    error: "border-rose-200 bg-rose-50 text-rose-900",
    success: "border-emerald-200 bg-emerald-50 text-emerald-900",
    medical: "border-amber-300 bg-amber-50 text-amber-900 shadow-xs"
  };

  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-2xl border p-4 text-sm leading-relaxed",
        variants[variant],
        className
      )}
      {...props}
    >
      <div className="mt-0.5">{icons[variant]}</div>
      <div className="flex-1">
        {title && <h5 className="mb-1 font-semibold leading-none tracking-tight">{title}</h5>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
    </div>
  );
}
