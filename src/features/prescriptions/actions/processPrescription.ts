"use server";

import { createClient } from "@/lib/supabase/server";
import { processPrescriptionOCR } from "../services/ocrService";
import { formatPrescriptionFromExtraction } from "../services/prescriptionParser";
import type { Prescription, ProcessActionResult } from "../types/prescription.types";

export async function processPrescriptionAction(params: {
  prescriptionId: string;
  filePath?: string;
  fileName: string;
  imageBase64?: string;
  mimeType?: string;
  rawText?: string;
}): Promise<ProcessActionResult> {
  try {
    const supabase = await createClient();
    let fileBuffer: Buffer | undefined;

    // If file is stored in Supabase storage and base64 is missing, fetch from storage
    if (supabase && params.filePath && !params.imageBase64) {
      const { data: fileData } = await supabase.storage
        .from("prescriptions")
        .download(params.filePath);

      if (fileData) {
        fileBuffer = Buffer.from(await fileData.arrayBuffer());
      }
    }

    // Run OCR / Vision AI pipeline
    const { extractedData, rawOcrText } = await processPrescriptionOCR({
      imageBase64: params.imageBase64,
      mimeType: params.mimeType,
      fileName: params.fileName,
      rawText: params.rawText,
      fileBuffer
    });

    const prescription = formatPrescriptionFromExtraction(
      extractedData,
      params.fileName,
      params.prescriptionId
    );
    prescription.rawOcrText = rawOcrText;

    // If authenticated in Supabase, persist parsed prescription & medicines
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        prescription.userId = user.id;

        // 1. Update prescriptions table
        await (supabase as any)
          .from("prescriptions")
          .update({
            status: prescription.status,
            doctor_name: prescription.doctorName,
            prescription_date: prescription.prescriptionDate,
            diagnosis: prescription.diagnosis,
            summary: prescription.summary,
            raw_ocr_text: rawOcrText,
            updated_at: new Date().toISOString()
          })
          .eq("id", prescription.id);

        // 2. Insert extracted medicines
        for (const med of prescription.medicines) {
          await (supabase as any).from("medicines").insert({
            id: med.id,
            prescription_id: prescription.id,
            user_id: user.id,
            name: med.name,
            normalized_name: med.normalizedName,
            strength: med.strength,
            dosage: med.dosage,
            frequency: med.frequency,
            duration: med.duration,
            timing: med.timing,
            route: med.route,
            instructions: med.instructions,
            ingredients: med.ingredients,
            uses: med.uses,
            side_effects: med.sideEffects,
            warnings: med.warnings,
            confidence_score: med.confidenceScore || 0.85,
            needs_verification: med.needsVerification
          });
        }
      }
    }

    return {
      success: true,
      prescription
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Failed to process prescription."
    };
  }
}
