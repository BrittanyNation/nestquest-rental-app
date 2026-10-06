# NestQuest - Rental Listing App

A full-stack rental listing app: browse rentals with live search and filters, view detail pages with map locations, and publish new listings. Built as a portfolio project.

## Tech stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Prisma 6 + SQLite (dev database committed, so clone and run works)
- React Leaflet + OpenStreetMap tiles for maps (no API key needed)

## How to run

```bash
npm install
npx prisma db push
npx prisma db seed
npm run dev
```

Open http://localhost:3000. The seed creates 12 listings across Clarksville TN, Nashville TN, Charlotte NC, and Tampa FL.

To switch to Postgres later: change `provider` to `"postgresql"` in `prisma/schema.prisma`, set `DATABASE_URL` to your Postgres connection string, then run `npx prisma db push` and `npx prisma db seed` again. No code changes needed.

## API

| Method | Endpoint            | Description                                             |
| ------ | ------------------- | ------------------------------------------------------- |
| GET    | /api/listings       | List rentals. Filters: q, minPrice, maxPrice, beds, baths, type, city, sort (price-asc, price-desc, newest) |
| GET    | /api/listings/[id]  | Single listing. 404 if not found.                       |
| POST   | /api/listings       | Create a listing. Validates input, returns 400 on bad data, 201 on success. |

## Pages

- `/` browse with debounced search, filter panel, sort, responsive card grid, loading skeletons, empty state
- `/listings/[id]` detail with specs, amenity chips, description, Leaflet map (client only, no SSR)
- `/listings/new` validated form that posts to the API and redirects to the new listing

## Skills demonstrated

Mapped to what junior full-stack postings ask for:

- **React**: hooks (useState, useEffect), client vs server components, dynamic imports with `ssr: false`, reusable components
- **TypeScript**: strict mode, typed API handlers, Prisma generated types end to end
- **REST APIs**: Next.js Route Handlers with query parsing, validation, proper status codes (200/201/400/404)
- **Prisma / SQL**: schema modeling, migrations via `db push`, seed scripts, filtered and sorted queries
- **Tailwind CSS**: responsive grid layouts, loading skeletons, mobile first design
- **Maps**: React Leaflet with OpenStreetMap, custom markers, SSR safe loading
