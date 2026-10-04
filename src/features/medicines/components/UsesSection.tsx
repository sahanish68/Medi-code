import { HelpCircle } from "lucide-react";

export function UsesSection({ uses }: { uses: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800">
        <HelpCircle size={15} />
        <span>What is this medicine used for?</span>
      </div>
      <p className="text-sm leading-relaxed text-slate-700 bg-white p-3.5 rounded-xl border border-slate-100">
        {uses || "Prescribed by your doctor for clinical symptom relief and disease management."}
      </p>
    </div>
  );
}
