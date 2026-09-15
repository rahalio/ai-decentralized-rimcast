import { NavLink, Outlet } from 'react-router-dom';
import styles from './AppShell.module.css';

const nav = [
  { to: '/', label: 'ML home', end: true },
  { to: '/budgets', label: 'Latency budgets' },
  { to: '/placements', label: 'Placement desk' },
  { to: '/sla', label: 'SLA telemetry' },
  { to: '/capacity', label: 'Capacity offers' },
  { to: '/safe-mode', label: 'Rollback / safe mode' },
  { to: '/freeze', label: 'Site freeze' },
  { to: '/incidents', label: 'Incident packs' },
  { to: '/egress', label: 'Egress policy' },
];

export function AppShell() {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.rim} aria-hidden />
          <div>
            <div className={styles.wordmark}>Rimcast</div>
            <div className={styles.cue}>Pin inference where the world can’t wait</div>
          </div>
        </div>
        <nav className={styles.nav} aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
