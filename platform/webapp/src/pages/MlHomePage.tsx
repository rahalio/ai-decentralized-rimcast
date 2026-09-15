import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { modelsService } from '../services/domains/models';
import { placementsService } from '../services/domains/placements';

export function MlHomePage() {
  const models = useQuery({ queryKey: ['models'], queryFn: () => modelsService.list() });
  const placements = useQuery({
    queryKey: ['placements'],
    queryFn: () => placementsService.list(),
  });

  const items = models.data?.data?.items ?? [];
  const places = placements.data?.data?.items ?? [];
  const eligible = items.filter((m: any) => m.latencyBudget?.maxLatencyMs).length;
  const refused = places.filter((p: any) => p.status === 'refused').length;
  const accepted = places.filter((p: any) => p.status === 'accepted').length;

  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">ML engineer home</p>
        <h1>Real-time eligibility & pins</h1>
        <p className="lead">
          Which versions are budgeted, where they pin, and what was refused — measured capacity only.
        </p>
      </header>

      <div className="strip">
        <div className="stat">
          <strong>{items.length}</strong>
          <span>Model versions</span>
        </div>
        <div className="stat">
          <strong className="ok">{eligible}</strong>
          <span>With latency budget</span>
        </div>
        <div className="stat">
          <strong className="ok">{accepted}</strong>
          <span>Accepted pins</span>
        </div>
        <div className="stat">
          <strong className="bad">{refused}</strong>
          <span>Refused</span>
        </div>
      </div>

      <div className="row" style={{ marginBottom: '1rem' }}>
        <Link className="btn" to="/budgets">
          Set budget
        </Link>
        <Link className="btnSecondary" to="/placements">
          Request placement
        </Link>
        <Link className="btnSecondary" to="/safe-mode">
          Rollback / safe mode
        </Link>
      </div>

      <section className="panel">
        <h2>Recent placements</h2>
        {placements.isError && <p className="error">{(placements.error as Error).message}</p>}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Model</th>
              <th>Site</th>
              <th>Status</th>
              <th>RTT</th>
            </tr>
          </thead>
          <tbody>
            {places.slice(0, 8).map((p: any) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.modelVersionId}</td>
                <td>{p.siteId}</td>
                <td
                  className={
                    p.status === 'accepted' ? 'ok' : p.status === 'refused' ? 'bad' : 'warn'
                  }
                >
                  {p.status}
                </td>
                <td>{p.measuredRttMs ?? '—'}</td>
              </tr>
            ))}
            {!places.length && (
              <tr>
                <td colSpan={5}>No placements yet — register a model and set a budget.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
