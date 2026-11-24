import type { Itinerary, Leg } from '@transit/shared-types';

const minutes = (s: number) => Math.round(s / 60);

function legLabel(leg: Leg): string {
  if (leg.mode === 'WALK') return `Walk ${leg.distanceMeters} m`;
  const freq = leg.frequencyMinutes
    ? ` · every ${leg.frequencyMinutes.min}-${leg.frequencyMinutes.max} min`
    : '';
  return `${leg.routeShortName ?? leg.mode}${freq}`;
}

export function ItineraryCard({ itinerary }: { itinerary: Itinerary }) {
  const { durationSeconds, estimatedFare, congestionLevel, legs } = itinerary;
  return (
    <article style={{ border: '1px solid #ddd', borderRadius: 12, padding: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <strong>{minutes(durationSeconds)} min</strong>
        <span>
          {estimatedFare.currency} {estimatedFare.amount} · wait: {congestionLevel}
        </span>
      </header>
      <ol>
        {legs.map((leg, i) => (
          <li key={i} style={{ color: leg.routeColor }}>
            {legLabel(leg)} ({minutes(leg.durationSeconds)} min)
          </li>
        ))}
      </ol>
    </article>
  );
}
