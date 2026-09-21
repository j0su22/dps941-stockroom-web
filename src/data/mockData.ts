import type { Equipment } from "@/types/equipment";
import type { Project } from "@/types/project";
import type { User } from "@/types/user";
import type { ProjectDetail } from "@/types/projectDetail";
import type { PermissionDefinition, RolePermissionsMap } from "@/types/permission";
import type { DashboardMetric, WeeklyMovement, AlertItem } from "@/types/dashboard";
import type { ReportMetric, ProjectConsumption, CategoryStock, SavedReport } from "@/types/report";

export const mockEquipment: Equipment[] = [
  {
    id: "1",
    code: "EQ-001",
    name: "Ubiquiti U7 Pro XG",
    category: "Redes",
    brand: "Ubiquiti",
    serialNumber: "U7P-0001A2B3",
    macAddress: "A1:B2:C3:D4:E5:F6",
    location: "Bodega principal",
    stock: 24,
    minimumStock: 10,
    status: "IN_STOCK",
    model: "U7 Pro XG",
    supplier: "Proveedor Dtech",
    responsible: "Bodega principal",
    warranty: "12 meses",
    purchaseDate: "2026-06-15",
    unitValue: 249.99,
  },
  {
    id: "2",
    code: "MAT-002",
    name: "Conector RJ45 Cat6",
    category: "Cableado",
    brand: "Generico",
    location: "Bodega principal",
    stock: 7,
    minimumStock: 10,
    status: "IN_STOCK",
    model: "U7 Pro XG",
    supplier: "Proveedor Dtech",
    responsible: "Bodega principal",
    warranty: "12 meses",
    purchaseDate: "2026-06-15",
    unitValue: 249.99,
  },
  {
    id: "3",
    code: "EQ-003",
    name: "Switch 24 puertos",
    category: "Redes",
    brand: "TP-Link",
    serialNumber: "SW24-93842",
    location: "Proyecto Torre 1",
    stock: 1,
    minimumStock: 1,
    status: "ASSIGNED",
    model: "U7 Pro XG",
    supplier: "Proveedor Dtech",
    responsible: "Bodega principal",
    warranty: "12 meses",
    purchaseDate: "2026-06-15",
    unitValue: 249.99,
  },
];

