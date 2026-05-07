import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, GitCompare } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PeakHoursChart, TrafficTrendChart } from "@/components/charts";
import { InsightCard } from "@/components/insight-card";
import { KpiCard } from "@/components/kpi-card";
import { LocationTable } from "@/components/location-table";
import { Badge, Button, Card, PageHeader } from "@/components/ui";
import { buildInsight, getCompetitors, getLocationById } from "@/lib/data";

const LocationMap = dynamic(
  () => import("@/components/location-map").then((mod) => mod.LocationMap),
  { ssr: false }
);

export default function LocationDetailPage({ params }: { params: { id: string } }) {
  const location = getLocationById(params.id);

  if (!location) {
    notFound();
  }

  const competitors = getCompetitors(location);
  const insight = buildInsight(location);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Location profile"
        title={location.business_name}
        description={location.address}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link href={`/compare?ids=${location.location_id},${competitors[0]?.location_id ?? ""}`}>
              <Button variant="secondary">
                <GitCompare size={16} /> Compare
              </Button>
            </Link>
            <a href={`/api/reports/${location.location_id}`} download>
              <Button>
                <Download size={16} /> Download report
              </Button>
            </a>
          </div>
        }
      />

      <div className="mb-6 flex flex-wrap gap-2">
        <Badge>{location.category}</Badge>
        <Badge>{location.city}</Badge>
        <Badge>Synthetic data</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard label="Daily visits" value={location.estimated_visits_daily} />
        <KpiCard label="Weekly visits" value={location.estimated_visits_weekly} />
        <KpiCard label="Monthly visits" value={location.estimated_visits_monthly} change={location.month_over_month_change} />
        <KpiCard label="Median duration" value={`${location.median_visit_duration} min`} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-3">
          <LocationMap locations={[location, ...competitors]} selected={location} />
        </Card>
        <InsightCard insight={insight} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-lg font-bold">Traffic trend</h2>
          <TrafficTrendChart location={location} />
        </Card>
        <Card>
          <h2 className="mb-4 text-lg font-bold">Peak hours</h2>
          <PeakHoursChart location={location} />
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_420px]">
        <Card>
          <h2 className="mb-4 text-lg font-bold">Nearby competitor table</h2>
          <LocationTable locations={competitors} />
        </Card>
        <Card>
          <h2 className="text-lg font-bold">Visitor-origin summary</h2>
          <div className="mt-4 space-y-4">
            {location.visitor_home_zip_codes.map((origin) => (
              <div key={origin.zip}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-semibold">ZIP {origin.zip}</span>
                  <span>{origin.visits.toLocaleString()} visits</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-brand-600"
                    style={{
                      width: `${Math.min(
                        100,
                        (origin.visits /
                          Math.max(...location.visitor_home_zip_codes.map((item) => item.visits))) *
                          100
                      )}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
