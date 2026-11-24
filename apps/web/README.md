# @transit/web

Owners: **Contributor 1** (UI, PWA) and **Contributor 2** (`src/map/`).
Vite + React + TypeScript, mobile-first PWA.

```
src/
  api.ts         typed fetch client for /api/v1
  components/    ItineraryCard, SearchBar, StopCard, FareTable, ...
  hooks/         usePlan, useGeolocation, useLiveVehicles, ...
  map/           MapLibre layers and markers (Contributor 2)
  pages/         PlannerPage (/), Lines (/lines)
public/          manifest.webmanifest, icons, service worker
```

`pnpm dev:web` serves on http://localhost:5173 and proxies `/api` to
`http://localhost:3000` (override with `API_URL`). Run `pnpm dev` at the repo root
to start the server too.
