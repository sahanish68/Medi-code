import { FlaskConical } from "lucide-react";

export function IngredientsSection({
  ingredients,
  strength
}: {
  ingredients: string[];
  strength: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-800">
        <FlaskConical size={15} />
        <span>Active Ingredients / Composition</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {ingredients && ingredients.length > 0 ? (
          ingredients.map((ing, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 rounded-lg border border-purple-200 bg-purple-50/60 px-3 py-1 text-xs font-semibold text-purple-900"
            >
              {ing} {strength && !ing.includes(strength) ? `(${strength})` : ""}
            </span>
          ))
        ) : (
          <span className="text-xs text-slate-500">Composition requires pharmacist verification.</span>
        )}
      </div>
    </div>
  );
}
