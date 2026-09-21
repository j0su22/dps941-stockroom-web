export interface Project {
  id: string;
  name: string;
  client: string;
  status: "PENDING" | "IN_PROGRESS" | "CLOSED" | "DELAYED";
  progress: number;
  startDate: string;
  endDate?: string;
  // Campos adicionales para la UI. En una integración real con el backend,
  // estos valores se calcularían a partir de Movement/Equipment filtrando
  // por projectId. Mientras trabajamos con mocks, los guardamos aquí
  // directamente para simplificar la vista.
  assignedEquipment?: number;
  installedEquipment?: number;
  toReturnEquipment?: number;
  technicianIds?: string[];
  location?: string;
}