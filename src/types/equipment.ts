export interface Equipment {
  id: string;
  code: string;
  name: string;
  category: string;
  serialNumber?: string;
  macAddress?: string;
  location: string;
  stock: number;
  minimumStock: number;
  status: string;
}
