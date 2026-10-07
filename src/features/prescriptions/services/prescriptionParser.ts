import type { Prescription } from "../types/prescription.types";
import type { Medicine } from "@/features/medicines/types/medicine.types";
import type { PrescriptionExtraction } from "@/lib/ai/schemas";
import { getClinicalReferenceForDrug } from "@/features/medicines/services/medicineService";
import { generateId } from "@/lib/utils/id";

export function formatPrescriptionFromExtraction(
  extraction: any,
  fileName: string,
  prescriptionId?: string,
  userId?: string
): Prescription {
  const id = prescriptionId || generateId();

  const medicines: Medicine[] = (extraction.medicines || []).map((m: any) => {
    const medId = generateId();
    const clinicalInfo = getClinicalReferenceForDrug(m.name || m.rawName || "");

    const rawName = m.rawName || m.name;
    const matchedName = m.matchedName || (m.needsVerification ? null : m.name);
    const score = typeof m.confidenceScore === "number" ? m.confidenceScore : 0.85;

    let confidenceLevel: "High" | "Medium" | "Needs verification" = "Needs verification";
    let status: "verified_candidate" | "review" | "uncertain" = "uncertain";

    if (score >= 0.90 && !m.needsVerification) {
      confidenceLevel = "High";
      status = "verified_candidate";
    } else if (score >= 0.70) {
      confidenceLevel = "Medium";
      status = "review";
    } else {
      confidenceLevel = "Needs verification";
      status = "uncertain";
    }

    return {
      id: medId,
      prescriptionId: id,
      name: m.name,
      rawName,
      matchedName,
      normalizedName: m.name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      matchType: m.matchType || (m.needsVerification ? "fuzzy" : "exact"),
      strength: m.strength || clinicalInfo.defaultStrength,
      dosage: m.dosage || "1 tablet",
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
      confidence: confidenceLevel,
      confidenceScore: score,
      needsVerification: m.needsVerification,
      status,
      aiPrediction: matchedName || m.name,
      userConfirmed: !m.needsVerification,
      alternatives: m.alternatives || []
    };
  });

  const totalMeds = medicines.length;
  const afterFoodCount = medicines.filter((m) =>
    m.timing.toLowerCase().includes("after")
  ).length;
  const beforeFoodCount = medicines.filter((m) =>
    m.timing.toLowerCase().includes("before")
  ).length;

  let summary = "";
  if (totalMeds === 0) {
    summary = "No valid medicines detected in this document. Please ensure you upload a clear medical prescription.";
  } else {
    summary = `You have been prescribed ${totalMeds} medicine${totalMeds === 1 ? "" : "s"}.`;
    if (afterFoodCount > 0 && beforeFoodCount > 0) {
      summary += ` ${afterFoodCount} to be taken after food and ${beforeFoodCount} before food.`;
    } else if (afterFoodCount > 0) {
      summary += ` To be taken after meals.`;
    } else if (beforeFoodCount > 0) {
      summary += ` To be taken before meals on an empty stomach.`;
    }
  }

  const hasUnclear = totalMeds === 0 || medicines.some((m) => m.needsVerification);
  const status = hasUnclear ? "needs_verification" : "completed";

  return {
    id,
    userId,
    fileName,
    status,
    doctorName: extraction.doctorName || (totalMeds > 0 ? "Treating Physician" : "Not Detected"),
    prescriptionDate: extraction.prescriptionDate || (totalMeds > 0 ? new Date().toISOString().split("T")[0] : new Date().toISOString().split("T")[0]),
    diagnosis: extraction.diagnosis || (totalMeds > 0 ? "Clinical assessment recorded" : "Non-Prescription / Unclear Document"),
    summary,
    medicines,
    additionalInstructions:
      extraction.additionalInstructions ||
      (totalMeds > 0
        ? "Complete the prescribed course. Contact your healthcare provider if symptoms do not improve."
        : "Please upload a valid medical prescription image.")
  };
}
