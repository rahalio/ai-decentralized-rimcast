import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { governanceService } from '../services/domains/governance';

export function FreezePage() {
  const qc = useQueryClient();
  const freezes = useQuery({
    queryKey: ['freezes'],
    queryFn: () => governanceService.listFreezes(),
  });
  const [siteId, setSiteId] = useState('site_demo');
  const [reason, setReason] = useState('Safety hold during incident review');

  const freeze = useMutation({
    mutationFn: () => governanceService.freeze({ siteId, reason }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['freezes'] }),
  });

  const unfreeze = useMutation({
    mutationFn: (id: string) => governanceService.unfreeze(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['freezes'] }),
  });

  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Site freeze</p>
        <h1>Halt new placements — keep history</h1>
        <p className="lead">Frozen sites reject new places without deleting audit trails.</p>
      </header>

      <section className="panel" style={{ marginBottom: '1rem' }}>
        <h2>Freeze site</h2>
        <div className="row">
          <label>
            Site
            <input value={siteId} onChange={(e) => setSiteId(e.target.value)} />
          </label>
          <label style={{ flex: 1, minWidth: 220 }}>
            Reason
            <input value={reason} onChange={(e) => setReason(e.target.value)} />
          </label>
          <button className="btnDanger" type="button" onClick={() => freeze.mutate()}>
            Freeze
          </button>
        </div>
      </section>

      <section className="panel">
        <h2>Freezes</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Site</th>
              <th>Active</th>
              <th>Reason</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {(freezes.data?.data?.items ?? []).map((f: any) => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>{f.siteId}</td>
                <td className={f.active ? 'bad' : 'ok'}>{String(f.active)}</td>
                <td>{f.reason}</td>
                <td>
                  {f.active && (
                    <button className="btn" type="button" onClick={() => unfreeze.mutate(f.id)}>
                      Unfreeze
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