export const mockUsers: User[] = [
  { id: "u1", name: "María Rojas", email: "maria.rojas@dtech.com", role: "ADMIN", active: true, warehouseScope: "Todas las bodegas", lastAccess: "Hoy 09:12" },
  { id: "u2", name: "Juan Pérez", email: "juan.perez@dtech.com", role: "TECHNICIAN", active: true, warehouseScope: "Almacén Principal", lastAccess: "Hoy 08:04" },
  { id: "u3", name: "Ana Solís", email: "ana.solis@dtech.com", role: "TECHNICIAN", active: true, warehouseScope: "Bodega Norte", lastAccess: "Ayer 17:40" },
  { id: "u4", name: "Luis Vargas", email: "luis.vargas@dtech.com", role: "WAREHOUSE", active: true, warehouseScope: "Bodega Norte · Sur", lastAccess: "Hoy 07:22" },
  { id: "u5", name: "Roberto Torres", email: "roberto.torres@dtech.com", role: "TECHNICIAN", active: false, warehouseScope: "Bodega Sur", lastAccess: "12/03 10:31" },
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

// --- Permisos por rol ---
export const permissionDefinitions: PermissionDefinition[] = [
  { key: "viewInventory", label: "Consultar inventario" },
  { key: "registerExitsReturns", label: "Registrar salidas y devoluciones" },
  { key: "registerInstallations", label: "Registrar instalaciones" },
  { key: "createEditEquipment", label: "Crear o editar equipos" },
  { key: "approveTransfers", label: "Aprobar traslados entre bodegas" },
  { key: "viewExecutiveReports", label: "Ver reportes ejecutivos" },
];

export const mockRolePermissions: RolePermissionsMap = {
  ADMIN: {
    viewInventory: true,
    registerExitsReturns: true,
    registerInstallations: true,
    createEditEquipment: true,
    approveTransfers: true,
    viewExecutiveReports: true,
  },
  WAREHOUSE: {
    viewInventory: true,
    registerExitsReturns: true,
    registerInstallations: false,
    createEditEquipment: false,
    approveTransfers: true,
    viewExecutiveReports: false,
  },
  TECHNICIAN: {
    viewInventory: true,
    registerExitsReturns: true,
    registerInstallations: true,
    createEditEquipment: false,
    approveTransfers: false,
    viewExecutiveReports: false,
  },
};

// --- Dashboard ---
export const mockDashboardMetrics: DashboardMetric[] = [
  { label: "Equipos en bodega", value: "1,842", helper: "+4,2% vs. mes anterior", helperColor: "positive" },
  { label: "En proyectos", value: "638", helper: "17 proyectos activos", helperColor: "neutral" },
  { label: "Por devolver", value: "54", helper: "12 con más de 15 días", helperColor: "warning" },
  { label: "Bajo stock mínimo", value: "7", helper: "Requieren reposición", helperColor: "negative" },
];

export const mockWeeklyMovements: WeeklyMovement[] = [
  { week: "Sem 14", exits: 60, returns: 25 },
  { week: "Sem 15", exits: 70, returns: 30 },
  { week: "Sem 16", exits: 45, returns: 22 },
  { week: "Sem 17", exits: 85, returns: 35 },
  { week: "Sem 18", exits: 75, returns: 40 },
  { week: "Sem 19", exits: 68, returns: 28 },
];

export const mockAlerts: AlertItem[] = [
  { id: "a1", title: "Conector RJ45 bajo mínimo", subtitle: "45 de 100 · Almacén Principal", severity: "critical" },
  { id: "a2", title: "Cable UTP Cat6 bajo mínimo", subtitle: "2 rollos de 8 · Bodega Norte", severity: "critical" },
  { id: "a3", title: "12 devoluciones vencidas", subtitle: "Más de 15 días fuera de bodega", severity: "warning" },
  { id: "a4", title: "3 equipos sin ubicación", subtitle: "Último movimiento sin cierre", severity: "warning" },
  { id: "a5", title: "Auditoría de Bodega Sur", subtitle: "Programada para el 28/08", severity: "info" },
];

// --- Reportes ---
export const mockReportMetrics: ReportMetric[] = [
  { label: "Rotación de inventario", value: "3,4x", helper: "+0,6 vs. trimestre anterior", helperColor: "positive" },
  { label: "Tiempo medio fuera de bodega", value: "11,2 d", helper: "+1,8 d vs. trimestre anterior", helperColor: "negative" },
  { label: "Merma registrada", value: "1,7%", helper: "42 unidades · daño o pérdida" },
];

export const mockProjectConsumption: ProjectConsumption[] = [
  { projectName: "Plaza Central · CCTV", units: 186 },
  { projectName: "TORRE 1 · Instalación de Red", units: 124 },
  { projectName: "Hotel Vista Mar · Wi-Fi", units: 96 },
  { projectName: "Oficinas Dtech · Control de Acceso", units: 52 },
  { projectName: "Otros (13 proyectos)", units: 180 },
];

export const mockCategoryStock: CategoryStock[] = [
  { category: "Redes", units: 1141, color: "#1B2A6B" },
  { category: "Consumibles", units: 620, color: "#F5B301" },
  { category: "CCTV", units: 422, color: "#3B82F6" },
  { category: "Control de acceso y otros", units: 297, color: "#D1D5DB" },
];

export const mockSavedReports: SavedReport[] = [
  { id: "r1", name: "Existencias por bodega", frequency: "Semanal · lunes", recipients: 4, lastGenerated: "2025-05-18", formats: ["PDF", "XLSX"] },
  { id: "r2", name: "Movimientos por técnico", frequency: "Mensual · día 1", recipients: 2, lastGenerated: "2025-05-01", formats: ["XLSX"] },
  { id: "r3", name: "Equipos por devolver", frequency: "Diario · 07:00", recipients: 6, lastGenerated: "2025-05-23", formats: ["PDF"] },
];