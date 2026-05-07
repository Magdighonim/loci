import { Download } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button, Card, PageHeader } from "@/components/ui";
import { getLocations } from "@/lib/data";

export default function ReportsPage() {
  const locations = getLocations();

  return (
    <AppShell>
      <PageHeader
        eyebrow="Reports"
        title="Generate location-performance reports"
        description="Download simple report files covering overview, traffic summary, competitors, visitor origins, and recommended actions."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {locations.map((location) => (
          <Card key={location.location_id}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-bold">{location.business_name}</h2>
                <p className="mt-1 text-sm text-mutedInk">{location.address}</p>
              </div>
              <a href={`/api/reports/${location.location_id}`} download>
                <Button>
                  <Download size={16} /> Download
                </Button>
              </a>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
