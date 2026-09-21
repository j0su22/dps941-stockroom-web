// Tipos específicos de la vista de Detalle de proyecto.
// Se mantienen separados de types/project.ts porque son datos que en el
// backend real probablemente vengan de otros endpoints (equipos asignados
// se derivaría de Movement + Equipment filtrando por projectId).

export type AssignedEquipmentStatus = "INSTALADO" | "EN_SITIO" | "CONSUMIDO" | "POR_DEVOLVER";

export interface ProjectAssignedEquipment {
  id: string;
  equipmentName: string;
  serialNumber?: string;
  quantity: number;
  technicianId: string;
  status: AssignedEquipmentStatus;
}

export interface ProjectStage {
  name: string;
  percentage: number;
}

export interface ProjectTeamMember {
  userId: string;
  movementsCount: number;
}

export interface ProjectDetail {
  projectId: string;
  assignedEquipment: ProjectAssignedEquipment[];
  stages: ProjectStage[];
  team: ProjectTeamMember[];
}