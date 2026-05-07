import Link from "next/link";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { KpiCard } from "@/components/kpi-card";
import { LocationTable } from "@/components/location-table";
import { Button, Card, PageHeader } from "@/components/ui";
import { getLocations } from "@/lib/data";

export default function DashboardPage() {
  const locations = getLocations();
  const totalMonthly = locations.reduce((sum, location) => sum + location.estimated_visits_monthly, 0);
  const avgGrowth =
    locations.reduce((sum, location) => sum + location.month_over_month_change, 0) / locations.length;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Overview"
        title="Location intelligence dashboard"
        description="Monitor synthetic location performance, traffic trends, competitors, and trade-area opportunities."
        actions={
          <Link href="/map">
            <Button>
              Open map search <ArrowRight size={16} />
            </Button>
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard label="Tracked locations" value={locations.length} />
        <KpiCard label="Monthly visits" value={totalMonthly} change={avgGrowth} />
        <KpiCard label="Avg. growth" value={`${avgGrowth.toFixed(1)}%`} />
        <KpiCard label="Demo data mode" value="Active" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">High-priority locations</h2>
            <Link className="text-sm font-semibold text-brand-600" href="/map">View map</Link>
          </div>
          <LocationTable locations={locations.slice(0, 5)} />
        </Card>

        <Card className="bg-ink text-white">
          <div className="flex h-full flex-col justify-between gap-8">
            <div>
              <MapPin className="text-brand-100" />
              <h2 className="mt-5 text-2xl font-bold">Start with a location decision</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Search for a place, review estimated traffic, compare competitors, then export a report.
              </p>
            </div>
            <Link href="/map">
              <Button className="w-full bg-white text-ink hover:bg-slate-100">
                <Search size={16} /> Search locations
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
