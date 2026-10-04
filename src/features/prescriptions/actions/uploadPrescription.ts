"use server";

import { createClient } from "@/lib/supabase/server";
import { validatePrescriptionFile } from "../utils/prescriptionValidation";
import { generateId } from "@/lib/utils/id";
import type { UploadActionResult } from "../types/prescription.types";

export async function uploadPrescriptionAction(formData: FormData): Promise<UploadActionResult> {
  try {
    const file = formData.get("file") as File | null;
    if (!file) {
      return { success: false, error: "No file provided for upload." };
    }

    // Validation
    const validation = validatePrescriptionFile(file);
    if (!validation.isValid) {
      return { success: false, error: validation.error };
    }

    const prescriptionId = generateId();
    const supabase = await createClient();

    // Check if user is authenticated with Supabase
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || "guest-patient";
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const storagePath = `${userId}/${prescriptionId}/${sanitizedName}`;

      const fileBuffer = Buffer.from(await file.arrayBuffer());

      // 1. Upload to private bucket 'prescriptions'
      const { error: uploadError } = await supabase.storage
        .from("prescriptions")
        .upload(storagePath, fileBuffer, {
          contentType: file.type || "application/octet-stream",
          upsert: false
        });

      if (uploadError) {
        console.warn("Supabase storage upload skipped/failed:", uploadError.message);
      }

      // 2. Generate signed URL (expires in 1 hour)
      let signedUrl = "";
      const { data: signedData } = await supabase.storage
        .from("prescriptions")
        .createSignedUrl(storagePath, 3600);

      if (signedData?.signedUrl) {
        signedUrl = signedData.signedUrl;
      }

      // 3. Insert record into prescriptions table if user is logged in
      if (user) {
        await (supabase as any).from("prescriptions").insert({
          id: prescriptionId,
          user_id: user.id,
          file_path: storagePath,
          file_type: file.type,
          original_file_name: file.name,
          status: "uploaded"
        });
      }

      return {
        success: true,
        prescriptionId,
        filePath: storagePath,
        signedUrl
      };
    }

    // Local / Preview fallback
    return {
      success: true,
      prescriptionId,
      filePath: `local/${prescriptionId}/${file.name}`
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "An unexpected error occurred during upload."
    };
  }
}
