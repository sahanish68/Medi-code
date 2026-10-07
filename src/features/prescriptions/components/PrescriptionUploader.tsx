"use client";

import { useState, useRef, type ChangeEvent, type DragEvent } from "react";
import { Upload, FileUp, ShieldCheck, Camera, Sparkles } from "lucide-react";
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
      setLocalError(validation.error || "Invalid file format. Please upload JPG, PNG, or PDF.");
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
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`relative overflow-hidden rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center backdrop-blur-2xl transition-all duration-300 ${
            dragOver
              ? "border-cyan-400 bg-cyan-950/40 shadow-[0_0_40px_rgba(6,182,212,0.3)] scale-[1.01]"
              : "border-cyan-500/25 bg-slate-950/80 hover:border-cyan-400/50 hover:bg-slate-900/80"
          }`}
        >
          {/* Background Ambient Glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative z-10 space-y-4">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl border border-cyan-400/40 bg-cyan-950/60 text-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.25)] animate-float">
              <FileUp size={36} />
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-gradient-cyan">
              Upload Prescription or Medical Report
            </h2>

            <p className="mx-auto max-w-md text-xs sm:text-sm text-slate-300 leading-relaxed">
              Drag & drop doctor prescription images or PDF documents here, or choose a file to begin clinical AI extraction.
            </p>

            <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-400/80">
              <Sparkles size={13} /> JPG, PNG, JPEG, PDF • Up to 10 MB
            </div>

            <input
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

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Button
                type="button"
                variant="glow"
                size="lg"
                onClick={() => inputRef.current?.click()}
              >
                <Upload size={18} /> Select Prescription File
              </Button>

              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => cameraInputRef.current?.click()}
              >
                <Camera size={18} /> Take Camera Photo
              </Button>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
              <span>Client-isolated encrypted buffer. Zero permanent raw storage.</span>
            </div>
          </div>
        </div>
      )}

      {(localError || error) && (
        <Alert variant="error" title="Processing Notice">
          <p className="text-xs">{localError || error}</p>
          <div className="mt-2 flex gap-2">
            <Button size="sm" variant="secondary" onClick={() => setLocalError(null)}>
              Try Again
            </Button>
          </div>
        </Alert>
      )}
    </div>
  );
}
