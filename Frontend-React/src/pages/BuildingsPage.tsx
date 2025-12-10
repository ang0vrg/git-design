import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  BuildingOfficeIcon,
  PlusIcon,
  BoltIcon,
  MapPinIcon,
  ChartBarIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

interface Meter {
  id: number;
  name: string;
  type: string;
  consumption: number;
  status: "active" | "inactive" | "warning";
}

interface Building {
  id: number;
  name: string;
  address: string;
  floors: number;
  area: number;
  meters: Meter[];
  totalConsumption: number;
  efficiency: number;
}

export default function BuildingsPage() {
  const [buildings] = useState<Building[]>([
    {
      id: 1,
      name: "Edificio A - Administrativo",
      address: "Av. Principal 123, Lima",
      floors: 5,
      area: 2500,
      totalConsumption: 1245,
      efficiency: 87,
      meters: [
        { id: 1, name: "Medidor Piso 1", type: "Eléctrico", consumption: 245, status: "active" },
        { id: 2, name: "Medidor Piso 2", type: "Eléctrico", consumption: 268, status: "active" },
        { id: 3, name: "Medidor Piso 3", type: "Eléctrico", consumption: 252, status: "warning" },
        { id: 4, name: "Medidor Piso 4", type: "Eléctrico", consumption: 235, status: "active" },
        { id: 5, name: "Medidor Piso 5", type: "Eléctrico", consumption: 245, status: "active" },
      ],
    },
    {
      id: 2,
      name: "Edificio B - Producción",
      address: "Av. Industrial 456, Lima",
      floors: 3,
      area: 3200,
      totalConsumption: 987,
      efficiency: 82,
      meters: [
        { id: 6, name: "Medidor Planta 1", type: "Eléctrico", consumption: 425, status: "active" },
        { id: 7, name: "Medidor Planta 2", type: "Eléctrico", consumption: 362, status: "active" },
        { id: 8, name: "Medidor Oficinas", type: "Eléctrico", consumption: 200, status: "active" },
      ],
    },
    {
      id: 3,
      name: "Edificio C - Almacén",
      address: "Jr. Comercio 789, Lima",
      floors: 2,
      area: 1800,
      totalConsumption: 756,
      efficiency: 91,
      meters: [
        { id: 9, name: "Medidor Principal", type: "Eléctrico", consumption: 456, status: "active" },
        { id: 10, name: "Medidor Secundario", type: "Eléctrico", consumption: 300, status: "active" },
      ],
    },
    {
      id: 4,
      name: "Edificio D - Servicios",
      address: "Av. Los Pinos 321, Lima",
      floors: 4,
      area: 2100,
      totalConsumption: 543,
      efficiency: 85,
      meters: [
        { id: 11, name: "Medidor Piso 1-2", type: "Eléctrico", consumption: 278, status: "active" },
        { id: 12, name: "Medidor Piso 3-4", type: "Eléctrico", consumption: 265, status: "inactive" },
      ],
    },
  ]);

  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [showModal, setShowModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "inactive":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activo";
      case "warning":
        return "Advertencia";
      case "inactive":
        return "Inactivo";
      default:
        return "Desconocido";
    }
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
              Gestión de Edificios
            </h1>
            <p className="text-gray-400">Administra edificios y medidores de consumo</p>
          </div>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg shadow-purple-900/50 flex items-center gap-2">
            <PlusIcon className="w-5 h-5" />
            Agregar Edificio
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <BuildingOfficeIcon className="w-8 h-8 text-purple-400" />
              <h3 className="text-gray-400 text-sm">Total Edificios</h3>
            </div>
            <p className="text-3xl font-bold text-white">{buildings.length}</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <BoltIcon className="w-8 h-8 text-pink-400" />
              <h3 className="text-gray-400 text-sm">Total Medidores</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {buildings.reduce((acc, b) => acc + b.meters.length, 0)}
            </p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <ChartBarIcon className="w-8 h-8 text-green-400" />
              <h3 className="text-gray-400 text-sm">Consumo Total</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {buildings.reduce((acc, b) => acc + b.totalConsumption, 0).toLocaleString()} kWh
            </p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <MapPinIcon className="w-8 h-8 text-blue-400" />
              <h3 className="text-gray-400 text-sm">Área Total</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {buildings.reduce((acc, b) => acc + b.area, 0).toLocaleString()} m²
            </p>
          </div>
        </div>

        {/* Buildings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {buildings.map((building) => (
            <div
              key={building.id}
              className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition"
            >
              {/* Building Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BuildingOfficeIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{building.name}</h3>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      {building.address}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition">
                    <PencilIcon className="w-5 h-5 text-gray-400 hover:text-purple-400" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition">
                    <TrashIcon className="w-5 h-5 text-gray-400 hover:text-red-400" />
                  </button>
                </div>
              </div>

              {/* Building Info */}
              <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-white/10">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Pisos</p>
                  <p className="text-lg font-semibold text-white">{building.floors}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Área</p>
                  <p className="text-lg font-semibold text-white">{building.area} m²</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Eficiencia</p>
                  <p className="text-lg font-semibold text-green-400">{building.efficiency}%</p>
                </div>
              </div>

              {/* Consumption */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Consumo Total</span>
                  <span className="text-lg font-bold text-white">
                    {building.totalConsumption.toLocaleString()} kWh
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    style={{ width: `${(building.totalConsumption / 1500) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Meters */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-white">
                    Medidores ({building.meters.length})
                  </h4>
                  <button
                    onClick={() => {
                      setSelectedBuilding(building);
                      setShowModal(true);
                    }}
                    className="text-xs text-purple-400 hover:text-purple-300 transition"
                  >
                    Ver detalles
                  </button>
                </div>
                <div className="space-y-2">
                  {building.meters.slice(0, 3).map((meter) => (
                    <div
                      key={meter.id}
                      className="flex items-center justify-between p-2 bg-black/30 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <BoltIcon className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-gray-300">{meter.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">
                          {meter.consumption} kWh
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded border ${getStatusColor(
                            meter.status
                          )}`}
                        >
                          {getStatusText(meter.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                  {building.meters.length > 3 && (
                    <p className="text-xs text-gray-500 text-center">
                      +{building.meters.length - 3} medidores más
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {showModal && selectedBuilding && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-purple-500/30 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-gray-900 z-10">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {selectedBuilding.name}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                <XMarkIcon className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Building Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Dirección</p>
                  <p className="text-white">{selectedBuilding.address}</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Pisos</p>
                  <p className="text-white">{selectedBuilding.floors}</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Área Total</p>
                  <p className="text-white">{selectedBuilding.area} m²</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Eficiencia</p>
                  <p className="text-green-400 font-semibold">{selectedBuilding.efficiency}%</p>
                </div>
              </div>

              {/* All Meters */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Todos los Medidores ({selectedBuilding.meters.length})
                </h3>
                <div className="space-y-3">
                  {selectedBuilding.meters.map((meter) => (
                    <div
                      key={meter.id}
                      className="bg-black/30 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <BoltIcon className="w-6 h-6 text-purple-400" />
                        <div>
                          <p className="text-white font-medium">{meter.name}</p>
                          <p className="text-sm text-gray-400">{meter.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-white">{meter.consumption} kWh</p>
                        <span
                          className={`text-xs px-2 py-1 rounded border inline-block mt-1 ${getStatusColor(
                            meter.status
                          )}`}
                        >
                          {getStatusText(meter.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
