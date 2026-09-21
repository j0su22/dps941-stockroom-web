import type { Equipment } from "@/types/equipment";
import type { Project } from "@/types/project";
import type { User } from "@/types/user";
import type { ProjectDetail } from "@/types/projectDetail";

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

export const mockProjectDetails: Record<string, ProjectDetail> = {
  p1: {
    projectId: "p1",
    assignedEquipment: [
      { id: "pe1", equipmentName: "Ubiquiti U7 Pro XG", serialNumber: "U7P-0001A2B3", quantity: 2, technicianId: "u2", status: "INSTALADO" },
      { id: "pe2", equipmentName: "Ubiquiti U6 Mesh", serialNumber: "U6M-0042C1D4", quantity: 6, technicianId: "u2", status: "INSTALADO" },
      { id: "pe3", equipmentName: "Switch 24p Gigabit", serialNumber: "TPL-24G-0117", quantity: 3, technicianId: "u3", status: "EN_SITIO" },
      { id: "pe4", equipmentName: "Conector RJ45 Cat6", quantity: 50, technicianId: "u2", status: "CONSUMIDO" },
      { id: "pe5", equipmentName: "Cable UTP Cat6 305 m", quantity: 4, technicianId: "u3", status: "POR_DEVOLVER" },
      { id: "pe6", equipmentName: "Patch panel 24p", serialNumber: "PP24-0055", quantity: 2, technicianId: "u2", status: "INSTALADO" },
      { id: "pe7", equipmentName: "Rack mural 12U", serialNumber: "RCK-0012", quantity: 1, technicianId: "u3", status: "INSTALADO" },
    ],
    stages: [
      { name: "Cableado estructurado", percentage: 100 },
      { name: "Puntos de acceso", percentage: 86 },
      { name: "Rack y energía", percentage: 62 },
      { name: "Pruebas y entrega", percentage: 20 },
    ],
    team: [
      { userId: "u2", movementsCount: 58 },
      { userId: "u3", movementsCount: 41 },
      { userId: "u1", movementsCount: 0 },
    ],
  },
};