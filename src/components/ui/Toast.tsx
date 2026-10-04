"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface ToastProps {
  id?: string;
  type?: "success" | "error" | "info";
  message: string;
  duration?: number;
  onClose?: () => void;
}

export function Toast({
  type = "success",
  message,
  duration = 4000,
  onClose
}: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-xl backdrop-blur transition-all animate-in slide-in-from-bottom-5",
        type === "success" && "border-emerald-200 bg-white/95 text-emerald-900",
        type === "error" && "border-rose-200 bg-white/95 text-rose-900",
        type === "info" && "border-slate-200 bg-white/95 text-slate-900"
      )}
    >
      {type === "success" && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
      {type === "error" && <AlertCircle className="h-5 w-5 text-rose-600" />}
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={() => {
          setVisible(false);
          onClose?.();
        }}
        className="rounded-lg p-1 text-slate-400 hover:text-slate-700"
      >
        <X size={16} />
      </button>
    </div>
  );
}
