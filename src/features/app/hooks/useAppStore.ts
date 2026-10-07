"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NavigationId } from "@/constants/navigation";

export interface AppStore {
  activeTab: NavigationId;
  setActiveTab: (tab: NavigationId) => void;
  language: string;
  setLanguage: (lang: string) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
  toastMessage: string | null;
  toastType: "success" | "error" | "info";
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
  clearToast: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      activeTab: "dashboard",
      setActiveTab: (tab: NavigationId) => set({ activeTab: tab }),
      language: "en",
      setLanguage: (lang: string) => set({ language: lang }),
      theme: "light",
      setTheme: (theme: "light" | "dark") => {
        if (typeof window !== "undefined") {
          if (theme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
        set({ theme });
      },
      toggleTheme: () => set((state) => {
        const nextTheme = state.theme === "light" ? "dark" : "light";
        if (typeof window !== "undefined") {
          if (nextTheme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
        return { theme: nextTheme };
      }),
      toastMessage: null,
      toastType: "success",
      showToast: (msg: string, type = "success") => set({ toastMessage: msg, toastType: type }),
      clearToast: () => set({ toastMessage: null })
    }),
    {
      name: "medidecode-app-settings",
      partialize: (state) => ({
        language: state.language,
        theme: state.theme
      }),
      onRehydrateStorage: () => (state) => {
        if (state && typeof window !== "undefined") {
          if (state.theme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      }
    }
  )
);

