import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Cog6ToothIcon,
  BellAlertIcon,
  UserIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ChartBarIcon,
  BoltIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";

export default function ConfigPage() {
  const [settings, setSettings] = useState({
    // Notificaciones
    emailNotifications: true,
    pushNotifications: false,
    criticalAlerts: true,
    warningAlerts: true,
    successAlerts: false,
    dailyReport: true,
    weeklyReport: true,
    monthlyReport: true,

    // Umbrales
    criticalThreshold: 150,
    warningThreshold: 120,
    efficiencyTarget: 85,

    // General
    language: "es",
    timezone: "America/Lima",
    currency: "PEN",
    dateFormat: "DD/MM/YYYY",

    // Privacidad
    dataSharing: false,
    analytics: true,
    cookies: true,
  });

  const handleToggle = (key: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleChange = (key: string, value: string | number) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar en el backend
    alert("Configuración guardada exitosamente");
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
              Configuración del Sistema
            </h1>
            <p className="text-gray-400">Personaliza tu experiencia y preferencias</p>
          </div>
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg shadow-purple-900/50"
          >
            Guardar Cambios
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-3">
            <button className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg font-medium transition text-left flex items-center gap-3">
              <BellAlertIcon className="w-5 h-5" />
              Notificaciones
            </button>
            <button className="w-full bg-gray-900/50 hover:bg-gray-800/50 border border-white/10 text-gray-300 px-4 py-3 rounded-lg font-medium transition text-left flex items-center gap-3">
              <ChartBarIcon className="w-5 h-5" />
              Umbrales y Límites
            </button>
            <button className="w-full bg-gray-900/50 hover:bg-gray-800/50 border border-white/10 text-gray-300 px-4 py-3 rounded-lg font-medium transition text-left flex items-center gap-3">
              <GlobeAltIcon className="w-5 h-5" />
              Preferencias Generales
            </button>
            <button className="w-full bg-gray-900/50 hover:bg-gray-800/50 border border-white/10 text-gray-300 px-4 py-3 rounded-lg font-medium transition text-left flex items-center gap-3">
              <ShieldCheckIcon className="w-5 h-5" />
              Privacidad y Seguridad
            </button>
            <button className="w-full bg-gray-900/50 hover:bg-gray-800/50 border border-white/10 text-gray-300 px-4 py-3 rounded-lg font-medium transition text-left flex items-center gap-3">
              <UserIcon className="w-5 h-5" />
              Cuenta de Usuario
            </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Notificaciones */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <BellAlertIcon className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Notificaciones</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium mb-1">Notificaciones por Email</h3>
                    <p className="text-sm text-gray-400">
                      Recibe alertas y reportes en tu correo electrónico
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("emailNotifications")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                      settings.emailNotifications ? "bg-purple-600" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        settings.emailNotifications ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium mb-1">Notificaciones Push</h3>
                    <p className="text-sm text-gray-400">
                      Recibe notificaciones en tiempo real en tu navegador
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("pushNotifications")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                      settings.pushNotifications ? "bg-purple-600" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        settings.pushNotifications ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="border-t border-white/10 pt-4 mt-4">
                  <h3 className="text-white font-medium mb-4">Tipos de Alertas</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Alertas Críticas</span>
                      <button
                        onClick={() => handleToggle("criticalAlerts")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                          settings.criticalAlerts ? "bg-red-600" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            settings.criticalAlerts ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Advertencias</span>
                      <button
                        onClick={() => handleToggle("warningAlerts")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                          settings.warningAlerts ? "bg-yellow-600" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            settings.warningAlerts ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Notificaciones de Éxito</span>
                      <button
                        onClick={() => handleToggle("successAlerts")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                          settings.successAlerts ? "bg-green-600" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            settings.successAlerts ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mt-4">
                  <h3 className="text-white font-medium mb-4">Reportes Automáticos</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Reporte Diario</span>
                      <button
                        onClick={() => handleToggle("dailyReport")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                          settings.dailyReport ? "bg-purple-600" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            settings.dailyReport ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Reporte Semanal</span>
                      <button
                        onClick={() => handleToggle("weeklyReport")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                          settings.weeklyReport ? "bg-purple-600" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            settings.weeklyReport ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Reporte Mensual</span>
                      <button
                        onClick={() => handleToggle("monthlyReport")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                          settings.monthlyReport ? "bg-purple-600" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            settings.monthlyReport ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Umbrales */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <BoltIcon className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Umbrales y Límites</h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-black/30 rounded-lg">
                  <label className="block text-white font-medium mb-2">
                    Umbral Crítico (% sobre promedio)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="100"
                      max="200"
                      value={settings.criticalThreshold}
                      onChange={(e) => handleChange("criticalThreshold", parseInt(e.target.value))}
                      className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                    />
                    <span className="text-white font-semibold w-16 text-right">
                      {settings.criticalThreshold}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Se generará una alerta crítica cuando el consumo supere este porcentaje
                  </p>
                </div>

                <div className="p-4 bg-black/30 rounded-lg">
                  <label className="block text-white font-medium mb-2">
                    Umbral de Advertencia (% sobre promedio)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="100"
                      max="150"
                      value={settings.warningThreshold}
                      onChange={(e) => handleChange("warningThreshold", parseInt(e.target.value))}
                      className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-600"
                    />
                    <span className="text-white font-semibold w-16 text-right">
                      {settings.warningThreshold}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Se generará una advertencia cuando el consumo supere este porcentaje
                  </p>
                </div>

                <div className="p-4 bg-black/30 rounded-lg">
                  <label className="block text-white font-medium mb-2">
                    Meta de Eficiencia Energética (%)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="70"
                      max="100"
                      value={settings.efficiencyTarget}
                      onChange={(e) => handleChange("efficiencyTarget", parseInt(e.target.value))}
                      className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                    <span className="text-white font-semibold w-16 text-right">
                      {settings.efficiencyTarget}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Objetivo de eficiencia energética para todos los edificios
                  </p>
                </div>
              </div>
            </div>

            {/* Preferencias Generales */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <GlobeAltIcon className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Preferencias Generales</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Idioma</label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleChange("language", e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition outline-none"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="pt">Português</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Zona Horaria</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleChange("timezone", e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition outline-none"
                  >
                    <option value="America/Lima">Lima (GMT-5)</option>
                    <option value="America/New_York">New York (GMT-5)</option>
                    <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
                    <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Moneda</label>
                  <select
                    value={settings.currency}
                    onChange={(e) => handleChange("currency", e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition outline-none"
                  >
                    <option value="PEN">Soles (S/)</option>
                    <option value="USD">Dólares ($)</option>
                    <option value="EUR">Euros (€)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Formato de Fecha</label>
                  <select
                    value={settings.dateFormat}
                    onChange={(e) => handleChange("dateFormat", e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition outline-none"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
