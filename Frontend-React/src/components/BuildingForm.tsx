import type { FC, FormEvent } from "react";
import { useState } from "react";
import type { BuildingRequest } from "../types/Building";

interface Props {
  onSubmit: (dto: BuildingRequest) => Promise<void>;
}

export const BuildingForm: FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<BuildingRequest>({
    name: "",
    address: "",
    city: "",
    country: "PE",
    lat: undefined,
    lon: undefined,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "lat" || name === "lon"
          ? value
            ? Number(value)
            : undefined
          : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setLoading(true);
    await onSubmit(form);
    setForm({
      name: "",
      address: "",
      city: "",
      country: "PE",
      lat: undefined,
      lon: undefined,
    });
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 space-y-4"
    >
      <h2 className="text-xl font-bold text-white">Nuevo Edificio</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nombre"
        required
        className="input"
      />
      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Dirección"
        className="input"
      />
      <input
        name="city"
        value={form.city}
        onChange={handleChange}
        placeholder="Ciudad"
        className="input"
      />
      <input
        name="country"
        value={form.country}
        onChange={handleChange}
        placeholder="País"
        className="input"
      />
      <div className="flex gap-4">
        <input
          name="lat"
          type="number"
          step="0.000001"
          value={form.lat ?? ""}
          onChange={handleChange}
          placeholder="Latitud"
          className="input"
        />
        <input
          name="lon"
          type="number"
          step="0.000001"
          value={form.lon ?? ""}
          onChange={handleChange}
          placeholder="Longitud"
          className="input"
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? "Guardando..." : "Crear Edificio"}
      </button>
    </form>
  );
};
