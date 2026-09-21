import type { Project } from "@/types/project";

const STATUS_STYLES: Record<Project["status"], { label: string; classes: string }> = {
  IN_PROGRESS: { label: "EN CURSO", classes: "bg-blue-100 text-blue-700" },
  DELAYED: { label: "ATRASADO", classes: "bg-red-100 text-red-600" },
  PENDING: { label: "POR INICIAR", classes: "bg-gray-100 text-gray-600" },
  CLOSED: { label: "CERRADO", classes: "bg-green-100 text-green-700" },
};

export default function StatusBadge({ status }: { status: Project["status"] }) {
  const style = STATUS_STYLES[status];
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${style.classes}`}>
      {style.label}
    </span>
  );
}