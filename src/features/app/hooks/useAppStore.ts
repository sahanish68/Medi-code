"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NavigationId } from "@/constants/navigation";

export interface AppStore {
  activeTab: NavigationId;
  setActiveTab: (tab: NavigationId) => void;
  language: string;
  setLanguage: (lang: string) => void;
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
      toastMessage: null,
      toastType: "success",
      showToast: (msg: string, type = "success") => set({ toastMessage: msg, toastType: type }),
      clearToast: () => set({ toastMessage: null })
    }),
    {
      name: "medidecode-app-settings",
      partialize: (state) => ({
        language: state.language
      })
    }
  )
);
