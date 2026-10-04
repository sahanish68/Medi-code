import { ShieldAlert, Info } from "lucide-react";

export function SafetyWarnings({ warnings }: { warnings: string[] }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
        <ShieldAlert size={15} className="text-amber-700" />
        <span>Safety, Allergies & Precautions</span>
      </div>

      <ul className="space-y-2">
        {warnings && warnings.length > 0 ? (
          warnings.map((w, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-amber-950">
              <Info size={14} className="mt-0.5 text-amber-600 shrink-0" />
              <span>{w}</span>
            </li>
          ))
        ) : (
          <li className="text-xs text-amber-900">
            Always consult your physician or pharmacist regarding pregnancy, liver/kidney conditions, and potential drug interactions.
          </li>
        )}
      </ul>
    </div>
  );
}
