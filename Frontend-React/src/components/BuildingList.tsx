import type { FC } from "react";
import type { Building } from "../types/Building";

interface Props {
  buildings: Building[];
  loading: boolean;
}

export const BuildingList: FC<Props> = ({ buildings, loading }) => {
  if (loading) return <p className="text-white/70">Cargando edificios...</p>;
  if (buildings.length === 0)
    return <p className="text-white/70">No hay edificios registrados</p>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {buildings.map((b) => (
        <div
          key={b.id}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white">{b.name}</h3>
          {b.address && <p className="text-sm text-white/80">{b.address}</p>}
          {b.city && (
            <p className="text-sm text-white/80">
              {b.city}, {b.country}
            </p>
          )}
          {b.lat && b.lon && (
            <p className="text-xs text-white/60">
              Lat: {b.lat} Lon: {b.lon}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
