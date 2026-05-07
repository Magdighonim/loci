import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui";
import { formatChange, formatNumber } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  change,
  suffix = ""
}: {
  label: string;
  value: number | string;
  change?: number;
  suffix?: string;
}) {
  const positive = typeof change === "number" && change >= 0;

  return (
    <Card className="p-4">
      <p className="text-sm font-medium text-mutedInk">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <p className="text-2xl font-bold text-ink">
          {typeof value === "number" ? formatNumber(value) : value}
          {suffix}
        </p>
        {typeof change === "number" && (
          <span
            className={
              positive
                ? "flex items-center gap-1 text-sm font-semibold text-emerald-600"
                : "flex items-center gap-1 text-sm font-semibold text-rose-600"
            }
          >
            {positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            {formatChange(change)}
          </span>
        )}
      </div>
    </Card>
  );
}
