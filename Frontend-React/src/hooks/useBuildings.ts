import { useState, useEffect } from "react";
import type { Building, BuildingRequest } from "../types/Building";

const API_URL = "/api/buildings";

export function useBuildings() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const list = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al cargar edificios");
      const data: Building[] = await res.json();
      setBuildings(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const create = async (dto: BuildingRequest) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dto),
      });
      if (!res.ok) throw new Error("Error al crear edificio");
      await list(); // refresca lista
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    list();
  }, []);

  return { buildings, loading, error, create };
}
