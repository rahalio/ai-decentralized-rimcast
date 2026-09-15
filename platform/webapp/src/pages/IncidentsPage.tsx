import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { incidentsService } from '../services/domains/incidents';

export function IncidentsPage() {
  const qc = useQueryClient();
  const packs = useQuery({ queryKey: ['incidents'], queryFn: () => incidentsService.list() });
  const [siteId, setSiteId] = useState('site_demo');
  const [hours, setHours] = useState(1);

  const create = useMutation({
    mutationFn: () => {
      const windowEnd = new Date();
      const windowStart = new Date(windowEnd.getTime() - hours * 3600_000);
      return incidentsService.create({
        siteId,
        windowStart: windowStart.toISOString(),
        windowEnd: windowEnd.toISOString(),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['incidents'] }),
  });

  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Incident packs</p>
        <h1>Version × node × time window</h1>
        <p className="lead">After-action evidence for physical-world events — exportable for safety review.</p>
      </header>

      <section className="panel" style={{ marginBottom: '1rem' }}>
        <h2>Generate pack</h2>
        <div className="row">
          <label>
            Site
            <input value={siteId} onChange={(e) => setSiteId(e.target.value)} />
          </label>
          <label>
            Lookback hours
            <input type="number" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
          </label>
          <button className="btn" type="button" onClick={() => create.mutate()}>
            Generate
          </button>
        </div>
      </section>

      <section className="panel">
        <h2>Packs</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Site</th>
              <th>Window</th>
              <th>Placements</th>
            </tr>
          </thead>
          <tbody>
            {(packs.data?.data?.items ?? []).map((p: any) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.siteId}</td>
                <td>
                  {p.windowStart} → {p.windowEnd}
                </td>
                <td>{(p.placementIds ?? []).length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
