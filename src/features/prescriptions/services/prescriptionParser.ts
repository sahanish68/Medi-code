import type { Prescription } from "../types/prescription.types";
import type { Medicine } from "@/features/medicines/types/medicine.types";
import type { PrescriptionExtraction } from "@/lib/ai/schemas";
import { getClinicalReferenceForDrug } from "@/features/medicines/services/medicineService";
import { generateId } from "@/lib/utils/id";

export function formatPrescriptionFromExtraction(
  extraction: PrescriptionExtraction,
  fileName: string,
  prescriptionId?: string,
  userId?: string
): Prescription {
  const id = prescriptionId || generateId();

  const medicines: Medicine[] = extraction.medicines.map((m) => {
    const medId = generateId();
    const clinicalInfo = getClinicalReferenceForDrug(m.name);

    return {
      id: medId,
      prescriptionId: id,
      name: m.name,
      normalizedName: m.name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      strength: m.strength || clinicalInfo.defaultStrength,
      dosage: m.dosage || "1 dose",
      frequency: m.frequency || "Twice daily",
      duration: m.duration || "5 days",
      timing: m.timing || "After food",
      route: m.route || "Oral",
      instructions: m.instructions || clinicalInfo.defaultInstructions,
      ingredients: clinicalInfo.ingredients.length > 0 ? clinicalInfo.ingredients : [m.name],
      uses: clinicalInfo.uses || "Prescribed by doctor for ongoing medical treatment.",
      sideEffects: clinicalInfo.sideEffects,
      seriousWarnings: clinicalInfo.seriousWarnings,
      warnings: clinicalInfo.warnings,
      confidence: m.needsVerification
        ? "Needs verification"
        : m.confidenceScore >= 0.8
        ? "High"
        : "Medium",
      confidenceScore: m.confidenceScore,
      needsVerification: m.needsVerification
    };
  });

  // Simple language summary
  const totalMeds = medicines.length;
  const afterFoodCount = medicines.filter((m) =>
    m.timing.toLowerCase().includes("after")
  ).length;
  const beforeFoodCount = medicines.filter((m) =>
    m.timing.toLowerCase().includes("before")
  ).length;

  let summary = `You have been prescribed ${totalMeds} medicine${totalMeds === 1 ? "" : "s"}.`;
  if (afterFoodCount > 0 && beforeFoodCount > 0) {
    summary += ` ${afterFoodCount} to be taken after food and ${beforeFoodCount} before food.`;
  } else if (afterFoodCount > 0) {
    summary += ` To be taken after meals.`;
  } else if (beforeFoodCount > 0) {
    summary += ` To be taken before meals on an empty stomach.`;
  }

  const hasUnclear = medicines.some((m) => m.needsVerification);
  const status = hasUnclear ? "needs_verification" : "completed";

  return {
    id,
    userId,
    fileName,
    status,
    doctorName: extraction.doctorName || "Treating Physician",
    prescriptionDate: extraction.prescriptionDate || new Date().toISOString().split("T")[0],
    diagnosis: extraction.diagnosis || "Clinical assessment recorded",
    summary,
    medicines,
    additionalInstructions:
      extraction.additionalInstructions ||
      "Complete the prescribed course. Contact your healthcare provider if symptoms do not improve."
  };
}
