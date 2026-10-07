import { Sparkles, Building2, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { MedicineAlternative } from "../types/alternative.types";

export function AlternativeList({ alternatives }: { alternatives: MedicineAlternative[] }) {
  if (!alternatives || alternatives.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-4 text-center text-xs text-slate-500 dark:text-slate-400">
        No exact generic equivalents found in catalog for this medicine.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {alternatives.map((alt) => (
        <div
          key={alt.id}
          className={`rounded-xl border p-3.5 transition-all ${
            alt.isJanAushadhiGeneric
              ? "border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/30"
              : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white">{alt.alternativeName}</span>
                {alt.isJanAushadhiGeneric && (
                  <Badge variant="government">Jan Aushadhi Generic</Badge>
                )}
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <span className="font-medium text-cyan-700 dark:text-cyan-300">
                  Salt: {alt.activeIngredient} {alt.strength}
                </span>
                <span>•</span>
                <span>{alt.dosageForm}</span>
              </div>

              {alt.manufacturer && (
                <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <Building2 size={13} className="text-slate-400 dark:text-slate-500" />
                  <span>{alt.manufacturer}</span>
                  {alt.approximatePriceRatio && (
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium">({alt.approximatePriceRatio})</span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
              <CheckCircle2 size={13} className="text-cyan-600 dark:text-cyan-400" />
              <span>Same active salt & strength</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
