import type { ReportKind, StandReport } from '@transit/shared-types';
import { useState } from 'react';

// TODO(c5): pick the stand from a list / QR code instead of hard-coding it.
const STAND_ID = 'kg-auto-1';

const BUTTONS: { kind: ReportKind; label: string }[] = [
  { kind: 'DEPARTING_NOW', label: 'Departing now' },
  { kind: 'STAND_FULL', label: 'Stand full / 10+ waiting' },
  { kind: 'HEAVY_TRAFFIC', label: 'Heavy traffic' },
  { kind: 'STAND_EMPTY', label: 'No passengers' },
];

export function DispatchPage() {
  const [status, setStatus] = useState<string>('');

  async function send(kind: ReportKind) {
    const report: StandReport = { standId: STAND_ID, kind, reportedAt: new Date().toISOString() };
    setStatus('Sending…');
    try {
      const res = await fetch('/api/v1/telemetry/reports', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(report),
      });
      setStatus(res.ok ? 'Sent' : `Failed (${res.status})`);
    } catch {
      setStatus('Offline, not sent');
    }
  }

  return (
    <main
      style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 420, margin: '0 auto', padding: 16 }}
    >
      <h1>Stand dispatch</h1>
      <div style={{ display: 'grid', gap: 12 }}>
        {BUTTONS.map((b) => (
          <button
            key={b.kind}
            onClick={() => void send(b.kind)}
            style={{ fontSize: 20, padding: '20px 16px', borderRadius: 12 }}
          >
            {b.label}
          </button>
        ))}
      </div>
      <p aria-live="polite">{status}</p>
    </main>
  );
}
