"use client";

import { useAuth } from "@/features/authentication/hooks/useAuth";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { HeartPulse, ShieldAlert } from "lucide-react";

export default function LoginPage() {
  const { session, signIn, signOut } = useAuth();

  return (
    <AppShell>
      <div className="mx-auto max-w-md space-y-6 py-12 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-teal-600 text-white shadow-lg">
          <HeartPulse size={36} />
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900">Sign in to MediDecode</h1>
        <p className="text-sm text-slate-600">
          Save prescription history, manage medicine reminders, and locate nearby healthcare facilities across India.
        </p>

        {session ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-700">Signed in as:</p>
            <p className="font-bold text-slate-900">{session.user.email}</p>
            <Button onClick={signOut} variant="secondary" className="mt-4 w-full">
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <Button
              onClick={signIn}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3"
            >
              Sign in with Google
            </Button>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <ShieldAlert size={14} className="text-teal-600" />
              <span>Private & encrypted medical file storage</span>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
