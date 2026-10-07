import { Clock, Calendar, CheckSquare, Compass } from "lucide-react";
import type { Medicine } from "../types/medicine.types";

export function DosageDisplay({ medicine }: { medicine: Medicine }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 p-4 border border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-2.5">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300">
          <CheckSquare size={16} />
        </div>
        <div>
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Dosage</div>
          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{medicine.dosage}</div>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300">
          <Clock size={16} />
        </div>
        <div>
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Frequency</div>
          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{medicine.frequency}</div>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
          <Compass size={16} />
        </div>
        <div>
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Meal Timing</div>
          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{medicine.timing}</div>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300">
          <Calendar size={16} />
        </div>
        <div>
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Duration</div>
          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{medicine.duration}</div>
        </div>
      </div>
    </div>
  );
}
