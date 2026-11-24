import { ItineraryCard } from '../components/ItineraryCard';
import { usePlan } from '../hooks/usePlan';

// Placeholder A-to-B query until the search inputs (Contributor 1) land.
const DEMO_QUERY = { fromLat: 28.6675, fromLng: 77.2282, toLat: 28.6555, toLng: 77.23 };

export function PlannerPage() {
  const plan = usePlan(DEMO_QUERY);

  return (
    <main
      style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 480, margin: '0 auto', padding: 16 }}
    >
      <h1>Transit</h1>
      {plan.status === 'loading' && <p>Finding routes…</p>}
      {plan.status === 'error' && <p role="alert">Could not reach the API: {plan.error.message}</p>}
      {plan.status === 'ok' &&
        plan.data.itineraries.map((it) => <ItineraryCard key={it.id} itinerary={it} />)}
    </main>
  );
}
