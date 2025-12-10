import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  BellAlertIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  Cog6ToothIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

interface Alert {
  id: number;
  type: "critical" | "warning" | "info" | "success";
  title: string;
  message: string;
  building: string;
  timestamp: string;
  read: boolean;
  resolved: boolean;
}

export default function AlertsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: "critical",
      title: "Consumo Crítico Detectado",
      message: "El Edificio B ha superado el 150% del consumo promedio en las últimas 2 horas.",
      building: "Edificio B - Producción",
      timestamp: "2024-06-10T14:30:00",
      read: false,
      resolved: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Consumo Elevado",
      message: "El Edificio A presenta un consumo 15% superior al promedio.",
      building: "Edificio A - Administrativo",
      timestamp: "2024-06-10T13:15:00",
      read: false,
      resolved: false,
    },
    {
      id: 3,
      type: "success",
      title: "Ahorro Detectado",
      message: "El Edificio C ha reducido su consumo en un 8% respecto al mes anterior.",
      building: "Edificio C - Almacén",
      timestamp: "2024-06-10T12:00:00",
      read: true,
      resolved: true,
    },
    {
      id: 4,
      type: "warning",
      title: "Medidor con Anomalía",
      message: "El medidor del Piso 3 en Edificio A muestra lecturas irregulares.",
      building: "Edificio A - Administrativo",
      timestamp: "2024-06-10T10:45:00",
      read: true,
      resolved: false,
    },
    {
      id: 5,
      type: "info",
      title: "Mantenimiento Programado",
      message: "Se realizará mantenimiento preventivo en el Edificio D el próximo lunes.",
      building: "Edificio D - Servicios",
      timestamp: "2024-06-10T09:00:00",
      read: true,
      resolved: false,
    },
    {
      id: 6,
      type: "critical",
      title: "Falla en Medidor",
      message: "El medidor principal del Edificio D no está enviando datos desde hace 30 minutos.",
      building: "Edificio D - Servicios",
      timestamp: "2024-06-09T18:20:00",
      read: true,
      resolved: true,
    },
    {
      id: 7,
      type: "success",
      title: "Meta de Eficiencia Alcanzada",
      message: "El Edificio A ha alcanzado el 90% de eficiencia energética.",
      building: "Edificio A - Administrativo",
      timestamp: "2024-06-09T16:00:00",
      read: true,
      resolved: true,
    },
    {
      id: 8,
      type: "warning",
      title: "Pico de Consumo Previsto",
      message: "La IA predice un pico de consumo para mañana entre las 14:00 y 16:00 horas.",
      building: "Todos los Edificios",
      timestamp: "2024-06-09T14:30:00",
      read: true,
      resolved: false,
    },
  ]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <XCircleIcon className="w-6 h-6 text-red-400" />;
      case "warning":
        return <ExclamationTriangleIcon className="w-6 h-6 text-yellow-400" />;
      case "success":
        return <CheckCircleIcon className="w-6 h-6 text-green-400" />;
      default:
        return <BellAlertIcon className="w-6 h-6 text-blue-400" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-500/20 border-red-500/30";
      case "warning":
        return "bg-yellow-500/20 border-yellow-500/30";
      case "success":
        return "bg-green-500/20 border-green-500/30";
      default:
        return "bg-blue-500/20 border-blue-500/30";
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "all") return true;
    if (filter === "unread") return !alert.read;
    if (filter === "unresolved") return !alert.resolved;
    return alert.type === filter;
  });

  const stats = {
    total: alerts.length,
    unread: alerts.filter((a) => !a.read).length,
    critical: alerts.filter((a) => a.type === "critical" && !a.resolved).length,
    resolved: alerts.filter((a) => a.resolved).length,
  };

  const markAsRead = (id: number) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, read: true } : alert)));
  };

  const markAsResolved = (id: number) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, resolved: true, read: true } : alert
      )
    );
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `Hace ${minutes} min`;
    if (hours < 24) return `Hace ${hours} hora${hours > 1 ? "s" : ""}`;
    return `Hace ${days} día${days > 1 ? "s" : ""}`;
  };

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
              Centro de Alertas
            </h1>
            <p className="text-gray-400">Monitorea y gestiona alertas del sistema</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2">
              <Cog6ToothIcon className="w-5 h-5" />
              Configurar
            </button>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg shadow-purple-900/50 flex items-center gap-2">
              <PlusIcon className="w-5 h-5" />
              Nueva Regla
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <BellAlertIcon className="w-8 h-8 text-purple-400" />
              <h3 className="text-gray-400 text-sm">Total Alertas</h3>
            </div>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <ExclamationTriangleIcon className="w-8 h-8 text-yellow-400" />
              <h3 className="text-gray-400 text-sm">No Leídas</h3>
            </div>
            <p className="text-3xl font-bold text-white">{stats.unread}</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <XCircleIcon className="w-8 h-8 text-red-400" />
              <h3 className="text-gray-400 text-sm">Críticas</h3>
            </div>
            <p className="text-3xl font-bold text-white">{stats.critical}</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircleIcon className="w-8 h-8 text-green-400" />
              <h3 className="text-gray-400 text-sm">Resueltas</h3>
            </div>
            <p className="text-3xl font-bold text-white">{stats.resolved}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-black/30 text-gray-400 hover:text-white"
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === "unread"
                  ? "bg-purple-600 text-white"
                  : "bg-black/30 text-gray-400 hover:text-white"
              }`}
            >
              No Leídas
            </button>
            <button
              onClick={() => setFilter("unresolved")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === "unresolved"
                  ? "bg-purple-600 text-white"
                  : "bg-black/30 text-gray-400 hover:text-white"
              }`}
            >
              Sin Resolver
            </button>
            <button
              onClick={() => setFilter("critical")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === "critical"
                  ? "bg-red-600 text-white"
                  : "bg-black/30 text-gray-400 hover:text-white"
              }`}
            >
              Críticas
            </button>
            <button
              onClick={() => setFilter("warning")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === "warning"
                  ? "bg-yellow-600 text-white"
                  : "bg-black/30 text-gray-400 hover:text-white"
              }`}
            >
              Advertencias
            </button>
            <button
              onClick={() => setFilter("success")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === "success"
                  ? "bg-green-600 text-white"
                  : "bg-black/30 text-gray-400 hover:text-white"
              }`}
            >
              Éxitos
            </button>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-3">
          {filteredAlerts.length === 0 ? (
            <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-12 text-center">
              <BellAlertIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No hay alertas para mostrar</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`bg-gray-900/50 backdrop-blur-sm border rounded-xl p-6 ${getAlertColor(
                  alert.type
                )} ${!alert.read ? "border-l-4" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{alert.title}</h3>
                        <p className="text-sm text-gray-300 mb-2">{alert.message}</p>
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <span className="text-gray-400 flex items-center gap-1">
                            <ClockIcon className="w-4 h-4" />
                            {formatTimestamp(alert.timestamp)}
                          </span>
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded border border-purple-500/30 text-xs">
                            {alert.building}
                          </span>
                          {!alert.read && (
                            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded border border-yellow-500/30 text-xs">
                              No leída
                            </span>
                          )}
                          {alert.resolved && (
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded border border-green-500/30 text-xs">
                              Resuelta
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {!alert.read && (
                        <button
                          onClick={() => markAsRead(alert.id)}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition text-sm font-medium"
                        >
                          Marcar como leída
                        </button>
                      )}
                      {!alert.resolved && (
                        <button
                          onClick={() => markAsResolved(alert.id)}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition text-sm font-medium"
                        >
                          Marcar como resuelta
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
