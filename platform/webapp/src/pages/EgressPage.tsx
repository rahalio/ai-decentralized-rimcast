import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { governanceService } from '../services/domains/governance';

export function EgressPage() {
  const qc = useQueryClient();
  const exceptions = useQuery({
    queryKey: ['overflow'],
    queryFn: () => governanceService.listOverflow(),
  });
  const [siteId, setSiteId] = useState('site_demo');
  const [allowOverflow, setAllowOverflow] = useState(false);
  const [tags, setTags] = useState('batch-analytics,non-realtime');
  const [purposeTag, setPurposeTag] = useState('batch-analytics');
  const [rationale, setRationale] = useState('Non-real-time overflow for overnight analytics only');

  const upsert = useMutation({
    mutationFn: () =>
      governanceService.upsertEgress({
        siteId,
        allowOverflow,
        purposeTags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      }),
  });

  const request = useMutation({
    mutationFn: () =>
      governanceService.requestOverflow({ siteId, purposeTag, rationale }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['overflow'] }),
  });

  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Egress & overflow</p>
        <h1>Purpose-tag every overflow</h1>
        <p className="lead">Real-time paths must not use overflow. Untagged overflow is blocked.</p>
      </header>

      <section className="panel" style={{ marginBottom: '1rem' }}>
        <h2>Site egress policy</h2>
        <div className="row">
          <label>
            Site
            <input value={siteId} onChange={(e) => setSiteId(e.target.value)} />
          </label>
          <label>
            Allow overflow
            <select
              value={allowOverflow ? 'yes' : 'no'}
              onChange={(e) => setAllowOverflow(e.target.value === 'yes')}
            >
              <option value="no">No</option>
              <option value="yes">Yes (non-real-time)</option>
            </select>
          </label>
          <label style={{ flex: 1, minWidth: 200 }}>
            Purpose tags
            <input value={tags} onChange={(e) => setTags(e.target.value)} />
          </label>
          <button className="btn" type="button" onClick={() => upsert.mutate()}>
            Save policy
          </button>
        </div>
      </section>

      <section className="panel" style={{ marginBottom: '1rem' }}>
        <h2>Request exception</h2>
        <div className="row">
          <label>
            Purpose tag
            <input value={purposeTag} onChange={(e) => setPurposeTag(e.target.value)} />
          </label>
          <label style={{ flex: 1, minWidth: 220 }}>
            Rationale
            <input value={rationale} onChange={(e) => setRationale(e.target.value)} />
          </label>
          <button className="btnSecondary" type="button" onClick={() => request.mutate()}>
            Request
          </button>
        </div>
      </section>

      <section className="panel">
        <h2>Overflow exceptions</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Site</th>
              <th>Tag</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {(exceptions.data?.data?.items ?? []).map((x: any) => (
              <tr key={x.id}>
                <td>{x.id}</td>
                <td>{x.siteId}</td>
                <td>{x.purposeTag}</td>
                <td>{x.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
