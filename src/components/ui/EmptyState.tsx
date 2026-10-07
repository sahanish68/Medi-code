import type { ElementType } from "react";
import { Button } from "./Button";
import { Sparkles } from "lucide-react";

interface EmptyStateProps {
  text: string;
  icon: ElementType;
  title?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  text,
  icon: Icon,
  title = "Your medical workspace is ready.",
  actionLabel,
  onAction
}: EmptyStateProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-dashed border-cyan-500/30 bg-slate-950/80 p-8 sm:p-12 text-center backdrop-blur-2xl shadow-xl">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full bg-cyan-500/10 blur-2xl" />

      <div className="relative z-10 space-y-4">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-cyan-500/30 bg-cyan-950/60 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)] animate-float">
          <Icon size={32} />
        </div>

        <h3 className="text-xl font-bold text-gradient-cyan">{title}</h3>
        <p className="mx-auto max-w-sm text-xs sm:text-sm text-slate-400 leading-relaxed">{text}</p>

        {actionLabel && onAction && (
          <div className="pt-2">
            <Button variant="glow" onClick={onAction}>
              <Sparkles size={16} /> {actionLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
