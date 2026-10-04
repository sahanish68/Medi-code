import type { ElementType } from "react";
import { Button } from "./Button";

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
  title,
  actionLabel,
  onAction
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-50 text-slate-400">
        <Icon size={30} />
      </div>
      {title && <h3 className="mt-4 font-bold text-slate-800">{title}</h3>}
      <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">{text}</p>
      {actionLabel && onAction && (
        <div className="mt-5">
          <Button onClick={onAction} className="bg-teal-700 hover:bg-teal-800 text-white">
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
