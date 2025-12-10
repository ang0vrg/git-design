import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  DocumentChartBarIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  ChartBarIcon,
  BoltIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedBuilding, setSelectedBuilding] = useState("all");

  // Datos simulados para reportes
  const monthlyData = [
    { mes: "Ene", consumo: 45200, costo: 6780, ahorro: 520 },
    { mes: "Feb", consumo: 43800, costo: 6570, ahorro: 680 },
    { mes: "Mar", consumo: 46500, costo: 6975, ahorro: 450 },
    { mes: "Abr", consumo: 44200, costo: 6630, ahorro: 590 },
    { mes: "May", consumo: 42800, costo: 6420, ahorro: 720 },
    { mes: "Jun", consumo: 41500, costo: 6225, ahorro: 850 },
  ];

  const weeklyData = [
    { dia: "Lun", consumo: 1245, prediccion: 1280 },
    { dia: "Mar", consumo: 1198, prediccion: 1250 },
    { dia: "Mié", consumo: 1312, prediccion: 1300 },
    { dia: "Jue", consumo: 1276, prediccion: 1290 },
    { dia: "Vie", consumo: 1189, prediccion: 1220 },
    { dia: "Sáb", consumo: 856, prediccion: 900 },
    { dia: "Dom", consumo: 723, prediccion: 750 },
  ];

  const reports = [
    {
      id: 1,
      title: "Reporte Mensual - Junio 2024",
      type: "Mensual",
      date: "2024-06-30",
      consumption: "41,500 kWh",
      cost: "S/ 6,225",
      savings: "S/ 850",
      status: "completed",
    },
    {
      id: 2,
      title: "Reporte Mensual - Mayo 2024",
      type: "Mensual",
      date: "2024-05-31",
      consumption: "42,800 kWh",
      cost: "S/ 6,420",
      savings: "S/ 720",
      status: "completed",
    },
    {
      id: 3,
      title: "Reporte Trimestral - Q2 2024",
      type: "Trimestral",
      date: "2024-06-30",
      consumption: "128,500 kWh",
      cost: "S/ 19,275",
      savings: "S/ 2,160",
      status: "completed",
    },
    {
      id: 4,
      title: "Reporte Anual - 2023",
      type: "Anual",
      date: "2023-12-31",
      consumption: "542,300 kWh",
      cost: "S/ 81,345",
      savings: "S/ 8,920",
      status: "completed",
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
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
              Reportes y Análisis
            </h1>
            <p className="text-gray-400">Visualiza y descarga reportes de consumo energético</p>
          </div>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg shadow-purple-900/50 flex items-center gap-2">
            <DocumentChartBarIcon className="w-5 h-5" />
            Generar Reporte
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <FunnelIcon className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Filtros</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Período</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition outline-none"
              >
                <option value="week">Última Semana</option>
                <option value="month">Último Mes</option>
                <option value="quarter">Último Trimestre</option>
                <option value="year">Último Año</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Edificio</label>
              <select
                value={selectedBuilding}
                onChange={(e) => setSelectedBuilding(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition outline-none"
              >
                <option value="all">Todos los Edificios</option>
                <option value="1">Edificio A - Administrativo</option>
                <option value="2">Edificio B - Producción</option>
                <option value="3">Edificio C - Almacén</option>
                <option value="4">Edificio D - Servicios</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Tipo de Reporte</label>
              <select className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition outline-none">
                <option value="consumption">Consumo</option>
                <option value="cost">Costos</option>
                <option value="efficiency">Eficiencia</option>
                <option value="comparison">Comparativo</option>
              </select>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                <BoltIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Consumo Total</p>
                <p className="text-2xl font-bold text-white">41,500 kWh</p>
              </div>
            </div>
            <p className="text-xs text-green-400">↓ 8.2% vs mes anterior</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-700 rounded-lg flex items-center justify-center">
                <CurrencyDollarIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Costo Total</p>
                <p className="text-2xl font-bold text-white">S/ 6,225</p>
              </div>
            </div>
            <p className="text-xs text-green-400">↓ 5.3% vs mes anterior</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                <ChartBarIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Ahorro</p>
                <p className="text-2xl font-bold text-white">S/ 850</p>
              </div>
            </div>
            <p className="text-xs text-green-400">↑ 12.5% vs mes anterior</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tendencia Mensual */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Tendencia Mensual</h3>
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
                <Bar dataKey="consumo" fill="#9333ea" name="Consumo (kWh)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="ahorro" fill="#10b981" name="Ahorro (S/)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Consumo Semanal */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Consumo Semanal</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="dia" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="consumo"
                  stroke="#ec4899"
                  strokeWidth={3}
                  name="Consumo Real (kWh)"
                />
                <Line
                  type="monotone"
                  dataKey="prediccion"
                  stroke="#9333ea"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Predicción IA (kWh)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Reportes Generados</h3>
          <div className="space-y-3">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-black/30 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-black/50 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DocumentChartBarIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{report.title}</h4>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        {new Date(report.date).toLocaleDateString("es-ES")}
                      </span>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded border border-purple-500/30 text-xs">
                        {report.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Consumo</p>
                      <p className="text-white font-semibold">{report.consumption}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Costo</p>
                      <p className="text-white font-semibold">{report.cost}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Ahorro</p>
                      <p className="text-green-400 font-semibold">{report.savings}</p>
                    </div>
                  </div>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm font-medium">
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    Descargar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
