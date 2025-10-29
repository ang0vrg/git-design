// Gráfico de líneas con recharts
// Backend
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type DataItem = {
  day: string;
  consumo: number;
  proyeccion?: number;
};

const data: DataItem[] = [
  { day: "Lun", consumo: 220 },
  { day: "Mar", consumo: 180 },
  { day: "Mié", consumo: 210 },
  { day: "Jue", consumo: 260 },
  { day: "Vie", consumo: 240 },
  { day: "Sáb", consumo: 200 },
  { day: "Dom", consumo: 230 },
];

export default function EnergyLineChart() {
  return (
    <div className="[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] backdrop-blur-sm border rounded-2xl border-white p-4 shadow-sm hover:shadow-lg transition lg:col-span-2">
      <h2 className="text-lg font-semibold mb-2 text-gray-400">
        Tendencia de Consumo Energético
      </h2>
      <div className="h-90">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" tick={{ fill: "#4b5563" }} />
            <YAxis tick={{ fill: "#4b5563" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="consumo"
              stroke="#16a34a"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
