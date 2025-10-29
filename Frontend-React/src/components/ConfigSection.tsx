export default function ConfigSection() {
  const roles = ["Administrador", "Operador", "Lector"];
  const sites = ["Campus Central Lima", "Sede Arequipa Sur", "Trujillo Norte"];
  const integrations = ["Grafana", "API REST", "MQTT", "Modbus"];

  return (
    <div className="[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] backdrop-blur-sm border rounded-2xl border-white p-4 shadow-sm hover:shadow-lg transition">
      <h2 className="text-lg font-semibold mb-4 text-gray-400">
        Configuración (Roles & Multisedes)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        {/* Roles */}
        <div className="p-3 rounded-xl border border-gray-200 bg-auto">
          <div className="font-medium mb-1 text-gray-300">Roles</div>
          <div className="text-gray-500">{roles.join(" • ")}</div>
        </div>

        {/* Sedes */}
        <div className="p-3 rounded-xl border border-gray-200 bg-auto">
          <div className="font-medium mb-1 text-gray-300">Sedes</div>
          <ul className="space-y-1 text-gray-500">
            {sites.map((site, idx) => (
              <li key={idx}>{site}</li>
            ))}
          </ul>
        </div>

        {/* Integraciones */}
        <div className="p-3 rounded-xl border border-gray-200 bg-auto">
          <div className="font-medium mb-1 text-gray-300">Integraciones</div>
          <div className="text-gray-500">{integrations.join(" • ")}</div>
        </div>
      </div>
    </div>
  );
}
