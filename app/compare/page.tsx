"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Card, PageHeader } from "@/components/ui";
import { getLocations } from "@/lib/data";
import { formatChange, formatNumber } from "@/lib/utils";

export default function ComparePage() {
  const locations = getLocations();
  const [selectedIds, setSelectedIds] = useState<string[]>(locations.slice(0, 3).map((location) => location.location_id));
  const selected = useMemo(
    () => locations.filter((location) => selectedIds.includes(location.location_id)).slice(0, 5),
    [locations, selectedIds]
  );

  function toggle(id: string) {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }
      if (current.length >= 5) return current;
      return [...current, id];
    });
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="Comparison"
        title="Compare 2–5 locations"
        description="Benchmark locations by monthly visits, growth, peak hours, visit duration, competitor density, and trade-area radius."
      />

      <Card className="mb-6">
        <div className="grid gap-3 md:grid-cols-3">
          {locations.map((location) => (
            <label key={location.location_id} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-4">
              <input type="checkbox" checked={selectedIds.includes(location.location_id)} onChange={() => toggle(location.location_id)} />
              <span>
                <span className="block font-semibold">{location.business_name}</span>
                <span className="text-sm text-mutedInk">{location.category}</span>
              </span>
            </label>
          ))}
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Metric</th>
                {selected.map((location) => (
                  <th key={location.location_id} className="px-4 py-3">{location.business_name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-4 py-4 font-semibold">Monthly visits</td>
                {selected.map((location) => <td key={location.location_id} className="px-4 py-4">{formatNumber(location.estimated_visits_monthly)}</td>)}
              </tr>
              <tr>
                <td className="px-4 py-4 font-semibold">Growth rate</td>
                {selected.map((location) => <td key={location.location_id} className="px-4 py-4">{formatChange(location.month_over_month_change)}</td>)}
              </tr>
              <tr>
                <td className="px-4 py-4 font-semibold">Peak hour</td>
                {selected.map((location) => <td key={location.location_id} className="px-4 py-4">{location.peak_visit_hour}:00</td>)}
              </tr>
              <tr>
                <td className="px-4 py-4 font-semibold">Visit duration</td>
                {selected.map((location) => <td key={location.location_id} className="px-4 py-4">{location.median_visit_duration} min</td>)}
              </tr>
              <tr>
                <td className="px-4 py-4 font-semibold">Competitor density</td>
                {selected.map((location) => <td key={location.location_id} className="px-4 py-4">{location.competitor_locations.length} nearby</td>)}
              </tr>
              <tr>
                <td className="px-4 py-4 font-semibold">Trade area size</td>
                {selected.map((location) => <td key={location.location_id} className="px-4 py-4">{location.trade_area_radius_km} km radius</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
