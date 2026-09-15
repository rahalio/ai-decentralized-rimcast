import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { capacityService } from '../services/domains/capacity';

export function CapacityPage() {
  const qc = useQueryClient();
  const nodes = useQuery({ queryKey: ['nodes'], queryFn: () => capacityService.listNodes() });
  const offers = useQuery({ queryKey: ['offers'], queryFn: () => capacityService.listOffers() });
  const [siteId, setSiteId] = useState('site_demo');
  const [deviceClass, setDeviceClass] = useState('near-device-gpu');
  const [units, setUnits] = useState(8);
  const [rtt, setRtt] = useState(12);
  const [price, setPrice] = useState(0.002);
  const [nodeId, setNodeId] = useState('');
  const [err, setErr] = useState<string | null>(null);

  const publishNode = useMutation({
    mutationFn: () =>
      capacityService.publishNode({
        siteId,
        deviceClass,
        availableComputeUnits: units,
        measuredRttMs: rtt,
        pricePerCompliantInference: price,
      }),
    onSuccess: (r) => {
      qc.invalidateQueries({ queryKey: ['nodes'] });
      setNodeId(r.data?.id ?? '');
    },
    onError: (e: Error) => setErr(e.message),
  });

  const publishOffer = useMutation({
    mutationFn: () =>
      capacityService.publishOffer({
        edgeNodeId: nodeId,
        slotsAvailable: 4,
        pricingModel: 'per_compliant_inference',
        unitPrice: price,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['offers'] }),
    onError: (e: Error) => setErr(e.message),
  });

  const withdraw = useMutation({
    mutationFn: (id: string) => capacityService.withdrawOffer(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['offers'] }),
  });

  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Capacity providers</p>
        <h1>Publish real compute and price</h1>
        <p className="lead">Unhealthy nodes auto-withdraw from the placement pool. Disclose price per compliant inference.</p>
      </header>

      <section className="panel" style={{ marginBottom: '1rem' }}>
        <h2>Publish node</h2>
        <div className="row">
          <label>
            Site
            <input value={siteId} onChange={(e) => setSiteId(e.target.value)} />
          </label>
          <label>
            Device class
            <input value={deviceClass} onChange={(e) => setDeviceClass(e.target.value)} />
          </label>
          <label>
            Compute units
            <input type="number" value={units} onChange={(e) => setUnits(Number(e.target.value))} />
          </label>
          <label>
            Measured RTT
            <input type="number" value={rtt} onChange={(e) => setRtt(Number(e.target.value))} />
          </label>
          <label>
            Price / inference
            <input type="number" step="0.001" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          </label>
          <button className="btn" type="button" onClick={() => publishNode.mutate()}>
            Publish node
          </button>
        </div>
      </section>

      <section className="panel" style={{ marginBottom: '1rem' }}>
        <h2>Publish offer</h2>
        <div className="row">
          <label>
            Edge node
            <select value={nodeId} onChange={(e) => setNodeId(e.target.value)}>
              <option value="">Select…</option>
              {(nodes.data?.data?.items ?? []).map((n: any) => (
                <option key={n.id} value={n.id}>
                  {n.deviceClass} @ {n.siteId} ({n.id})
                </option>
              ))}
            </select>
          </label>
          <button className="btn" type="button" disabled={!nodeId} onClick={() => publishOffer.mutate()}>
            Publish offer
          </button>
        </div>
        {err && <p className="error">{err}</p>}
      </section>

      <section className="panel">
        <h2>Offers</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Node</th>
              <th>Slots</th>
              <th>Price</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {(offers.data?.data?.items ?? []).map((o: any) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.edgeNodeId}</td>
                <td>{o.slotsAvailable}</td>
                <td>{o.unitPrice}</td>
                <td className={o.status === 'published' ? 'ok' : 'warn'}>{o.status}</td>
                <td>
                  {o.status === 'published' && (
                    <button className="btnSecondary" type="button" onClick={() => withdraw.mutate(o.id)}>
                      Withdraw
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
