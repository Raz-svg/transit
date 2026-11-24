# Contributor setup

## Prerequisites

| Tool    | Version  | Needed by                           |
| ------- | -------- | ----------------------------------- |
| Node.js | 22+ (see `.nvmrc`) | everyone                  |
| pnpm    | 12 (`corepack enable` picks the pinned version) | everyone |
| Docker  | recent   | full stack, OpenTripPlanner         |
| Python  | 3.11+    | Contributor 4 (`data/pipelines`)    |

## First run

```sh
git clone <repo> transit && cd transit
corepack enable
pnpm install          # also builds packages/shared-types
pnpm dev              # server :3000, web :5173, driver portal :5174
```

Open http://localhost:5173: you should see one mock itinerary from Kashmere Gate
to Chandni Chowk. That proves web → Vite proxy → server → shared types all work.

## Everyday commands (repo root)

| Command              | Does                                          |
| -------------------- | --------------------------------------------- |
| `pnpm dev`           | All apps in watch mode                        |
| `pnpm dev:web`       | Only the commuter app                         |
| `pnpm dev:server`    | Only the API                                  |
| `pnpm dev:driver`    | Only the driver portal                        |
| `pnpm typecheck`     | `tsc --noEmit` in every package               |
| `pnpm test`          | Vitest in every package that has tests        |
| `pnpm build`         | Production builds (shared-types first)        |
| `pnpm format`        | Prettier                                      |
| `pnpm --filter @transit/server add <pkg>` | Add a dependency to one package |

## Full stack in Docker

```sh
docker compose -f deploy/docker-compose.yml up --build
# web :8080, driver portal :8081, server :3000, redis :6379
docker compose -f deploy/docker-compose.yml --profile otp up --build
# adds OpenTripPlanner :8082 (put GTFS zip + OSM pbf in deploy/otp/ first)
```

## Where your work goes

| Contributor | Area                         | Directory                                  |
| ----------- | ---------------------------- | ------------------------------------------ |
| C1          | Commuter UI, PWA             | `apps/web/src/{components,hooks,pages}`    |
| C2          | Map & geospatial             | `apps/web/src/map`                         |
| C3          | API, OTP, telemetry          | `apps/server`                              |
| C4          | GTFS & data pipelines        | `data/`                                    |
| C5          | DevOps, CI, driver portal    | `deploy/`, `.github/`, `apps/driver-portal`|
| C1-C3       | API contracts                | `packages/shared-types`                    |

## Changing shared types

`packages/shared-types` is the contract between the frontends and the server.
Edit `src/*.ts`, run `pnpm typecheck` at the root (it type-checks every consumer),
and request review from each contributor whose app uses the type. `pnpm dev`
rebuilds the package on save.

## Branches and PRs

See [GAME_PLAN.md §6](../GAME_PLAN.md#6-git-branching-strategy--contribution-rules):
branch from `dev` as `feat/c1-...`, `data/c4-...`, `infra/c5-...`; PRs need green CI
(`typecheck`, `test`, `build`) and one approval.

## Legacy code

The original Flutter app is in `legacy/trufi-core-flutter/` as a reference only.
See [legacy/README.md](../legacy/README.md) for which package to read for what.
