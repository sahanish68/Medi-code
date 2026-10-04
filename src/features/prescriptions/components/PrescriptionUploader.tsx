"use client";

import { useState, useRef, type ChangeEvent, type DragEvent } from "react";
import { Upload, FileUp, ShieldCheck, Camera } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { usePrescriptionStore } from "../hooks/usePrescriptionStore";
import { validatePrescriptionFile } from "../utils/prescriptionValidation";
import { UploadPreview } from "./UploadPreview";
import { ProcessingStatus } from "./ProcessingStatus";

export function PrescriptionUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const { processing, processingStep, error, processFile } = usePrescriptionStore();

  const handleSelectFile = (file: File) => {
    setLocalError(null);
    const validation = validatePrescriptionFile(file);
    if (!validation.isValid) {
      setLocalError(validation.error || "Invalid file format");
      return;
    }

    setSelectedFile(file);
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleSelectFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleSelectFile(file);
  };

  const handleStartProcessing = async () => {
    if (!selectedFile) return;
    const ok = await processFile(selectedFile);
    if (ok) {
      setSelectedFile(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setLocalError(null);
  };

  return (
    <div className="space-y-4">
      {processing ? (
        <ProcessingStatus currentStep={processingStep} />
      ) : selectedFile ? (
        <UploadPreview
          file={selectedFile}
          previewUrl={previewUrl}
          onClear={handleClear}
          onProcess={handleStartProcessing}
          isProcessing={processing}
        />
      ) : (
        <Card
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed text-center transition-all ${
            dragOver
              ? "border-teal-500 bg-teal-50/40"
              : "border-slate-300 hover:border-slate-400 bg-white"
          }`}
        >
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-teal-50 text-teal-600 shadow-xs">
            <FileUp size={30} />
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Upload Prescription or Medical Report
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            Drag & drop your prescription image or PDF here, or select from your device.
          </p>

          <div className="mt-1 flex items-center justify-center gap-2 text-xs text-slate-400">
            <span>JPG, PNG, JPEG, PDF</span>
            <span>•</span>
            <span>Up to 10 MB</span>
          </div>

          <input
            id="prescription-file-input"
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
            className="hidden"
            onChange={handleInputChange}
          />

          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleInputChange}
          />

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button
              type="button"
              variant="primary"
              onClick={() => inputRef.current?.click()}
            >
              <Upload size={16} /> Choose File
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() => cameraInputRef.current?.click()}
              className="sm:inline-flex"
            >
              <Camera size={16} /> Take Photo
            </Button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 border-t border-slate-100 pt-4">
            <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
            <span>Encrypted & private medical storage. Accessible only by you.</span>
          </div>
        </Card>
      )}

      {(localError || error) && (
        <Alert variant="error" title="Upload Notice">
          {localError || error}
        </Alert>
      )}
    </div>
  );
}
