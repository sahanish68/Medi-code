import { AlertCircle, RotateCcw, Upload } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils/cn";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onUploadAnother?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong while analyzing this document.",
  message = "Please try again or select another document.",
  onRetry,
  onUploadAnother,
  className
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center rounded-3xl border border-rose-500/30 bg-slate-950/80 backdrop-blur-2xl shadow-xl", className)}>
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-rose-950/60 text-rose-400 mb-4 border border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.25)]">
        <AlertCircle size={28} />
      </div>
      <h4 className="text-lg font-bold text-white">{title}</h4>
      <p className="mt-2 max-w-md text-xs sm:text-sm text-slate-300 leading-relaxed">{message}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <Button variant="primary" onClick={onRetry}>
            <RotateCcw size={16} /> Try Again
          </Button>
        )}
        {onUploadAnother && (
          <Button variant="secondary" onClick={onUploadAnother}>
            <Upload size={16} /> Upload Another Document
          </Button>
        )}
      </div>
    </div>
  );
}
