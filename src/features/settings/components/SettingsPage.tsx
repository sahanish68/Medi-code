"use client";

import { Languages, Settings, ShieldCheck, Trash2, UserCheck } from "lucide-react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/features/app/hooks/useAppStore";
import { useAuth } from "@/features/authentication/hooks/useAuth";
import { usePrescriptionStore } from "@/features/prescriptions/hooks/usePrescriptionStore";

export function SettingsPage() {
  const { language, setLanguage } = useAppStore();
  const { session } = useAuth();
  const { clear } = usePrescriptionStore();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageTitle
        title="Platform Settings"
        description="Manage regional language preferences, privacy parameters, and application state."
        icon={Settings}
      />

      <Card>
        <h2 className="font-bold text-slate-900 dark:text-white text-base">Regional Language</h2>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Select preferred language for medical translations and instructions.</p>
        <div className="mt-4 flex items-center gap-3">
          <Languages className="text-cyan-600 dark:text-cyan-400" size={20} />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-xl border border-slate-300 dark:border-cyan-500/30 bg-white dark:bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-800 dark:text-cyan-300 focus:border-cyan-400 focus:outline-none"
          >
            <option value="en">English (US)</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="ta">தமிழ் (Tamil)</option>
          </select>
        </div>
      </Card>

      <Card>
        <h2 className="font-bold text-slate-900 dark:text-white text-base">Account Authentication</h2>
        <div className="mt-3 flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
          <UserCheck size={18} className="text-emerald-500 dark:text-emerald-400" />
          <span>{session ? `Signed in as ${session.user?.email ?? "Google user"}.` : "Not signed in (Guest Mode)."}</span>
        </div>
      </Card>

      <Card>
        <div className="flex gap-3">
          <ShieldCheck className="text-emerald-500 dark:text-emerald-400 shrink-0" size={22} />
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white text-base">Privacy & Medical Safety</h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Prescription scans remain in private client-side buffers with signed security tokens. Zero permanent raw images are exposed.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <Button variant="danger" size="sm" onClick={clear}>
            <Trash2 size={14} /> Clear Current Prescription Memory
          </Button>
        </div>
      </Card>
    </div>
  );
}
