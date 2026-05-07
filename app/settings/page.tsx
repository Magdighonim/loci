import { AppShell } from "@/components/app-shell";
import { Card, PageHeader } from "@/components/ui";

export default function SettingsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Settings"
        title="Workspace settings"
        description="Configuration placeholders for account, team, dataset, map, and reporting preferences."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-bold">Data mode</h2>
          <p className="mt-2 text-sm text-mutedInk">Synthetic demo data is currently active.</p>
        </Card>
        <Card>
          <h2 className="text-lg font-bold">Map provider</h2>
          <p className="mt-2 text-sm text-mutedInk">Leaflet + OpenStreetMap tiles for first MVP.</p>
        </Card>
        <Card>
          <h2 className="text-lg font-bold">Auth provider</h2>
          <p className="mt-2 text-sm text-mutedInk">Mock auth now. Replace with Clerk, Supabase Auth, or NextAuth.</p>
        </Card>
        <Card>
          <h2 className="text-lg font-bold">Database</h2>
          <p className="mt-2 text-sm text-mutedInk">JSON now. Replace with PostgreSQL + PostGIS.</p>
        </Card>
      </div>
    </AppShell>
  );
}
