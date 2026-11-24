# data/gtfs

The pilot GTFS feed, as plain `.txt` files (one directory per feed if there is more
than one city). Required files: `agency.txt`, `routes.txt`, `stops.txt`, `trips.txt`,
`stop_times.txt`, `calendar.txt`. Informal-transit additions: `frequencies.txt`,
`shapes.txt`, `fare_attributes.txt` / `fare_rules.txt`.

Use GTFS `route_type` 1500-series extended types where they fit (e.g. 1507 for
shared taxi) and agree the mapping to `LegMode` in `packages/shared-types` with the
server team.
