import type { Equipment } from "@/types/equipment";
import type { Project } from "@/types/project";
import type { User } from "@/types/user";

export const mockEquipment: Equipment[] = [
  {
    id: "1",
    code: "PRO-0001",
    name: "Ubiquiti U7 Pro XG",
    category: "Redes",
    serialNumber: "U7P-0001A2B3",
    location: "Almacén Principal",
    stock: 24,
    minimumStock: 10,
    status: "EN BODEGA",
  },
];

export const mockUsers: User[] = [
  { id: "u1", name: "María Rojas", email: "maria.rojas@dtech.com", role: "ADMIN", active: true },
  { id: "u2", name: "Juan Pérez", email: "juan.perez@dtech.com", role: "TECHNICIAN", active: true },
  { id: "u3", name: "Ana Solís", email: "ana.solis@dtech.com", role: "TECHNICIAN", active: true },
  { id: "u4", name: "Luis Vargas", email: "luis.vargas@dtech.com", role: "WAREHOUSE", active: true },
];

export const mockProjects: Project[] = [
  {
    id: "p1",
    name: "TORRE 1 · Instalación de Red",
    client: "Constructora ABC",
    status: "IN_PROGRESS",
    progress: 75,
    startDate: "2025-03-15",
    endDate: "2025-09-30",
    assignedEquipment: 124,
    installedEquipment: 93,
    toReturnEquipment: 8,
    technicianIds: ["u2", "u3"],
    location: "Av. Escazú, Torre 1",
  },
  {
    id: "p2",
    name: "Plaza Central · CCTV",
    client: "Plaza Central S.A.",
    status: "IN_PROGRESS",
    progress: 40,
    startDate: "2025-04-01",
    endDate: "2025-11-15",
    assignedEquipment: 186,
    installedEquipment: 74,
    toReturnEquipment: 3,
    technicianIds: ["u3", "u4"],
  },
  {
    id: "p3",
    name: "Oficinas Dtech · Control de Acceso",
    client: "Grupo Dtech",
    status: "DELAYED",
    progress: 10,
    startDate: "2025-05-01",
    endDate: "2025-09-05",
    assignedEquipment: 52,
    installedEquipment: 5,
    toReturnEquipment: 1,
    technicianIds: ["u4"],
  },
  {
    id: "p4",
    name: "Hotel Vista Mar · Wi-Fi",
    client: "Vista Mar Resorts",
    status: "IN_PROGRESS",
    progress: 58,
    startDate: "2025-04-20",
    endDate: "2025-10-22",
    assignedEquipment: 96,
    installedEquipment: 56,
    toReturnEquipment: 4,
    technicianIds: ["u2"],
  },
  {
    id: "p5",
    name: "Bodega Sur · Modernización",
    client: "Grupo Dtech",
    status: "PENDING",
    progress: 0,
    startDate: "2025-09-01",
    assignedEquipment: 0,
    installedEquipment: 0,
    toReturnEquipment: 0,
    technicianIds: [],
  },
];