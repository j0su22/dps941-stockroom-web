import type { Movement } from "@/types/movement";

export const mockMovements: Movement[] = [
  {
    id: "MOV-001",
    type: "ENTRY",
    equipmentId: "1",
    quantity: 24,
    origin: "Proveedor",
    destination: "Bodega principal",
    responsibleUserId: "USR-001",
    responsibleName: "Encargado de bodega",
    date: "2026-06-15T09:30:00",
  },
  {
    id: "MOV-002",
    type: "EXIT",
    equipmentId: "1",
    quantity: 2,
    origin: "Bodega principal",
    destination: "Proyecto Torre 1",
    projectId: "PR-001",
    responsibleUserId: "USR-001",
    responsibleName: "Encargado de bodega",
    date: "2026-07-02T10:15:00",
  },
];