"use client";

import { Upload, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { usePrescriptionStore } from "@/features/prescriptions/hooks/usePrescriptionStore";

export function PrescriptionUpload() {
  const { openUpload } = usePrescriptionStore();

  return (
    <div className="rounded-2xl border border-teal-100 bg-teal-50/50 p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-teal-600 text-white">
          <FilePlus size={24} />
        </div>
        <div>
          <h3 className="font-bold text-slate-800">Upload New Prescription</h3>
          <p className="text-xs text-slate-500">
            Upload JPG, PNG, or PDF images to instantly extract medicine & dosage instructions.
          </p>
        </div>
      </div>
      <Button
        onClick={openUpload}
        className="mt-4 w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold"
      >
        <Upload size={17} /> Decode Prescription
      </Button>
    </div>
  );
}
