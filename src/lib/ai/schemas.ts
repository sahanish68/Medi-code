import { z } from "zod";

export const extractedMedicineSchema = z.object({
  name: z.string().min(1, "Medicine name cannot be empty"),
  strength: z.string().nullable().optional().default(""),
  dosage: z.string().nullable().optional().default("1 dose"),
  frequency: z.string().nullable().optional().default("Twice daily"),
  duration: z.string().nullable().optional().default("5 days"),
  timing: z.string().nullable().optional().default("After food"),
  route: z.string().nullable().optional().default("Oral"),
  instructions: z.string().nullable().optional().default(""),
  confidenceScore: z.number().min(0).max(1).default(0.85),
  needsVerification: z.boolean().default(false)
});

export const prescriptionExtractionSchema = z.object({
  doctorName: z.string().nullable().optional().default(""),
  prescriptionDate: z.string().nullable().optional().default(""),
  diagnosis: z.string().nullable().optional().default(""),
  additionalInstructions: z.string().nullable().optional().default(""),
  medicines: z.array(extractedMedicineSchema).default([])
});

export type ExtractedMedicine = z.infer<typeof extractedMedicineSchema>;
export type PrescriptionExtraction = z.infer<typeof prescriptionExtractionSchema>;
