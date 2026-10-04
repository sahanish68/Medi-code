import { Activity, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
  pulse?: boolean;
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  label,
  pulse = false,
  className
}: LoadingSpinnerProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
    xl: "h-14 w-14"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 p-4", className)}>
      {pulse ? (
        <div className="relative flex items-center justify-center">
          <div className="absolute h-12 w-12 animate-ping rounded-full bg-teal-400 opacity-20" />
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-600 text-white shadow-md">
            <Activity className="h-6 w-6 animate-pulse" />
          </div>
        </div>
      ) : (
        <Loader2 className={cn("animate-spin text-teal-600", sizes[size])} />
      )}
      {label && <p className="text-sm font-medium text-slate-600 animate-pulse">{label}</p>}
    </div>
  );
}
