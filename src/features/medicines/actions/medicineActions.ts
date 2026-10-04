"use server";

import { createClient } from "@/lib/supabase/server";
import { findMedicineAlternatives } from "@/features/medicine-alternatives/services/alternativeMedicineService";
import type { MedicineAlternative } from "@/features/medicine-alternatives/types/alternative.types";

export async function getMedicineAlternativesAction(
  medicineId: string,
  medicineName: string
): Promise<{ success: boolean; alternatives: MedicineAlternative[]; error?: string }> {
  try {
    const alternatives = findMedicineAlternatives(medicineName, medicineId);
    return { success: true, alternatives };
  } catch (err: any) {
    return { success: false, alternatives: [], error: err.message };
  }
}
