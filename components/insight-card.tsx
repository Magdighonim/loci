import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui";
import type { Insight } from "@/lib/types";

export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <Card className="border-brand-100 bg-gradient-to-br from-white to-brand-50">
      <div className="mb-3 flex items-center gap-2 text-brand-700">
        <Sparkles size={18} />
        <p className="text-sm font-bold uppercase tracking-wide">AI-generated demo insight</p>
      </div>
      <h3 className="text-xl font-bold text-ink">{insight.title}</h3>
      <p className="mt-3 text-sm leading-6 text-mutedInk">{insight.summary}</p>
      <div className="mt-5">
        <p className="text-sm font-semibold text-ink">Recommended actions</p>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-mutedInk">
          {insight.actions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
