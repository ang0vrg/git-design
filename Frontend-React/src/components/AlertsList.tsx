import { AlertTriangle, Bell } from "lucide-react";

type AlertItem = {
  id: number;
  title: string;
  detail: string;
  severity: "alto" | "medio" | "bajo";
  time: string;
};

const alerts: AlertItem[] = [
  {
    id: 1,
    title: "Pico inusual en Bloque B",
    detail: "+18% sobre la línea base",
    severity: "alto",
    time: "09:35",
  },
  {
    id: 2,
    title: "Sensores desconectados (3)",
    detail: "Lab. Química – 2do piso",
    severity: "medio",
    time: "08:12",
  },
  {
    id: 3,
    title: "Tarifa punta en 15 min",
    detail: "Sugerencia: diferir carga HVAC",
    severity: "bajo",
    time: "07:50",
  },
];

export default function AlertsList() {
  const severityColor = (severity: string) => {
    switch (severity) {
      case "alto":
        return "text-red-600";
      case "medio":
        return "text-yellow-500";
      case "bajo":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] backdrop-blur-sm border rounded-2xl border-white p-4 shadow-sm hover:shadow-lg transition">
      <h2 className="text-lg font-semibold mb-4 text-gray-400 flex items-center gap-2">
        <Bell className="w-5 h-5 text-green-600" /> Alertas
      </h2>
      <ul className="space-y-3">
        {alerts.map((alert) => (
          <li key={alert.id} className="flex items-start gap-3">
            <AlertTriangle
              className={`w-5 h-5 mt-0.5 ${severityColor(alert.severity)}`}
            />
            <div className="text-sm">
              <div className="font-medium text-gray-300">
                {alert.title}{" "}
                <span className="text-xs text-gray-500">• {alert.time}</span>
              </div>
              <div className="text-gray-600">{alert.detail}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
