import { Sparkles, Building2, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { MedicineAlternative } from "../types/alternative.types";

export function AlternativeList({ alternatives }: { alternatives: MedicineAlternative[] }) {
  if (!alternatives || alternatives.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-500">
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
              ? "border-emerald-200 bg-emerald-50/30"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900">{alt.alternativeName}</span>
                {alt.isJanAushadhiGeneric && (
                  <Badge variant="government">Jan Aushadhi Generic</Badge>
                )}
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <span className="font-medium text-teal-800">
                  Salt: {alt.activeIngredient} {alt.strength}
                </span>
                <span>•</span>
                <span>{alt.dosageForm}</span>
              </div>

              {alt.manufacturer && (
                <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                  <Building2 size={13} className="text-slate-400" />
                  <span>{alt.manufacturer}</span>
                  {alt.approximatePriceRatio && (
                    <span className="text-emerald-700 font-medium">({alt.approximatePriceRatio})</span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <CheckCircle2 size={13} className="text-teal-600" />
              <span>Same active salt & strength</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
