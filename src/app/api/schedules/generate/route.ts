import { NextResponse } from "next/server";
import { generateScheduleFromMedicines } from "@/features/medication-schedule/services/scheduleGenerator";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { medicines } = body;

    if (!medicines || !Array.isArray(medicines)) {
      return NextResponse.json(
        { error: "Invalid payload. Array of medicines expected." },
        { status: 400 }
      );
    }

    const schedule = generateScheduleFromMedicines(medicines);
    return NextResponse.json({ schedule });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
