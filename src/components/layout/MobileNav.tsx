"use client";

import { navigationItems } from "@/constants/navigation";
import { useAppStore } from "@/features/app/hooks/useAppStore";
import { useAuth } from "@/features/authentication/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LogIn, LogOut } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function MobileNav({ onClose }: { onClose: () => void }) {
  const { activeTab, setActiveTab, language, setLanguage } = useAppStore();
  const { session, signIn, signOut } = useAuth();

  return (
    <div className="border-t border-slate-200 dark:border-cyan-500/20 bg-white/95 dark:bg-slate-950/95 p-4 md:hidden backdrop-blur-2xl shadow-2xl animate-in slide-in-from-top-2 duration-200">
      <div className="grid gap-1.5">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                onClose();
              }}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all",
                isActive
                  ? "bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-400/40"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
              )}
            >
              <Icon size={18} className={isActive ? "text-cyan-600 dark:text-cyan-400" : "text-slate-400"} />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Appearance Mode</span>
          <ThemeToggle />
        </div>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-cyan-300"
        >
          <option value="en">English (US)</option>
          <option value="hi">हिन्दी (Hindi)</option>
          <option value="ta">தமிழ் (Tamil)</option>
        </select>

        {session ? (
          <Button variant="secondary" onClick={() => { signOut(); onClose(); }}>
            <LogOut size={16} /> Sign out
          </Button>
        ) : (
          <Button variant="glow" onClick={() => { signIn(); onClose(); }}>
            <LogIn size={16} /> Sign in
          </Button>
        )}
      </div>
    </div>
  );
}
