import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils/cn";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't process your request. Please check your connection or try again.",
  onRetry,
  className
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-rose-50 text-rose-600 mb-4 border border-rose-100">
        <AlertCircle size={28} />
      </div>
      <h4 className="text-base font-bold text-slate-900">{title}</h4>
      <p className="mt-1.5 max-w-md text-sm text-slate-500">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} className="mt-5">
          <RotateCcw size={16} /> Try Again
        </Button>
      )}
    </div>
  );
}
