import { NextResponse } from "next/server";
import { uploadPrescriptionAction } from "@/features/prescriptions/actions/uploadPrescription";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const result = await uploadPrescriptionAction(formData);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Upload failed." },
      { status: 500 }
    );
  }
}
