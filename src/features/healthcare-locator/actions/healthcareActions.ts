"use server";

import { searchNearbyHealthcare } from "../services/healthcareLocatorService";
import type { HealthcareFacility, HealthcareSearchParams } from "../types/healthcare.types";

export async function findNearbyHealthcareAction(
  params: HealthcareSearchParams
): Promise<{ success: boolean; facilities: HealthcareFacility[]; error?: string }> {
  try {
    const res = await searchNearbyHealthcare(params);
    return { success: true, facilities: res.facilities };
  } catch (err: any) {
    return { success: false, facilities: [], error: err.message };
  }
}
