"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button, Card, PageHeader } from "@/components/ui";

export default function AdminUploadPage() {
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Uploading...");
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      });
      const json = await response.json();
      setMessage(json.message ?? json.error ?? "Done");
    } catch {
      setMessage("Upload failed. Please try again.");
    }
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="Admin"
        title="Upload or manage datasets"
        description="Demo endpoint for CSV upload. Production should validate, parse, store, and version datasets safely."
      />

      <Card className="max-w-2xl">
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <Upload className="mx-auto text-slate-400" size={32} />
            <p className="mt-3 font-semibold">Upload CSV dataset</p>
            <p className="mt-1 text-sm text-mutedInk">
              Expected columns: location_id, business_name, category, latitude, longitude, visits, origins.
            </p>
            <input className="mt-6 w-full rounded-2xl border border-slate-200 bg-white p-3" type="file" name="file" accept=".csv,.json" />
          </div>
          <Button type="submit">Upload demo file</Button>
          {message && <p className="text-sm font-semibold text-brand-700">{message}</p>}
        </form>
      </Card>
    </AppShell>
  );
}
