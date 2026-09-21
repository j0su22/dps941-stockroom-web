export type EquipmentStatus =
  | "IN_STOCK"
  | "ASSIGNED"
  | "MAINTENANCE";

export interface Equipment {
  id: string;
  code: string;
  name: string;
  category: string;
  brand: string;

  serialNumber?: string;
  macAddress?: string;
  model?: string;
  supplier?: string;
  responsible?: string;
  warranty?: string;
  purchaseDate?: string;
  imageUrl?: string;

  location: string;
  stock: number;
  minimumStock: number;
  unitValue?: number;

  status: EquipmentStatus;
}