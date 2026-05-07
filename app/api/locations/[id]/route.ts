import { NextResponse } from "next/server";
import { buildInsight, getCompetitors, getLocationById } from "@/lib/data";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const location = getLocationById(params.id);

  if (!location) {
    return NextResponse.json({ error: "Location not found" }, { status: 404 });
  }

  return NextResponse.json({
    data: {
      location,
      competitors: getCompetitors(location),
      insight: buildInsight(location)
    }
  });
}
