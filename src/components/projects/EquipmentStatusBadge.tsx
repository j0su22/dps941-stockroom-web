import type { AssignedEquipmentStatus } from "@/types/projectDetail";

const STATUS_STYLES: Record<AssignedEquipmentStatus, { label: string; classes: string }> = {
  INSTALADO: { label: "INSTALADO", classes: "bg-green-100 text-green-700" },
  EN_SITIO: { label: "EN SITIO", classes: "bg-blue-100 text-blue-700" },
  CONSUMIDO: { label: "CONSUMIDO", classes: "bg-gray-100 text-gray-600" },
  POR_DEVOLVER: { label: "POR DEVOLVER", classes: "bg-amber-100 text-amber-700" },
};

export default function EquipmentStatusBadge({ status }: { status: AssignedEquipmentStatus }) {
  const style = STATUS_STYLES[status];
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${style.classes}`}>
      {style.label}
    </span>
  );
}