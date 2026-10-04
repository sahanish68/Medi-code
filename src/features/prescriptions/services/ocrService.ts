import { extractPrescriptionWithAI } from "@/lib/ai/client";
import type { PrescriptionExtraction } from "@/lib/ai/schemas";

export async function processPrescriptionOCR(params: {
  imageBase64?: string;
  mimeType?: string;
  fileName: string;
  rawText?: string;
  fileBuffer?: Buffer;
}): Promise<{
  extractedData: PrescriptionExtraction;
  rawOcrText: string;
}> {
  // If base64 is not provided but buffer is available, convert it
  let base64 = params.imageBase64;
  if (!base64 && params.fileBuffer) {
    base64 = params.fileBuffer.toString("base64");
  }

  const extractedData = await extractPrescriptionWithAI({
    imageBase64: base64,
    mimeType: params.mimeType,
    fileName: params.fileName,
    rawText: params.rawText
  });

  const rawOcrText = [
    `Doctor: ${extractedData.doctorName || "Not detected"}`,
    `Date: ${extractedData.prescriptionDate || "Not detected"}`,
    `Diagnosis: ${extractedData.diagnosis || "Not specified"}`,
    "Medicines:",
    ...extractedData.medicines.map(
      (m) =>
        `- ${m.name} ${m.strength || ""}: ${m.dosage || "1 dose"} (${m.frequency || "daily"}), ${m.timing || "after food"} for ${m.duration || "5 days"}`
    ),
    extractedData.additionalInstructions ? `Instructions: ${extractedData.additionalInstructions}` : ""
  ].filter(Boolean).join("\n");

  return {
    extractedData,
    rawOcrText
  };
}
