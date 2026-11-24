import type { PlanResponse } from '@transit/shared-types';
import { afterAll, describe, expect, it } from 'vitest';
import { buildApp } from './app.js';

const app = await buildApp();
afterAll(() => app.close());

describe('server', () => {
  it('reports health', async () => {
    const res = await app.inject({ method: 'GET', url: '/health' });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ status: 'ok' });
  });

  it('returns itineraries for a valid plan query', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/v1/plan?fromLat=28.6675&fromLng=77.2282&toLat=28.6555&toLng=77.23',
    });
    expect(res.statusCode).toBe(200);
    const body = res.json<PlanResponse>();
    expect(body.itineraries.length).toBeGreaterThan(0);
  });

  it('rejects a plan query without coordinates', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/v1/plan' });
    expect(res.statusCode).toBe(400);
  });

  it('accepts a valid stand report and rejects an unknown kind', async () => {
    const ok = await app.inject({
      method: 'POST',
      url: '/api/v1/telemetry/reports',
      payload: { standId: 'kg-auto-1', kind: 'STAND_FULL', reportedAt: new Date().toISOString() },
    });
    expect(ok.statusCode).toBe(202);

    const bad = await app.inject({
      method: 'POST',
      url: '/api/v1/telemetry/reports',
      payload: { standId: 'kg-auto-1', kind: 'NOPE', reportedAt: new Date().toISOString() },
    });
    expect(bad.statusCode).toBe(400);
  });

  it('404s an unknown stand', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/v1/stands/nope' });
    expect(res.statusCode).toBe(404);
  });
});
