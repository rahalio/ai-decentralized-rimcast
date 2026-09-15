import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './shell/AppShell';
import { LoginPage } from './pages/LoginPage';
import { MlHomePage } from './pages/MlHomePage';
import { BudgetsPage } from './pages/BudgetsPage';
import { PlacementsPage } from './pages/PlacementsPage';
import { SlaPage } from './pages/SlaPage';
import { CapacityPage } from './pages/CapacityPage';
import { SafeModePage } from './pages/SafeModePage';
import { FreezePage } from './pages/FreezePage';
import { IncidentsPage } from './pages/IncidentsPage';
import { EgressPage } from './pages/EgressPage';

function useSession() {
  const [authed, setAuthed] = useState(() => Boolean(localStorage.getItem('rimcast.session')));
  useEffect(() => {
    const onStorage = () => setAuthed(Boolean(localStorage.getItem('rimcast.session')));
    window.addEventListener('storage', onStorage);
    window.addEventListener('rimcast-auth', onStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('rimcast-auth', onStorage);
    };
  }, []);
  return authed;
}

export function App() {
  const authed = useSession();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={authed ? <AppShell /> : <Navigate to="/login" replace />}>
        <Route index element={<MlHomePage />} />
        <Route path="budgets" element={<BudgetsPage />} />
        <Route path="placements" element={<PlacementsPage />} />
        <Route path="sla" element={<SlaPage />} />
        <Route path="capacity" element={<CapacityPage />} />
        <Route path="safe-mode" element={<SafeModePage />} />
        <Route path="freeze" element={<FreezePage />} />
        <Route path="incidents" element={<IncidentsPage />} />
        <Route path="egress" element={<EgressPage />} />
      </Route>
    </Routes>
  );
}
