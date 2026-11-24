# legacy/

Archived code from the repository this project was cloned from. **Nothing here is
built, tested or deployed by the new monorepo**, and its CI workflows in
`trufi-core-flutter/.github/workflows/` are inactive (GitHub only runs workflows
from the root `.github/`).

## trufi-core-flutter/

The original [Trufi Core](https://github.com/trufi-association/trufi-core) Flutter
monorepo (GPL-3.0), moved here with its relative layout and git history intact, so
its Dart pub workspace still works if you `cd` into it and run `flutter pub get`.

Useful references when building the new stack:

| Need                         | Look in                                               |
| ---------------------------- | ----------------------------------------------------- |
| GTFS parsing, nearby lines   | `packages/trufi_core_planner`                         |
| OTP 1.5 / 2.x clients        | `packages/trufi_core_routing`                         |
| Itinerary UI ideas           | `packages/trufi_core_routing_ui`                      |
| Map layers, MapLibre setup   | `packages/trufi_core_maps`                            |
| Geocoding (Photon/Nominatim) | `packages/trufi_core_search_locations`                |
| Running OTP locally          | `tools/local-otp/`                                    |
| Original README and docs     | `README.md`, `docs/`                                  |

Do not add new features here. Port the idea into `apps/` or `packages/` instead.
