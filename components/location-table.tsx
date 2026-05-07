import Link from "next/link";
import type { LocationRecord } from "@/lib/types";
import { formatChange, formatNumber } from "@/lib/utils";

export function LocationTable({ locations }: { locations: LocationRecord[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-4">Location</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Monthly visits</th>
              <th className="px-5 py-4">MoM</th>
              <th className="px-5 py-4">Duration</th>
              <th className="px-5 py-4">Competitors</th>
              <th className="px-5 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {locations.map((location) => (
              <tr key={location.location_id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <p className="font-semibold text-ink">{location.business_name}</p>
                  <p className="text-xs text-mutedInk">{location.address}</p>
                </td>
                <td className="px-5 py-4">{location.category}</td>
                <td className="px-5 py-4 font-semibold">
                  {formatNumber(location.estimated_visits_monthly)}
                </td>
                <td className="px-5 py-4">{formatChange(location.month_over_month_change)}</td>
                <td className="px-5 py-4">{location.median_visit_duration} min</td>
                <td className="px-5 py-4">{location.competitor_locations.length}</td>
                <td className="px-5 py-4">
                  <Link className="font-semibold text-brand-600" href={`/locations/${location.location_id}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
