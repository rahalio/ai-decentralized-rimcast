import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { telemetryService } from '../services/domains/telemetry';
import { placementsService } from '../services/domains/placements';

export function SlaPage() {
  const qc = useQueryClient();
  const [siteId, setSiteId] = useState('site_demo');
  const samples = useQuery({
    queryKey: ['sla', siteId],
    queryFn: () => telemetryService.list({ siteId }),
  });
  const placements = useQuery({
    queryKey: ['placements'],
    queryFn: () => placementsService.list(siteId),
  });

  const ingest = useMutation({
    mutationFn: async () => {
      const accepted = (placements.data?.data?.items ?? []).find((p: any) => p.status === 'accepted');
      if (!accepted) throw new Error('No accepted placement to sample');
      const latencyMs = 25 + Math.floor(Math.random() * 40);
      return telemetryService.ingest({
        placementId: accepted.id,
        siteId,
        modelVersionId: accepted.modelVersionId,
        deviceClass: accepted.deviceClass ?? 'edge-gpu',
        latencyMs,
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sla', siteId] }),
  });

  const items = samples.data?.data?.items ?? [];
  const within = items.filter((s: any) => s.withinBudget).length;
  const breach = items.length - within;

  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">SLA telemetry</p>
        <h1>Live compliance by site</h1>
        <p className="lead">Burn vs budget by model and device class — amber when stale, coral on breach.</p>
      </header>

      <div className="strip">
        <div className="stat">
          <strong>{items.length}</strong>
          <span>Samples</span>
        </div>
        <div className="stat">
          <strong className="ok">{within}</strong>
          <span>Within budget</span>
        </div>
        <div className="stat">
          <strong className="bad">{breach}</strong>
          <span>Breaches</span>
        </div>
      </div>

      <div className="row" style={{ marginBottom: '1rem' }}>
        <label>
          Site
          <input value={siteId} onChange={(e) => setSiteId(e.target.value)} />
        </label>
        <button className="btn" type="button" onClick={() => ingest.mutate()}>
          Ingest sample
        </button>
      </div>

      <section className="panel">
        <h2>Samples</h2>
        <table className="table">
          <thead>
            <tr>
              <th>When</th>
              <th>Placement</th>
              <th>Latency</th>
              <th>Within</th>
            </tr>
          </thead>
          <tbody>
            {items.map((s: any) => (
              <tr key={s.id}>
                <td>{s.sampledAt}</td>
                <td>{s.placementId}</td>
                <td>{s.latencyMs} ms</td>
                <td className={s.withinBudget ? 'ok' : 'bad'}>
                  {s.withinBudget ? 'yes' : 'breach'}
                </td>
              </tr>
            ))}
            {!items.length && (
              <tr>
                <td colSpan={4}>No samples — place a model then ingest.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
