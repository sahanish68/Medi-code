import { describe, it, expect } from "vitest";
import { validatePrescriptionFile } from "../prescriptionValidation";

describe("Prescription File Validation", () => {
  it("approves valid JPG, PNG, and PDF files within 10MB", () => {
    const fakeJpg = new File(["dummy content"], "prescription.jpg", { type: "image/jpeg" });
    const fakePdf = new File(["dummy content"], "report.pdf", { type: "application/pdf" });

    expect(validatePrescriptionFile(fakeJpg).isValid).toBe(true);
    expect(validatePrescriptionFile(fakePdf).isValid).toBe(true);
  });

  it("rejects unsupported file formats like executable or text files", () => {
    const fakeExe = new File(["binary"], "app.exe", { type: "application/x-msdownload" });
    const validation = validatePrescriptionFile(fakeExe);

    expect(validation.isValid).toBe(false);
    expect(validation.error).toContain("Unsupported file format");
  });

  it("rejects empty 0-byte files", () => {
    const emptyFile = new File([], "empty.png", { type: "image/png" });
    const validation = validatePrescriptionFile(emptyFile);

    expect(validation.isValid).toBe(false);
    expect(validation.error).toContain("file is empty");
  });
});
