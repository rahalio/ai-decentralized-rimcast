import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { governanceService } from '../services/domains/governance';
import { placementsService } from '../services/domains/placements';

export function SafeModePage() {
  const qc = useQueryClient();
  const events = useQuery({
    queryKey: ['safe-mode'],
    queryFn: () => governanceService.listSafeMode(),
  });
  const placements = useQuery({
    queryKey: ['placements'],
    queryFn: () => placementsService.list(),
  });
  const [siteId, setSiteId] = useState('site_demo');
  const [playbook, setPlaybook] = useState('Hold inference; retain last known-good pin; alert safety.');

  const enter = useMutation({
    mutationFn: () => governanceService.enterSafeMode({ siteId, playbook }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['safe-mode'] }),
  });

  const clear = useMutation({
    mutationFn: (id: string) => governanceService.clearSafeMode(id, 'reviewed'),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['safe-mode'] }),
  });

  const rollback = useMutation({
    mutationFn: (id: string) => placementsService.rollback(id, 'breach remediation'),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['placements'] }),
  });

  const active = (events.data?.data?.items ?? []).filter((e: any) => e.status === 'active');

  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Rollback & safe mode</p>
        <h1>Fail closed — never silent slow cloud</h1>
        <p className="lead">Documented degrade with acknowledgment log. Safe mode banners every site screen.</p>
      </header>

      {!!active.length && (
        <div className="panel" style={{ borderColor: 'var(--color-coral)', marginBottom: '1rem' }}>
          <h2 className="bad">Safe mode active</h2>
          <p>{active[0].playbook}</p>
        </div>
      )}

      <section className="panel" style={{ marginBottom: '1rem' }}>
        <h2>Enter safe mode</h2>
        <div className="row">
          <label>
            Site
            <input value={siteId} onChange={(e) => setSiteId(e.target.value)} />
          </label>
          <label style={{ flex: 1, minWidth: 240 }}>
            Playbook
            <input value={playbook} onChange={(e) => setPlaybook(e.target.value)} />
          </label>
          <button className="btnDanger" type="button" onClick={() => enter.mutate()}>
            Enter safe mode
          </button>
        </div>
      </section>

      <section className="panel" style={{ marginBottom: '1rem' }}>
        <h2>Active placements</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {(placements.data?.data?.items ?? [])
              .filter((p: any) => p.status === 'accepted')
              .map((p: any) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td className="ok">{p.status}</td>
                  <td>
                    <button className="btnSecondary" type="button" onClick={() => rollback.mutate(p.id)}>
                      Rollback
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>

      <section className="panel">
        <h2>Safe-mode events</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Site</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {(events.data?.data?.items ?? []).map((e: any) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.siteId}</td>
                <td className={e.status === 'active' ? 'bad' : 'ok'}>{e.status}</td>
                <td>
                  {e.status === 'active' && (
                    <button className="btn" type="button" onClick={() => clear.mutate(e.id)}>
                      Clear
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
