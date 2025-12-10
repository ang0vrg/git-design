import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  BoltIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  CloudIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BuildingOfficeIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

export default function EnergyManagementDashboard() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  // Datos simulados para consumo por hora (últimas 24 horas)
  const hourlyData = [
    { hour: "00:00", consumo: 145, prediccion: 150 },
    { hour: "01:00", consumo: 132, prediccion: 135 },
    { hour: "02:00", consumo: 128, prediccion: 130 },
    { hour: "03:00", consumo: 125, prediccion: 128 },
    { hour: "04:00", consumo: 130, prediccion: 132 },
    { hour: "05:00", consumo: 142, prediccion: 145 },
    { hour: "06:00", consumo: 168, prediccion: 165 },
    { hour: "07:00", consumo: 195, prediccion: 190 },
    { hour: "08:00", consumo: 245, prediccion: 240 },
    { hour: "09:00", consumo: 278, prediccion: 275 },
    { hour: "10:00", consumo: 298, prediccion: 295 },
    { hour: "11:00", consumo: 312, prediccion: 310 },
    { hour: "12:00", consumo: 325, prediccion: 320 },
    { hour: "13:00", consumo: 318, prediccion: 315 },
    { hour: "14:00", consumo: 305, prediccion: 300 },
    { hour: "15:00", consumo: 295, prediccion: 290 },
    { hour: "16:00", consumo: 285, prediccion: 280 },
    { hour: "17:00", consumo: 268, prediccion: 265 },
    { hour: "18:00", consumo: 245, prediccion: 240 },
    { hour: "19:00", consumo: 215, prediccion: 210 },
    { hour: "20:00", consumo: 195, prediccion: 190 },
    { hour: "21:00", consumo: 178, prediccion: 175 },
    { hour: "22:00", consumo: 165, prediccion: 160 },
    { hour: "23:00", consumo: 152, prediccion: 155 },
  ];

  // Datos por edificio
  const buildingData = [
    { name: "Edificio A", consumo: 1245, color: "#9333ea" },
    { name: "Edificio B", consumo: 987, color: "#ec4899" },
    { name: "Edificio C", consumo: 756, color: "#8b5cf6" },
    { name: "Edificio D", consumo: 543, color: "#d946ef" },
  ];

  // Datos mensuales
  const monthlyData = [
    { mes: "Ene", consumo: 45200, costo: 6780 },
    { mes: "Feb", consumo: 43800, costo: 6570 },
    { mes: "Mar", consumo: 46500, costo: 6975 },
    { mes: "Abr", consumo: 44200, costo: 6630 },
    { mes: "May", consumo: 42800, costo: 6420 },
    { mes: "Jun", consumo: 41500, costo: 6225 },
  ];

  // Alertas recientes
  const alerts = [
    {
      id: 1,
      type: "warning",
      building: "Edificio A",
      message: "Consumo 15% sobre el promedio",
      time: "Hace 5 min",
    },
    {
      id: 2,
      type: "success",
      building: "Edificio C",
      message: "Ahorro del 8% detectado",
      time: "Hace 1 hora",
    },
    {
      id: 3,
      type: "error",
      building: "Edificio B",
      message: "Pico de consumo anormal",
      time: "Hace 2 horas",
    },
  ];

  // KPIs
  const kpis = [
    {
      title: "Consumo Hoy",
      value: "5,234 kWh",
      change: -8.2,
      icon: BoltIcon,
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Ahorro Proyectado",
      value: "S/ 4,850",
      change: 12.5,
      icon: CurrencyDollarIcon,
      color: "from-pink-500 to-pink-700",
    },
    {
      title: "CO₂ Evitado",
      value: "2.8 t",
      change: 15.3,
      icon: CloudIcon,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Eficiencia",
      value: "87%",
      change: 5.1,
      icon: ChartBarIcon,
      color: "from-blue-500 to-blue-700",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20 -z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      </div>

      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
                Dashboard de Gestión Energética
              </h1>
              <p className="text-gray-400">
                Monitoreo en tiempo real de consumo y eficiencia energética
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <ClockIcon className="w-5 h-5 text-purple-400" />
              <span className="text-sm">
                {currentTime.toLocaleString("es-ES", {
                  dateStyle: "medium",
                  timeStyle: "medium",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, index) => (
            <div
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${kpi.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition`}
                >
                  <kpi.icon className="w-7 h-7 text-white" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    kpi.change >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {kpi.change >= 0 ? (
                    <ArrowTrendingUpIcon className="w-4 h-4" />
                  ) : (
                    <ArrowTrendingDownIcon className="w-4 h-4" />
                  )}
                  <span>{Math.abs(kpi.change)}%</span>
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{kpi.title}</h3>
              <p className="text-2xl font-bold text-white">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Consumo por Hora */}
          <div className="lg:col-span-2 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Consumo por Hora (Últimas 24h)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="colorConsumo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPrediccion" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="hour" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="consumo"
                  stroke="#9333ea"
                  fillOpacity={1}
                  fill="url(#colorConsumo)"
                  name="Consumo Real (kWh)"
                />
                <Area
                  type="monotone"
                  dataKey="prediccion"
                  stroke="#ec4899"
                  fillOpacity={1}
                  fill="url(#colorPrediccion)"
                  name="Predicción IA (kWh)"
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Distribución por Edificio */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Distribución por Edificio
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={buildingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="consumo"
                >
                  {buildingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {buildingData.map((building, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: building.color }}
                    ></div>
                    <span className="text-sm text-gray-300">{building.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {building.consumo} kWh
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tendencia Mensual */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Tendencia Mensual
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="mes" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="consumo"
                  fill="#9333ea"
                  name="Consumo (kWh)"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="costo"
                  fill="#ec4899"
                  name="Costo (S/)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Alertas Recientes */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Alertas Recientes
            </h3>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${
                    alert.type === "error"
                      ? "bg-red-900/20 border-red-500/30"
                      : alert.type === "warning"
                      ? "bg-yellow-900/20 border-yellow-500/30"
                      : "bg-green-900/20 border-green-500/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {alert.type === "error" ? (
                      <ExclamationTriangleIcon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    ) : alert.type === "warning" ? (
                      <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-white">
                          {alert.building}
                        </span>
                        <span className="text-xs text-gray-400">{alert.time}</span>
                      </div>
                      <p className="text-sm text-gray-300">{alert.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition font-medium">
              Ver Todas las Alertas
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => navigate("/buildings")}
            className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition group text-left"
          >
            <BuildingOfficeIcon className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition" />
            <h4 className="text-white font-semibold mb-1">Edificios</h4>
            <p className="text-sm text-gray-400">Gestionar edificios</p>
          </button>
          <button
            onClick={() => navigate("/reports")}
            className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition group text-left"
          >
            <ChartBarIcon className="w-8 h-8 text-pink-400 mb-3 group-hover:scale-110 transition" />
            <h4 className="text-white font-semibold mb-1">Reportes</h4>
            <p className="text-sm text-gray-400">Ver reportes detallados</p>
          </button>
          <button
            onClick={() => navigate("/alerts")}
            className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition group text-left"
          >
            <ExclamationTriangleIcon className="w-8 h-8 text-yellow-400 mb-3 group-hover:scale-110 transition" />
            <h4 className="text-white font-semibold mb-1">Alertas</h4>
            <p className="text-sm text-gray-400">Configurar alertas</p>
          </button>
          <button
            onClick={() => navigate("/config")}
            className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition group text-left"
          >
            <BoltIcon className="w-8 h-8 text-green-400 mb-3 group-hover:scale-110 transition" />
            <h4 className="text-white font-semibold mb-1">Configuración</h4>
            <p className="text-sm text-gray-400">Ajustes del sistema</p>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
