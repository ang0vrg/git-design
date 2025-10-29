import './App.css'
import { Routes, Route } from "react-router-dom";
import EnergyManagementDashboard from './pages/EnergyManagementDashboard';
import BuildingsPage from "./pages/BuildingsPage";
import ReportsPage from "./pages/ReportsPage";
import AlertsPage from "./pages/AlertsPage";
import ConfigPage from "./pages/ConfigPage";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

function App() {

  return (
    <Routes>
      <Route path="/" element={<EnergyManagementDashboard />} />
      <Route path="/buildings" element={<BuildingsPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/alerts" element={<AlertsPage />} />
      <Route path="/config" element={<ConfigPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App
