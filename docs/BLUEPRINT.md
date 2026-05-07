# LocIntel MVP Blueprint

## 1. MVP Product Specification

### Product
A map-first B2B SaaS web app that helps business users evaluate physical locations using synthetic, public, user-uploaded, or legally licensed data.

### Core value
Help users answer:
- Is this location worth opening, leasing, buying, or investing in?
- How does it perform against nearby competitors?
- Where do visitors likely come from?
- What actions should the business take next?

### MVP features
- Authentication shell
- Dashboard
- Map-based location search
- Location profile
- Foot traffic trend charts
- Peak hour charts
- Competitor comparison
- Trade area visualization
- Visitor-origin visualization
- Report download
- Admin data upload placeholder
- Synthetic demo data mode

## 2. User Personas

### Retail Expansion Manager
Needs to find and validate new store opportunities.

### Real Estate Broker
Needs to prove the commercial strength of a property.

### Franchise Owner
Needs to compare candidate territories and reduce expansion risk.

### Local Business Operator
Needs to understand competitors and customer-origin areas.

### Investor / Analyst
Needs to compare performance signals across physical locations.

## 3. Main User Flows

### Analyze a location
Search → select POI → view profile → inspect KPIs → review competitors → download report.

### Compare locations
Choose 2–5 locations → compare traffic/growth/peak hours/duration/competitors/trade area → pick stronger site.

### Generate report
Open location → generate report → download summary.

### Admin upload
Upload CSV/JSON → validate columns → preview → approve import.

## 4. Database Schema

Recommended production schema for PostgreSQL + PostGIS:

```sql
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id),
  email text UNIQUE NOT NULL,
  role text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id),
  business_name text NOT NULL,
  category text NOT NULL,
  address text,
  city text,
  state text,
  geom geography(Point, 4326) NOT NULL,
  trade_area_radius_km numeric DEFAULT 3,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX locations_geom_idx ON locations USING GIST (geom);

CREATE TABLE traffic_estimates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id uuid REFERENCES locations(id),
  date date NOT NULL,
  estimated_visits integer NOT NULL,
  median_visit_duration integer,
  peak_visit_hour integer,
  source text NOT NULL DEFAULT 'synthetic',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE visitor_origins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id uuid REFERENCES locations(id),
  zip_code text NOT NULL,
  estimated_visits integer NOT NULL,
  geom geography(Point, 4326)
);

CREATE TABLE competitor_edges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id uuid REFERENCES locations(id),
  competitor_location_id uuid REFERENCES locations(id),
  distance_km numeric,
  competitor_type text
);

CREATE TABLE reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id uuid REFERENCES locations(id),
  user_id uuid REFERENCES users(id),
  title text NOT NULL,
  content jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);
```

## 5. API Route Design

### Public app API
- `GET /api/locations?q=&category=`
- `GET /api/locations/:id`
- `GET /api/compare?ids=loc_001,loc_002`
- `GET /api/reports/:id`
- `POST /api/reports`
- `POST /api/admin/upload`

### Future production API
- `POST /api/imports/validate`
- `POST /api/imports/commit`
- `GET /api/trade-area/:locationId`
- `GET /api/visitor-origins/:locationId`
- `GET /api/competitors/nearby?lat=&lng=&radius=`

## 6. Frontend Page Structure

- `/` Landing page
- `/sign-in`
- `/sign-up`
- `/dashboard`
- `/map`
- `/locations/[id]`
- `/compare`
- `/reports`
- `/admin/upload`
- `/settings`

## 7. Component Architecture

- `AppShell`
- `PageHeader`
- `Card`
- `Button`
- `KpiCard`
- `LocationMap`
- `LocationTable`
- `TrafficTrendChart`
- `PeakHoursChart`
- `InsightCard`
- `ReportActions`
- `UploadDropzone`

## 8. Synthetic Foot Traffic Model

Each location includes:
- daily/weekly/monthly visit estimates
- median visit duration
- peak visit hour
- visitor-origin ZIP records
- competitor location IDs
- MoM/YoY change
- trade-area radius
- monthly trend values
- peak-hour histogram

Synthetic generation can use:
- baseline demand by category
- random seasonal multiplier
- daypart curves
- competitor density penalty
- trade-area radius proxy
- growth trend factor

## 9. Safe / Legal Data Strategy

Allowed:
- Synthetic data
- User-uploaded first-party store data
- Public POI datasets such as OpenStreetMap
- Public census/demographic data where licensed
- Open government traffic or land-use datasets
- Licensed mobility/footfall datasets with clear rights

Avoid:
- Scraping restricted data
- Claiming synthetic estimates are real measured visits
- Using personally identifiable visitor data
- Copying competitor UI, proprietary methodology, or branding
- Using mobile location data without licensing, consent, and compliance

Product should label estimates clearly:
“Estimated / synthetic / demo data” depending on source.

## 10. Development Roadmap

### Sprint 1: Clickable MVP
- Landing page
- App shell
- Dashboard
- Synthetic data
- Map search
- Location detail
- Report download

### Sprint 2: Data foundation
- PostgreSQL + PostGIS
- Seed script
- CSV import validation
- Location search API
- Competitor radius query

### Sprint 3: Analysis layer
- Trade-area calculations
- Visitor-origin choropleth
- Comparison scoring
- Basic insight engine

### Sprint 4: Auth and workspace
- Real auth
- Organizations
- User roles
- Saved locations
- Saved reports

### Sprint 5: Production hardening
- Error monitoring
- Audit logs
- Data source labels
- Rate limits
- Export PDF
- Team collaboration
```
