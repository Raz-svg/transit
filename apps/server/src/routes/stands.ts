import type { StandStatus } from '@transit/shared-types';
import type { FastifyPluginAsync } from 'fastify';
import { mockStands } from '../services/mock-data.js';

export const standRoutes: FastifyPluginAsync = async (app) => {
  app.get<{ Reply: StandStatus[] }>('/stands', async () => mockStands);

  app.get<{ Params: { standId: string } }>('/stands/:standId', async (req, reply) => {
    const stand = mockStands.find((s) => s.standId === req.params.standId);
    if (!stand) return reply.code(404).send({ error: 'stand_not_found' });
    return stand;
  });
};
