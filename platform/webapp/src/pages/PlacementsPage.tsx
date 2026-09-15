import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { modelsService } from '../services/domains/models';
import { placementsService } from '../services/domains/placements';

export function PlacementsPage() {
  const qc = useQueryClient();
  const models = useQuery({ queryKey: ['models'], queryFn: () => modelsService.list() });
  const placements = useQuery({
    queryKey: ['placements'],
    queryFn: () => placementsService.list(),
  });
  const [modelId, setModelId] = useState('');
  const [siteId, setSiteId] = useState('site_demo');
  const [sim, setSim] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  const simulate = useMutation({
    mutationFn: () => placementsService.simulate({ modelVersionId: modelId, siteId }),
    onSuccess: (r) => setSim(r.data),
    onError: (e: Error) => setErr(e.message),
  });

  const place = useMutation({
    mutationFn: () => placementsService.request({ modelVersionId: modelId, siteId }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['placements'] });
      setErr(null);
    },
    onError: (e: Error) => setErr(e.message),
  });

  const rollback = useMutation({
    mutationFn: (id: string) => placementsService.rollback(id, 'operator rollback'),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['placements'] }),
  });

  const items = models.data?.data?.items ?? [];
  const places = placements.data?.data?.items ?? [];

  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Placement desk</p>
        <h1>Assign or refuse from measured RTT</h1>
        <p className="lead">
          No aspirational topology. Infeasible asks fail closed with a coral refuse state.
        </p>
      </header>

      <section className="panel" style={{ marginBottom: '1rem' }}>
        <h2>Request placement</h2>
        <div className="row">
          <label>
            Model
            <select value={modelId} onChange={(e) => setModelId(e.target.value)}>
              <option value="">Select…</option>
              {items.map((m: any) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Site
            <input value={siteId} onChange={(e) => setSiteId(e.target.value)} />
          </label>
          <button
            className="btnSecondary"
            type="button"
            disabled={!modelId}
            onClick={() => simulate.mutate()}
          >
            Simulate
          </button>
          <button className="btn" type="button" disabled={!modelId} onClick={() => place.mutate()}>
            Place
          </button>
        </div>
        {sim && (
          <p className={sim.feasible ? 'ok' : 'bad'} style={{ marginTop: '0.75rem' }}>
            Feasible: {String(sim.feasible)} — {sim.reason ?? 'ok'} (candidates:{' '}
            {(sim.candidateNodeIds ?? []).join(', ') || 'none'})
          </p>
        )}
        {err && <p className="error">{err}</p>}
      </section>

      <section className="panel">
        <h2>Decisions</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Node</th>
              <th>Reason</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {places.map((p: any) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td className={p.status === 'accepted' ? 'ok' : 'bad'}>{p.status}</td>
                <td>{p.edgeNodeId ?? '—'}</td>
                <td>{p.refusalReason ?? '—'}</td>
                <td>
                  {p.status === 'accepted' && (
                    <button
                      className="btnDanger"
                      type="button"
                      onClick={() => rollback.mutate(p.id)}
                    >
                      Rollback
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
