# Transit

A fast, mobile-first web app (PWA) for **informal public transit**: auto-rickshaws,
shared taxis and minibuses that run without timetables, stop where they like and
charge by distance. Commuters plan A-to-B trips across these modes, see how busy
each stand is, and watch vehicles live. Stand marshals and drivers report
conditions from a one-tap web portal.

Pilot city: Delhi. The full plan, roles and sprint roadmap are in [GAME_PLAN.md](GAME_PLAN.md).

## Repository layout

```
apps/
  web/              Commuter PWA: Vite + React + TS              (C1, C2)
  server/           Fastify API: OTP proxy, stands, telemetry    (C3)
  driver-portal/    One-tap stand/driver reporting web app       (C5)
packages/
  shared-types/     API contracts shared by all apps             (C1-C3)
data/               GTFS feed, corridor tracks, Python pipelines (C4)
deploy/             Dockerfiles, docker-compose, nginx, OTP dir  (C5)
docs/               API spec, contributor setup
legacy/             Original Trufi Core Flutter code, reference only
```

## Quick start

```sh
corepack enable
pnpm install
pnpm dev
```

| App            | URL                    |
| -------------- | ---------------------- |
| Commuter web   | http://localhost:5173  |
| Driver portal  | http://localhost:5174  |
| API            | http://localhost:3000  |

The API serves mock fixtures until the OTP and GTFS work lands, so every app works
from day one. Full setup, Docker and per-contributor notes are in
[docs/CONTRIBUTOR_SETUP.md](docs/CONTRIBUTOR_SETUP.md). The API is in
[docs/API_SPEC.md](docs/API_SPEC.md).

## Scripts

`pnpm dev` · `pnpm typecheck` · `pnpm test` · `pnpm build` · `pnpm format`

## Origins and license

This repository started as a clone of [Trufi Core](https://github.com/trufi-association/trufi-core)
by the Trufi Association. That Flutter code is preserved in
[legacy/trufi-core-flutter](legacy/trufi-core-flutter) as an algorithmic reference
(GTFS handling, OTP clients, nearby-lines logic). Licensed under GPL-3.0, see [LICENSE](LICENSE).
