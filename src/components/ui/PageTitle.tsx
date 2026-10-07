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
    <div className="flex items-start gap-3.5">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
        <Icon size={22} />
      </div>
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white">{title}</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">{description}</p>
      </div>
    </div>
  );
}
