import Header from "../components/Header";
import KpiCard from "../components/KpiCard";
import OverviewCard from "../components/Sidebar/OverviewCard";
import ObjectivesCard from "../components/Sidebar/ObjectivesCard";
import AudienceCard from "../components/Sidebar/AudienceCard";
import SecurityCard from "../components/Sidebar/SecurityCard";
import AccessibilityCard from "../components/Sidebar/AccessibilityCard";
import TechnologyCard from "../components/Sidebar/TechnologyCard";
import LegislationCard from "../components/Sidebar/LegislationCard";
import EnergyLineChart from "../components/Charts/EnergyLineChart";
import BuildingPieChart from "../components/Charts/BuildingPieChart";
import AlertsList from "../components/AlertsList";
import ReportsPanel from "../components/ReportsPanel";
import ConfigSection from "../components/ConfigSection";
import BuildingBarChart from "../components/Charts/BuildingBarChart";
import ConsumptionRadialChart from "../components/Charts/ConsumptionRadialChart";

export default function EnergyManagementDashboard() {
  return (
    <div className="min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="xl:col-span-3 space-y-6">
          <OverviewCard />
          <ObjectivesCard />
          <AudienceCard />
          <SecurityCard />
          <AccessibilityCard />
          <TechnologyCard />
          <LegislationCard />
        </aside>

        {/* Main content */}
        <main className="xl:col-span-9 space-y-6">
          {/* KPI cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KpiCard title="Consumo hoy" value="1,245 kWh" sub="−8% vs. base" />
            <KpiCard
              title="Ahorro proyectado"
              value="$ 3,240"
              sub="IA (30 días)"
            />
            <KpiCard title="CO₂ evitado" value="1.2 t" sub="Este mes" />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <EnergyLineChart />
            <BuildingPieChart />
            <BuildingBarChart />
            <ConsumptionRadialChart />
          </div>

          {/* Alerts and Reports */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AlertsList />
            <ReportsPanel />
          </div>
          <ConfigSection />
        </main>
      </div>
    </div>
  );
}
