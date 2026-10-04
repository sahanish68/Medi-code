import type { ElementType } from "react";

export function PageTitle({
  title,
  description,
  icon: Icon
}: {
  title: string;
  description: string;
  icon: ElementType;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-700">
        <Icon size={21} />
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </div>
  );
}
