export type VisitorOrigin = {
  zip: string;
  visits: number;
  lat: number;
  lng: number;
};

export type PeakHour = {
  hour: string;
  visits: number;
};

export type LocationRecord = {
  location_id: string;
  business_name: string;
  category: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  estimated_visits_daily: number;
  estimated_visits_weekly: number;
  estimated_visits_monthly: number;
  median_visit_duration: number;
  peak_visit_hour: number;
  visitor_home_zip_codes: VisitorOrigin[];
  competitor_locations: string[];
  month_over_month_change: number;
  year_over_year_change: number;
  trade_area_radius_km: number;
  trend: number[];
  peak_hours: PeakHour[];
};

export type Insight = {
  title: string;
  summary: string;
  actions: string[];
};
