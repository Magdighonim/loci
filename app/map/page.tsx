"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { KpiCard } from "@/components/kpi-card";
import { LocationTable } from "@/components/location-table";
import { Button, Card, PageHeader } from "@/components/ui";
import { getLocations, searchLocations } from "@/lib/data";

const LocationMap = dynamic(
  () => import("@/components/location-map").then((mod) => mod.LocationMap),
  { ssr: false }
);

export default function MapPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const results = useMemo(() => searchLocations(query, category), [query, category]);
  const selected = results[0] ?? getLocations()[0];

  return (
    <AppShell>
      <PageHeader
        eyebrow="Map search"
        title="Explore locations"
        description="Search and filter synthetic locations, review quick KPIs, then open a full location profile."
      />

      <Card className="mb-6">
        <div className="grid gap-3 lg:grid-cols-[1fr_220px_140px]">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
            <input
              className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4"
              placeholder="Search by business, category, city, or address"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <select
            className="rounded-2xl border border-slate-200 px-4 py-3"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option>All</option>
            <option>Coffee Shop</option>
            <option>Grocery</option>
          </select>
          <Link href={`/locations/${selected.location_id}`}>
            <Button className="h-full w-full">Open profile</Button>
          </Link>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <Card className="p-3">
          <LocationMap locations={results} selected={selected} />
        </Card>

        <div className="space-y-4">
          <KpiCard label="Results" value={results.length} />
          <KpiCard label="Selected monthly visits" value={selected.estimated_visits_monthly} change={selected.month_over_month_change} />
          <KpiCard label="Trade area radius" value={`${selected.trade_area_radius_km} km`} />
          <Card>
            <h2 className="text-lg font-bold">{selected.business_name}</h2>
            <p className="mt-2 text-sm leading-6 text-mutedInk">{selected.address}</p>
            <div className="mt-5">
              <Link href={`/locations/${selected.location_id}`}>
                <Button className="w-full">View full profile</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <LocationTable locations={results} />
      </div>
    </AppShell>
  );
}
