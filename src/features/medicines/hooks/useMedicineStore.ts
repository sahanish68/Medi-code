"use client";

import { create } from "zustand";
import type { Medicine } from "@/types/medicine";

interface MedicineStore {
  selectedMedicine: Medicine | null;
  openMedicine: (medicine: Medicine) => void;
  closeMedicine: () => void;
}

export const useMedicineStore = create<MedicineStore>((set) => ({
  selectedMedicine: null,
  openMedicine: (medicine) => set({ selectedMedicine: medicine }),
  closeMedicine: () => set({ selectedMedicine: null })
}));
