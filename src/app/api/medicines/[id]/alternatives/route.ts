import { NextResponse } from "next/server";
import { getAlternativesForMedicine } from "@/features/medicine-alternatives/services/alternativeMedicineService";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const alternatives = await getAlternativesForMedicine(id);
    return NextResponse.json({ alternatives });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
