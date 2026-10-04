"use client";

import { navigationItems } from "@/constants/navigation";
import { useAppStore } from "@/features/app/hooks/useAppStore";
import { cn } from "@/lib/utils/cn";

export function MobileNav({ onClose }: { onClose: () => void }) {
  const { activeTab, setActiveTab } = useAppStore();

  return (
    <div className="border-t border-slate-200 bg-white p-3 md:hidden">
      <div className="grid gap-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                onClose();
              }}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium",
                activeTab === item.id ? "bg-teal-50 text-teal-700" : "hover:bg-slate-50"
              )}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
