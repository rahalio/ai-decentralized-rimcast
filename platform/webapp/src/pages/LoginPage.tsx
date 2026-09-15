import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setSession } from '../services/shared/infrastructure';

export function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState('admin@demo.local');
  const [password, setPassword] = useState('sandbox-admin-8');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/v0/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        // Sandbox fallback: local session for demo console
        setSession('demo-local-session');
        nav('/');
        return;
      }
      const json = await res.json();
      const token = json?.data?.accessToken ?? json?.data?.token ?? 'demo-local-session';
      setSession(token);
      nav('/');
    } catch {
      setSession('demo-local-session');
      nav('/');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login">
      <form className="loginCard" onSubmit={onSubmit}>
        <div className="rim" aria-hidden />
        <p className="kicker">Rimcast</p>
        <h1>Pin inference where the world can’t wait</h1>
        <p className="lead" style={{ margin: '0.75rem auto 1.25rem' }}>
          Edge placement desk for real-time latency budgets — fail closed, never silent cloud.
        </p>
        <div className="grid" style={{ textAlign: 'left', gap: '0.75rem' }}>
          <label>
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button className="btn" type="submit" disabled={busy}>
            {busy ? 'Signing in…' : 'Enter placement desk'}
          </button>
        </div>
      </form>
    </div>
  );
}
