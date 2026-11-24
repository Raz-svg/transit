# Transit API v1

Base path `/api/v1`. JSON over HTTP; real-time updates over WebSocket (Sprint 3).
**The source of truth for every payload is [`packages/shared-types`](../packages/shared-types/src).**
This page summarises it; if the two disagree, the types win and this page gets fixed.

Changing a type in `shared-types` needs a review from each contributor who consumes it.

Status: ✅ implemented, 🧪 returns mock fixtures, ⏳ planned.

| Method | Path                         | Status | Returns                |
| ------ | ---------------------------- | ------ | ---------------------- |
| GET    | `/health`                    | ✅     | `{ status: "ok" }`     |
| GET    | `/api/v1/plan`               | 🧪     | `PlanResponse`         |
| GET    | `/api/v1/stands`             | 🧪     | `StandStatus[]`        |
| GET    | `/api/v1/stands/:standId`    | 🧪     | `StandStatus` or 404   |
| POST   | `/api/v1/telemetry/reports`  | 🧪     | 202 `{ accepted }`     |
| GET    | `/api/v1/routes`             | ⏳     | `TransitRoute[]`       |
| GET    | `/api/v1/stops/nearby`       | ⏳     | `NearbyStopsResponse`  |
| WS     | `/api/v1/live`               | ⏳     | `ServerMessage` stream |

## GET /api/v1/plan

| Query     | Required | Notes                                   |
| --------- | -------- | --------------------------------------- |
| `fromLat` | yes      | -90..90                                 |
| `fromLng` | yes      | -180..180                               |
| `toLat`   | yes      |                                         |
| `toLng`   | yes      |                                         |
| `mode`    | no       | comma-separated, e.g. `TRANSIT,WALK`    |
| `departAt`| no       | ISO 8601; defaults to now               |

```
GET /api/v1/plan?fromLat=28.6675&fromLng=77.2282&toLat=28.6555&toLng=77.23
```

Response `PlanResponse` → `itineraries: Itinerary[]`, each with `legs: Leg[]`.

- `Leg.mode`: `WALK | AUTO_RICKSHAW | SHARED_TAXI | MINIBUS | BUS`
- `Leg.frequencyMinutes`: `{ min, max }` headway for timetable-less routes
- `Leg.geometryPolyline`: Google encoded polyline, precision 5
- `Itinerary.congestionLevel`: `low | moderate | high` (wait index)
- `Itinerary.estimatedFare`: `{ currency: "INR", amount }`

Missing or out-of-range coordinates return **400**.

## Stands

`StandStatus`: `standId`, `name`, `coordinates` (`[lng, lat]`, GeoJSON order),
`availableVehiclesEstimate`, `passengerQueueLevel` (`empty | normal | crowded | severe`),
`averageWaitMinutes`, `lastUpdated` (ISO 8601).

## POST /api/v1/telemetry/reports

Sent by the driver portal.

```json
{ "standId": "kg-auto-1", "kind": "STAND_FULL", "passengerCount": 12, "reportedAt": "2026-12-01T09:00:00+05:30" }
```

`kind`: `DEPARTING_NOW | STAND_FULL | HEAVY_TRAFFIC | STAND_EMPTY`. Unknown kinds return **400**.

## WebSocket /api/v1/live (planned)

Client → server `ClientMessage`: `subscribe.bbox`, `subscribe.stands`, `unsubscribe`.
Server → client `ServerMessage`: `vehicle.position` (`VehiclePosition`), `stand.status` (`StandStatus`).

## Conventions

- Coordinates: objects use `{ lat, lng }`; tuples use `[lng, lat]` (GeoJSON).
- Times: ISO 8601 strings with offset. Durations: seconds. Distances: metres. Headways: minutes.
- Errors: non-2xx with a JSON body `{ error: "<code>" }` (Fastify validation errors use its default shape).
