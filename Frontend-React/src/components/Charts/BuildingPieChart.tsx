import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

type DataItem = {
  name: string;
  value: number;
};

const data: DataItem[] = [
  { name: "Edificio Central", value: 45 },
  { name: "Laboratorios", value: 25 },
  { name: "Residencias", value: 15 },
  { name: "Biblioteca", value: 10 },
  { name: "Auditorio", value: 5 },
];

const COLORS = ["#22c55e", "#16a34a", "#15803d", "#86efac", "#4ade80"];

export default function BuildingPieChart() {
  return (
    <div className="[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] backdrop-blur-sm border rounded-2xl border-white p-4 shadow-sm hover:shadow-lg transition">
      <h2 className="text-lg font-semibold mb-2 text-gray-400">
        Consumo por Edificio
      </h2>
      <div className="h-90">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
              labelLine={true}
              paddingAngle={4}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
