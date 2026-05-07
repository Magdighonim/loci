import { NextResponse } from "next/server";
import { searchLocations } from "@/lib/data";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") ?? "";
  const category = url.searchParams.get("category") ?? "All";

  return NextResponse.json({
    data: searchLocations(query, category),
    meta: {
      mode: "synthetic",
      count: searchLocations(query, category).length
    }
  });
}
