import locations from "@/data/locations.json";
import type { Insight, LocationRecord } from "@/lib/types";

export const allLocations = locations as LocationRecord[];

export function getLocations() {
  return allLocations;
}

export function getLocationById(id: string) {
  return allLocations.find((location) => location.location_id === id);
}

export function getCompetitors(location: LocationRecord) {
  return location.competitor_locations
    .map((id) => getLocationById(id))
    .filter(Boolean) as LocationRecord[];
}

export function searchLocations(query = "", category = "All") {
  const normalized = query.trim().toLowerCase();
  return allLocations.filter((location) => {
    const matchesQuery =
      !normalized ||
      location.business_name.toLowerCase().includes(normalized) ||
      location.address.toLowerCase().includes(normalized) ||
      location.city.toLowerCase().includes(normalized) ||
      location.category.toLowerCase().includes(normalized);

    const matchesCategory = category === "All" || location.category === category;
    return matchesQuery && matchesCategory;
  });
}

export function buildInsight(location: LocationRecord): Insight {
  const competitors = getCompetitors(location);
  const avgCompetitorVisits =
    competitors.reduce((sum, competitor) => sum + competitor.estimated_visits_monthly, 0) /
    Math.max(competitors.length, 1);

  const outperformsCompetition =
    location.estimated_visits_monthly > avgCompetitorVisits;

  const growthLabel =
    location.month_over_month_change >= 8
      ? "strong growth"
      : location.month_over_month_change >= 0
        ? "stable growth"
        : "traffic softness";

  return {
    title: outperformsCompetition ? "High-potential location" : "Moderate-potential location",
    summary: `${location.business_name} shows ${growthLabel} with ${location.estimated_visits_monthly.toLocaleString()} estimated monthly visits. ${
      outperformsCompetition
        ? "It is currently outperforming the nearby competitor set."
        : "Nearby competitors have similar or stronger monthly traffic, so positioning and differentiation matter."
    } Peak activity occurs around ${location.peak_visit_hour}:00, with a median visit duration of ${location.median_visit_duration} minutes.`,
    actions: [
      location.month_over_month_change > 0
        ? "Add this site to the expansion shortlist and validate rent assumptions."
        : "Investigate the cause of recent traffic decline before committing.",
      competitors.length > 1
        ? "Compare audience origins and peak hours against the top two competitors."
        : "Collect more competitor data within a wider radius.",
      "Use visitor-origin areas for local marketing and out-of-home placement."
    ]
  };
}

export function buildReport(location: LocationRecord) {
  const competitors = getCompetitors(location);
  const insight = buildInsight(location);
  const topOrigin = [...location.visitor_home_zip_codes].sort((a, b) => b.visits - a.visits)[0];

  return [
    `Location Performance Report`,
    ``,
    `Location: ${location.business_name}`,
    `Category: ${location.category}`,
    `Address: ${location.address}`,
    ``,
    `Traffic Summary`,
    `- Estimated daily visits: ${location.estimated_visits_daily.toLocaleString()}`,
    `- Estimated weekly visits: ${location.estimated_visits_weekly.toLocaleString()}`,
    `- Estimated monthly visits: ${location.estimated_visits_monthly.toLocaleString()}`,
    `- Month-over-month change: ${location.month_over_month_change}%`,
    `- Year-over-year change: ${location.year_over_year_change}%`,
    `- Median visit duration: ${location.median_visit_duration} minutes`,
    ``,
    `Competitive Landscape`,
    ...competitors.map(
      (competitor) =>
        `- ${competitor.business_name}: ${competitor.estimated_visits_monthly.toLocaleString()} estimated monthly visits`
    ),
    ``,
    `Visitor-Origin Summary`,
    `- Top visitor origin ZIP: ${topOrigin?.zip ?? "N/A"} (${topOrigin?.visits.toLocaleString() ?? 0} estimated visits)`,
    `- Estimated trade area radius: ${location.trade_area_radius_km} km`,
    ``,
    `Insight`,
    `${insight.summary}`,
    ``,
    `Recommended Business Actions`,
    ...insight.actions.map((action) => `- ${action}`)
  ].join("\n");
}
