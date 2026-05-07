import { NextResponse } from "next/server";

/**
 * Demo-only upload endpoint.
 * Production version should validate file types, scan uploads, parse CSV safely,
 * write to PostgreSQL/PostGIS, and store raw files in private object storage.
 */
export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    message: "File received in demo mode. Persistence is not enabled in this starter.",
    filename: file.name,
    size: file.size
  });
}
