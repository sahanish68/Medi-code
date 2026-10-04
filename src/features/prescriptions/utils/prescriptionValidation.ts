export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf"
];

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export function validatePrescriptionFile(file: File | { name: string; size: number; type: string }): ValidationResult {
  if (!file) {
    return { isValid: false, error: "Please select a file to upload." };
  }

  if (file.size === 0) {
    return { isValid: false, error: "The selected file is empty or corrupted." };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      isValid: false,
      error: `File size exceeds the 10MB limit (Current: ${(file.size / (1024 * 1024)).toFixed(1)}MB). Please upload a smaller image or compressed PDF.`
    };
  }

  const extension = file.name.split(".").pop()?.toLowerCase();
  const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];

  const hasValidExtension = extension && allowedExtensions.includes(extension);
  const hasValidMime = file.type ? ALLOWED_MIME_TYPES.includes(file.type.toLowerCase()) : false;

  if (!hasValidExtension && !hasValidMime) {
    return {
      isValid: false,
      error: "Unsupported file format. Please upload a JPG, JPEG, PNG, or PDF prescription."
    };
  }

  return { isValid: true };
}
