import { FileText } from "lucide-react";

type Report = {
  id: number;
  name: string;
  date: string;
};

const reports: Report[] = [
  { id: 101, name: "Reporte mensual – Agosto", date: "2025-09-01" },
  { id: 102, name: "Huella de CO₂ – Q3", date: "2025-08-15" },
  { id: 103, name: "Disponibilidad de sensores", date: "2025-08-10" },
];

export default function ReportsPanel() {
  return (
    <div className="[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] backdrop-blur-sm border rounded-2xl border-white p-4 shadow-sm hover:shadow-lg transition">
      <h2 className="text-lg font-semibold mb-4 text-gray-400 flex items-center gap-2">
        <FileText className="w-5 h-5 text-green-600" /> Reportes
      </h2>
      <ul className="space-y-2 text-sm text-gray-300">
        {reports.map((report) => (
          <li key={report.id} className="flex items-center justify-between">
            <span>{report.name}</span>
            <span className="text-gray-500 text-xs">{report.date}</span>
          </li>
        ))}
      </ul>
      <div className="pt-3 flex gap-2">
        <button className="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition">
          Descargar
        </button>
        <button className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
          Generar nuevo
        </button>
      </div>
    </div>
  );
}
