import type { PlanResponse } from '@transit/shared-types';
import type { FastifyPluginAsync } from 'fastify';
import { mockPlan } from '../services/mock-data.js';

interface PlanQuery {
  fromLat: number;
  fromLng: number;
  toLat: number;
  toLng: number;
  mode?: string;
  departAt?: string;
}

const coordinate = (min: number, max: number) => ({ type: 'number', minimum: min, maximum: max });

export const planRoutes: FastifyPluginAsync = async (app) => {
  app.get<{ Querystring: PlanQuery; Reply: PlanResponse }>(
    '/plan',
    {
      schema: {
        querystring: {
          type: 'object',
          required: ['fromLat', 'fromLng', 'toLat', 'toLng'],
          properties: {
            fromLat: coordinate(-90, 90),
            fromLng: coordinate(-180, 180),
            toLat: coordinate(-90, 90),
            toLng: coordinate(-180, 180),
            mode: { type: 'string' },
            departAt: { type: 'string' },
          },
        },
      },
    },
    // TODO(c3): replace the mock with the OTP proxy in services/.
    async () => mockPlan,
  );
};
