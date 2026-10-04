import { NextResponse } from "next/server";
import { searchNearbyHealthcare } from "@/features/healthcare-locator/services/healthcareLocatorService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location") || "";
    const type = searchParams.get("type") || "all";
    const ownership = searchParams.get("ownership") || "all";
    const latStr = searchParams.get("lat");
    const lngStr = searchParams.get("lng");

    const latitude = latStr ? parseFloat(latStr) : undefined;
    const longitude = lngStr ? parseFloat(lngStr) : undefined;

    const facilities = await searchNearbyHealthcare({
      location,
      type: type as any,
      ownership: ownership as any,
      latitude,
      longitude
    });

    return NextResponse.json({ facilities });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
