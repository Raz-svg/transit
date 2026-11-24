# @transit/server

Owner: **Contributor 3**. Fastify + TypeScript API. See [docs/API_SPEC.md](../../docs/API_SPEC.md).

```
src/
  app.ts         buildApp(): registers plugins and routes (used by tests)
  index.ts       process entry: listens on $PORT (default 3000)
  routes/        /health, /api/v1/plan, /api/v1/stands, /api/v1/telemetry
  services/      OTP proxy, spatial search, ETA, fare engine (mock-data.ts for now)
  websocket/     real-time vehicle and stand broadcasts (Sprint 3)
```

`/api/v1/plan` and `/api/v1/stands` return fixtures from `services/mock-data.ts`
so the frontends can build against the contract before OTP is wired in.

| Env var       | Default   | Purpose                              |
| ------------- | --------- | ------------------------------------ |
| `PORT`        | `3000`    | HTTP port                            |
| `HOST`        | `0.0.0.0` | Bind address                         |
| `CORS_ORIGIN` | any       | Allowed origin for browser requests  |
| `OTP_URL`     | (unset)   | OpenTripPlanner base URL (Sprint 2)  |
| `REDIS_URL`   | (unset)   | Redis for telemetry state (Sprint 3) |
