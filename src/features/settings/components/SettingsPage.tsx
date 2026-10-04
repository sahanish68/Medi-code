"use client";

import { Languages, Settings, ShieldCheck } from "lucide-react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Card } from "@/components/ui/Card";
import { useAppStore } from "@/features/app/hooks/useAppStore";
import { useAuth } from "@/features/authentication/hooks/useAuth";
import { usePrescriptionStore } from "@/features/prescriptions/hooks/usePrescriptionStore";

export function SettingsPage() {
  const { language, setLanguage } = useAppStore();
  const { session } = useAuth();
  const { clear } = usePrescriptionStore();

  return (
    <div className="space-y-6">
      <PageTitle
        title="Settings"
        description="Manage language, account and application preferences."
        icon={Settings}
      />

      <Card>
        <h2 className="font-bold">Language</h2>
        <div className="mt-3 flex items-center gap-3">
          <Languages className="text-teal-600" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
          </select>
        </div>
      </Card>

      <Card>
        <h2 className="font-bold">Account</h2>
        <p className="mt-2 text-sm text-slate-500">
          {session ? `Signed in as ${session.user?.email ?? "Google user"}.` : "Not signed in."}
        </p>
      </Card>

      <Card>
        <div className="flex gap-3">
          <ShieldCheck className="text-teal-600" />
          <div>
            <h2 className="font-bold">Privacy & medical safety</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Production prescription files should remain in a private Supabase Storage bucket with signed URLs and RLS-protected records.
            </p>
          </div>
        </div>
        <button
          onClick={clear}
          className="mt-4 rounded-xl border border-red-200 px-4 py-2 text-sm font-bold text-red-700"
        >
          Clear current prescription
        </button>
      </Card>
    </div>
  );
}
