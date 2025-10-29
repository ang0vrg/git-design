export interface Building {
  id: number;
  name: string;
  address?: string;
  city?: string;
  country: string;
  lat?: number;
  lon?: number;
}

export interface BuildingRequest {
  name: string;
  address?: string;
  city?: string;
  country: string;
  lat?: number;
  lon?: number;
}
