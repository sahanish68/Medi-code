"use client";

import { FileText } from "lucide-react";
import { PageTitle } from "@/components/ui/PageTitle";
import { PrescriptionUploader } from "./PrescriptionUploader";
import { PrescriptionResult } from "./PrescriptionResult";

export function PrescriptionsPage() {
  return (
    <div className="space-y-6">
      <PageTitle
        title="Prescriptions"
        description="Upload a prescription, review extracted information and verify uncertain fields."
        icon={FileText}
      />
      <PrescriptionUploader />
      <PrescriptionResult />
    </div>
  );
}
