import { NextResponse } from "next/server";
import { processPrescriptionAction } from "@/features/prescriptions/actions/processPrescription";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await processPrescriptionAction(body);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Prescription processing failed." },
      { status: 500 }
    );
  }
}
