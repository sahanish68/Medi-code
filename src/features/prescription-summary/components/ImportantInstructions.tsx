import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function ImportantInstructions({ instructions }: { instructions: string[] }) {
  if (!instructions || instructions.length === 0) return null;

  return (
    <Card className="border-amber-200/80 bg-amber-50/40">
      <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-3">
        <AlertCircle size={18} className="text-amber-700" />
        <span>Important Patient Instructions</span>
      </div>

      <ul className="space-y-2">
        {instructions.map((inst, index) => (
          <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-amber-950">
            <CheckCircle2 size={16} className="text-amber-600 mt-0.5 shrink-0" />
            <span>{inst}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
