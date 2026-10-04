import { NextResponse } from "next/server";

export async function POST() {
  // Production: authenticate user, validate multipart file, upload to private Supabase Storage.
  return NextResponse.json({
    message: "Prescription upload endpoint placeholder."
  });
}
