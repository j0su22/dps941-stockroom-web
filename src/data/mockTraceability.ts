import type { TraceabilityEvent } from "@/types/traceability";

export const mockTraceability: TraceabilityEvent[] = [
  {
    id: "TR-001",
    equipmentId: "1",
    type: "ENTRY",
    title: "Ingreso a inventario",
    description: "Equipo recibido en bodega principal.",
    date: "2026-06-15T09:30:00",
    responsible: "Encargado de bodega",
  },
  {
    id: "TR-002",
    equipmentId: "1",
    type: "ASSIGNMENT",
    title: "Asignación a proyecto",
    description: "Equipo asignado al proyecto Torre 1.",
    date: "2026-07-02T10:15:00",
    responsible: "Administrador",
  },
  {
    id: "TR-003",
    equipmentId: "1",
    type: "RETURN",
    title: "Devolución a bodega",
    description: "Equipo retornado a bodega principal.",
    date: "2026-07-20T16:40:00",
    responsible: "Técnico de campo",
  },
];