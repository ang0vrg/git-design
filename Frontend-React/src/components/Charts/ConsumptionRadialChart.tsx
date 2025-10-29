import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  PolarAngleAxis,
  LabelList,
} from "recharts";

const data = [
  { name: "Ahorro Energético", value: 75, fill: "#63e" },
  { name: "CO₂ Evitado", value: 60, fill: "#7C5652" },
];

export default function ConsumptionRadialChart() {
  return (
    <div className="[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] rounded-2xl p-4 shadow-sm h-64">
      <h3 className="text-sm font-semibold mb-2 text-gray-400">
        Progreso de Metas (%)
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="30%"
          outerRadius="90%"
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            tick={false}
            angleAxisId={0}
          />

          <RadialBar
            dataKey="value"
            background
            fill="#63e"
            cornerRadius={30}
          >
            {/* ✅ Usa LabelList en lugar de label.formatter */}
            <LabelList
              position="insideStart"
              fill="#fff"
              fontSize={12}
              dataKey="value"
              formatter={(label: any) => `${label}%`}
            />
          </RadialBar>

          <Legend
            iconSize={10}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
