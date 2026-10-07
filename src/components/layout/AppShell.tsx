"use client";

import { useEffect, useState } from "react";
import { HeartPulse, LogIn, LogOut, Menu, ShieldCheck } from "lucide-react";
import { navigationItems } from "@/constants/navigation";
import { useAuth } from "@/features/authentication/hooks/useAuth";
import { useAppStore } from "@/features/app/hooks/useAppStore";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils/cn";
import { MobileNav } from "./MobileNav";
import { MedicineDetails } from "@/features/medicines/components/MedicineDetails";
import { ReminderDialog } from "@/features/reminders/components/ReminderDialog";
import { usePrescriptionStore } from "@/features/prescriptions/hooks/usePrescriptionStore";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { session, signIn, signOut } = useAuth();
  const { activeTab, setActiveTab, language, setLanguage, theme } = useAppStore();
  const { processFile } = usePrescriptionStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleGlobalFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setActiveTab("prescriptions");
      await processFile(file);
      e.target.value = "";
    }
  };

  // Sync theme class to html root
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-[#060913] text-slate-900 dark:text-slate-100">
      {/* Top Floating Navbar (Single Header - Logo + Actions) */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-slate-200/90 dark:border-cyan-500/20 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-sm dark:shadow-lg"
            : "bg-white/70 dark:bg-slate-950/40 border-b border-slate-200/60 dark:border-cyan-500/10 py-1 backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo & Brand */}
          <button
            type="button"
            onClick={() => {
              setActiveTab("dashboard");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-700 dark:from-cyan-500 dark:to-blue-600 text-white dark:text-slate-950 shadow-md group-hover:scale-105 transition-transform duration-300">
              <HeartPulse size={22} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                  MediDecode
                </span>
                <span className="rounded-full bg-cyan-100 dark:bg-cyan-500/15 border border-cyan-300 dark:border-cyan-400/40 px-2 py-0.5 text-[10px] font-bold text-cyan-800 dark:text-cyan-300">
                  Clinical AI 3D
                </span>
              </div>
              <div className="hidden text-[11px] text-slate-500 dark:text-slate-400 sm:block font-medium">
                Prescription & Medicine Decoder
              </div>
            </div>
          </button>

          {/* Right Header Actions: Theme Toggle, Language & Auth */}
          <div className="hidden items-center gap-3.5 md:flex">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-xl border border-slate-300 dark:border-cyan-500/30 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-800 dark:text-cyan-300 focus:border-cyan-500 focus:outline-none backdrop-blur-md cursor-pointer shadow-xs"
            >
              <option value="en">English (US)</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="ta">தமிழ் (Tamil)</option>
            </select>

            {/* Auth Button */}
            {session ? (
              <Button variant="secondary" size="sm" onClick={signOut}>
                <LogOut size={14} /> Sign out
              </Button>
            ) : (
              <Button variant="primary" size="sm" onClick={signIn}>
                <LogIn size={14} /> Sign in
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle navigation menu"
              className="rounded-xl p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              onClick={() => setMobileOpen((value) => !value)}
            >
              <Menu />
            </button>
          </div>
        </div>

        {mobileOpen && <MobileNav onClose={() => setMobileOpen(false)} />}
      </header>

      {/* Main Container Layout */}
      <div className="mx-auto flex max-w-7xl">
        {/* Single Desktop Sidebar Navigation */}
        <aside className="sticky top-[65px] hidden h-[calc(100vh-65px)] w-64 shrink-0 border-r border-slate-200/90 dark:border-cyan-500/15 bg-white/80 dark:bg-slate-950/50 p-4 backdrop-blur-xl md:block overflow-y-auto">
          <div className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-cyan-800 dark:text-cyan-400">
            Navigation Menu
          </div>
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-bold transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-cyan-50 dark:bg-cyan-500/20 text-cyan-900 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-400/40 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-900/60 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <Icon size={18} className={isActive ? "text-cyan-700 dark:text-cyan-400" : "text-slate-400 dark:text-slate-500"} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Clinical Safety Card */}
          <div className="mt-8 rounded-2xl border border-amber-300/80 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-950/30 p-4 backdrop-blur-md">
            <div className="flex gap-2.5">
              <ShieldCheck className="mt-0.5 shrink-0 text-amber-700 dark:text-amber-400" size={18} />
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                  Medical Safety
                </div>
                <p className="mt-1 text-xs leading-relaxed text-amber-800 dark:text-amber-200/90">
                  AI insights assist understanding. Always confirm dosage and substitutes with a qualified medical doctor.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Dynamic Main Workspace */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>

      {/* Global Modals */}
      <MedicineDetails />
      <ReminderDialog />

      <input
        id="prescription-file-input"
        type="file"
        accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
        className="hidden"
        onChange={handleGlobalFileChange}
      />

      {/* Clinical Footer */}
      <footer className="border-t border-slate-200 dark:border-cyan-500/15 bg-white dark:bg-slate-950 px-4 py-8 text-center text-xs leading-relaxed text-slate-600 dark:text-slate-400 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <HeartPulse size={16} className="text-cyan-600 dark:text-cyan-400" />
            <span className="font-bold text-slate-900 dark:text-white">MediDecode Clinical AI Platform</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl">
            MediDecode provides informational assistance only and does not replace medical advice from a licensed doctor or pharmacist.
          </p>
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-mono text-[11px] font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            SYSTEM OPERATIONAL
          </div>
        </div>
      </footer>
    </div>
  );
}
