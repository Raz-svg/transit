import type { PlanRequest, PlanResponse } from '@transit/shared-types';
import { useEffect, useState } from 'react';
import { fetchPlan } from '../api';

type State =
  { status: 'loading' } | { status: 'error'; error: Error } | { status: 'ok'; data: PlanResponse };

export function usePlan(req: PlanRequest): State {
  const [state, setState] = useState<State>({ status: 'loading' });
  const key = JSON.stringify(req);

  useEffect(() => {
    const ctrl = new AbortController();
    setState({ status: 'loading' });
    fetchPlan(JSON.parse(key) as PlanRequest, ctrl.signal)
      .then((data) => setState({ status: 'ok', data }))
      .catch((error: unknown) => {
        if (!ctrl.signal.aborted) setState({ status: 'error', error: error as Error });
      });
    return () => ctrl.abort();
  }, [key]);

  return state;
}
