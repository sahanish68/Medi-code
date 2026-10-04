"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Prescription } from "../types/prescription.types";
import { uploadPrescriptionAction } from "../actions/uploadPrescription";
import { processPrescriptionAction } from "../actions/processPrescription";
import { validatePrescriptionFile } from "../utils/prescriptionValidation";

export type ProcessingStep =
  | "idle"
  | "uploading"
  | "reading"
  | "identifying"
  | "generating"
  | "completed";

export interface PrescriptionStore {
  prescription: Prescription | null;
  prescriptions: Prescription[];
  processing: boolean;
  processingStep: ProcessingStep;
  error: string;
  openUpload: () => void;
  processFile: (file: File) => Promise<boolean>;
  selectPrescription: (id: string) => void;
  clear: () => void;
}

export const usePrescriptionStore = create<PrescriptionStore>()(
  persist(
    (set, get) => ({
      prescription: null,
      prescriptions: [],
      processing: false,
      processingStep: "idle",
      error: "",

      openUpload: () => {
        document.getElementById("prescription-file-input")?.click();
      },

      processFile: async (file: File) => {
        const validation = validatePrescriptionFile(file);
        if (!validation.isValid) {
          set({ error: validation.error || "Invalid file", processing: false, processingStep: "idle" });
          return false;
        }

        set({ processing: true, error: "", processingStep: "uploading" });

        try {
          // 1. Upload
          const formData = new FormData();
          formData.append("file", file);
          const uploadRes = await uploadPrescriptionAction(formData);

          if (!uploadRes.success) {
            throw new Error(uploadRes.error || "File upload failed");
          }

          // 2. Reading
          set({ processingStep: "reading" });

          // 3. Image Compression & Browser OCR Scan
          set({ processingStep: "identifying" });
          let base64: string | undefined;
          let rawText: string | undefined;
          let fingerprint = `${file.name}-${file.size}-${file.lastModified}`;

          if (file.type.startsWith("image/")) {
            const dataUrl = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.readAsDataURL(file);
            });

            // Canvas compression & pixel sampling for unique image identification
            const img = new Image();
            img.src = dataUrl;
            await new Promise((res) => { img.onload = res; });

            const canvas = document.createElement("canvas");
            const maxDim = 1200;
            let width = img.width;
            let height = img.height;
            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const sampleData = ctx.getImageData(0, 0, Math.min(10, width), Math.min(10, height)).data;
              fingerprint += "-" + Array.from(sampleData.slice(0, 32)).join("");
              const compressedUrl = canvas.toDataURL("image/jpeg", 0.85);
              base64 = compressedUrl.split(",")[1];
            } else {
              base64 = dataUrl.split(",")[1];
            }

            // Client-side Browser Tesseract OCR scan for maximum reliability across serverless/Vercel
            try {
              const tesseract = await import("tesseract.js");
              if (tesseract && typeof tesseract.recognize === "function") {
                const ret = await tesseract.recognize(dataUrl, "eng");
                if (ret?.data?.text) {
                  rawText = ret.data.text;
                }
              }
            } catch (ocrErr) {
              console.warn("Client browser Tesseract scan skipped:", ocrErr);
            }
          }

          // 4. Generating schedule & finalizing
          set({ processingStep: "generating" });
          const processRes = await processPrescriptionAction({
            prescriptionId: uploadRes.prescriptionId!,
            filePath: uploadRes.filePath,
            fileName: file.name,
            imageBase64: base64,
            mimeType: file.type,
            rawText
          });

          if (!processRes.success || !processRes.prescription) {
            throw new Error(processRes.error || "Prescription extraction failed");
          }

          const parsedPrescription = processRes.prescription;
          const updatedPrescriptions = [
            parsedPrescription,
            ...get().prescriptions.filter((p) => p.id !== parsedPrescription.id)
          ];

          set({
            prescription: parsedPrescription,
            prescriptions: updatedPrescriptions,
            processing: false,
            processingStep: "completed"
          });

          return true;
        } catch (err: any) {
          set({
            processing: false,
            processingStep: "idle",
            error: err.message || "We couldn't process this prescription right now. Please try again."
          });
          return false;
        }
      },

      selectPrescription: (id: string) => {
        const item = get().prescriptions.find((p) => p.id === id);
        if (item) {
          set({ prescription: item });
        }
      },

      clear: () => set({ prescription: null, error: "", processingStep: "idle" })
    }),
    {
      name: "medidecode-prescriptions-v3"
    }
  )
);
