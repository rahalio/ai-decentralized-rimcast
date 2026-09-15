import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { modelsService } from '../services/domains/models';

export function BudgetsPage() {
  const qc = useQueryClient();
  const models = useQuery({ queryKey: ['models'], queryFn: () => modelsService.list() });
  const [name, setName] = useState('edge-yolo-v1');
  const [modelId, setModelId] = useState('');
  const [maxMs, setMaxMs] = useState(40);
  const [overflow, setOverflow] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const register = useMutation({
    mutationFn: () => modelsService.register({ name }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['models'] }),
    onError: (e: Error) => setErr(e.message),
  });

  const saveBudget = useMutation({
    mutationFn: () =>
      modelsService.setBudget(modelId, { maxLatencyMs: maxMs, allowCloudOverflow: overflow }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['models'] }),
    onError: (e: Error) => setErr(e.message),
  });

  const items = models.data?.data?.items ?? [];

  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Latency budget editor</p>
        <h1>Declare max E2E latency before place</h1>
        <p className="lead">Missing budget blocks the place CTA. Cloud overflow is explicit and non-real-time only.</p>
      </header>

      <section className="panel" style={{ marginBottom: '1rem' }}>
        <h2>Register model version</h2>
        <div className="row">
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <button className="btn" type="button" onClick={() => register.mutate()}>
            Register
          </button>
        </div>
      </section>

      <section className="panel" style={{ marginBottom: '1rem' }}>
        <h2>Set budget</h2>
        <div className="row">
          <label>
            Model version
            <select value={modelId} onChange={(e) => setModelId(e.target.value)}>
              <option value="">Select…</option>
              {items.map((m: any) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.id})
                </option>
              ))}
            </select>
          </label>
          <label>
            Max latency (ms)
            <input
              type="number"
              value={maxMs}
              onChange={(e) => setMaxMs(Number(e.target.value))}
            />
          </label>
          <label>
            Allow cloud overflow
            <select
              value={overflow ? 'yes' : 'no'}
              onChange={(e) => setOverflow(e.target.value === 'yes')}
            >
              <option value="no">No</option>
              <option value="yes">Yes (non-real-time)</option>
            </select>
          </label>
          <button
            className="btn"
            type="button"
            disabled={!modelId}
            onClick={() => saveBudget.mutate()}
          >
            Save budget
          </button>
        </div>
        {err && <p className="error">{err}</p>}
      </section>

      <section className="panel">
        <h2>Versions</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Budget ms</th>
              <th>Overflow</th>
            </tr>
          </thead>
          <tbody>
            {items.map((m: any) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.status}</td>
                <td className={m.latencyBudget ? 'ok' : 'warn'}>
                  {m.latencyBudget?.maxLatencyMs ?? 'missing'}
                </td>
                <td>{m.latencyBudget?.allowCloudOverflow ? 'allowed' : 'denied'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
