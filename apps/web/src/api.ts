import type { PlanRequest, PlanResponse } from '@transit/shared-types';

/** Thin typed client for the transit API. In dev, Vite proxies /api to the server. */
export async function fetchPlan(req: PlanRequest, signal?: AbortSignal): Promise<PlanResponse> {
  const params = new URLSearchParams(
    Object.entries(req)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)]),
  );
  const res = await fetch(`/api/v1/plan?${params}`, { signal });
  if (!res.ok) throw new Error(`plan request failed: ${res.status}`);
  return res.json() as Promise<PlanResponse>;
}
