"use client";

import { FileText, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface UploadPreviewProps {
  file: File;
  previewUrl: string | null;
  onClear: () => void;
  onProcess: () => void;
  isProcessing: boolean;
}

export function UploadPreview({
  file,
  previewUrl,
  onClear,
  onProcess,
  isProcessing
}: UploadPreviewProps) {
  const isImage = file.type.startsWith("image/");
  const fileSizeMb = (file.size / (1024 * 1024)).toFixed(2);

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-teal-50 text-teal-700">
            {isImage ? <ImageIcon size={24} /> : <FileText size={24} />}
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800 line-clamp-1">{file.name}</div>
            <div className="text-xs text-slate-500">{fileSizeMb} MB • {file.type || "Document"}</div>
          </div>
        </div>

        <button
          onClick={onClear}
          disabled={isProcessing}
          aria-label="Remove file"
          className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition disabled:opacity-50"
        >
          <X size={18} />
        </button>
      </div>

      {isImage && previewUrl && (
        <div className="mt-3 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 max-h-60 flex items-center justify-center">
          <img
            src={previewUrl}
            alt="Prescription preview"
            className="h-full w-full object-contain max-h-60"
          />
        </div>
      )}

      <div className="mt-4 flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={onClear} disabled={isProcessing}>
          Cancel
        </Button>
        <Button variant="primary" className="flex-1" onClick={onProcess} isLoading={isProcessing}>
          Decode Prescription
        </Button>
      </div>
    </div>
  );
}
