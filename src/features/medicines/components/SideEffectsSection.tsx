import { AlertCircle, AlertTriangle } from "lucide-react";

export function SideEffectsSection({
  sideEffects,
  seriousWarnings
}: {
  sideEffects: string[];
  seriousWarnings?: string[];
}) {
  return (
    <div className="space-y-4">
      {/* 1. Common Side Effects */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          <AlertCircle size={15} className="text-slate-500" />
          <span>Common Side Effects (Usually Mild)</span>
        </div>
        <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {sideEffects && sideEffects.length > 0 ? (
            sideEffects.map((se, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span>{se}</span>
              </li>
            ))
          ) : (
            <li className="text-xs text-slate-500">None commonly reported at normal prescribed dosage.</li>
          )}
        </ul>
      </div>

      {/* 2. Serious Warning Signs */}
      {seriousWarnings && seriousWarnings.length > 0 && (
        <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800 mb-2">
            <AlertTriangle size={15} className="text-rose-600" />
            <span>Serious Warning Signs (Contact Doctor Immediately)</span>
          </div>
          <ul className="space-y-1.5">
            {seriousWarnings.map((sw, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-rose-900 font-medium">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-600 shrink-0" />
                <span>{sw}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
