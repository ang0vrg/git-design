import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { building: "Bloque A", consumo: 420 },
  { building: "Bloque B", consumo: 280 },
  { building: "Laboratorios", consumo: 180 },
  { building: "Servicios", consumo: 120 },
];

export default function BuildingBarChart() {
  return (
    <div className="[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] rounded-2xl p-4 shadow-sm h-64">
      <h3 className="text-sm font-semibold mb-2 text-gray-400">Consumo por Edificio (kWh)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="building" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="consumo" fill="#99a1af" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}