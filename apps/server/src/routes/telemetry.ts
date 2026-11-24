import { REPORT_KINDS, type StandReport } from '@transit/shared-types';
import type { FastifyPluginAsync } from 'fastify';

export const telemetryRoutes: FastifyPluginAsync = async (app) => {
  app.post<{ Body: StandReport }>(
    '/telemetry/reports',
    {
      schema: {
        body: {
          type: 'object',
          required: ['standId', 'kind', 'reportedAt'],
          properties: {
            standId: { type: 'string', minLength: 1 },
            kind: { type: 'string', enum: [...REPORT_KINDS] },
            passengerCount: { type: 'integer', minimum: 0 },
            reportedAt: { type: 'string' },
          },
        },
      },
    },
    async (req, reply) => {
      // TODO(c3): persist to Redis and broadcast a `stand.status` message over WebSocket.
      req.log.info({ report: req.body }, 'stand report received');
      return reply.code(202).send({ accepted: true });
    },
  );
};
