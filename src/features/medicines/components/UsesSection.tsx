import { HelpCircle } from "lucide-react";

export function UsesSection({ uses }: { uses: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
        <HelpCircle size={15} />
        <span>What is this medicine used for?</span>
      </div>
      <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
        {uses || "Prescribed by your doctor for clinical symptom relief and disease management."}
      </p>
    </div>
  );
}
