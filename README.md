# GeoPulse Intelligence MVP

A production-style Next.js MVP for a modern Location Intelligence and Site Selection SaaS platform.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui-style local components
- Recharts
- Mapbox-ready mock map
- PostgreSQL/PostGIS-ready schema notes

## Run locally

```bash
npm install
npm run dev
```

Open:

```bash
http://localhost:3000/dashboard
```

## Pages

- `/dashboard`
- `/explore`
- `/sites`
- `/markets`
- `/competitors`
- `/reports`
- `/settings`

## Notes

This MVP uses mock data in `lib/mock-data.ts`. Components are intentionally separated so real APIs, PostGIS queries, Mapbox GL, auth, and exports can be swapped in later.
