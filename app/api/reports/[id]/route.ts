import { NextResponse } from "next/server";
import { buildReport, getLocationById } from "@/lib/data";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const location = getLocationById(params.id);

  if (!location) {
    return NextResponse.json({ error: "Location not found" }, { status: 404 });
  }

  return new NextResponse(buildReport(location), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${location.location_id}-report.txt"`
    }
  });
}
