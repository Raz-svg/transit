import cors from '@fastify/cors';
import Fastify, { type FastifyServerOptions } from 'fastify';
import { healthRoutes } from './routes/health.js';
import { planRoutes } from './routes/plan.js';
import { standRoutes } from './routes/stands.js';
import { telemetryRoutes } from './routes/telemetry.js';

/** Builds the Fastify instance without listening, so tests can use `app.inject()`. */
export async function buildApp(opts: FastifyServerOptions = {}) {
  const app = Fastify(opts);

  await app.register(cors, { origin: process.env.CORS_ORIGIN ?? true });

  await app.register(healthRoutes);
  await app.register(planRoutes, { prefix: '/api/v1' });
  await app.register(standRoutes, { prefix: '/api/v1' });
  await app.register(telemetryRoutes, { prefix: '/api/v1' });

  return app;
}
