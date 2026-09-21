import Link from "next/link";
import type { Project } from "@/types/project";
import { mockUsers } from "@/data/mockData";
import StatusBadge from "./StatusBadge";

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export default function ProjectCard({ project }: { project: Project }) {
  const technicians = (project.technicianIds ?? [])
    .map((id) => mockUsers.find((u) => u.id === id))
    .filter(Boolean) as typeof mockUsers;

  const progressBarColor = project.status === "DELAYED" ? "bg-red-500" : "bg-blue-900";

  return (
    <Link
      href={`/proyectos/${project.id}`}
      className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-gray-900 leading-tight">{project.name}</h3>
          <p className="text-sm text-gray-500">{project.client}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-500">Avance</span>
          <span className={`font-semibold ${project.status === "DELAYED" ? "text-red-600" : "text-blue-900"}`}>
            {project.progress}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-full ${progressBarColor} rounded-full`} style={{ width: `${project.progress}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-3 text-sm">
        <div>
          <p className="text-gray-500">Asignados</p>
          <p className="font-semibold text-gray-900">{project.assignedEquipment ?? 0}</p>
        </div>
        <div>
          <p className="text-gray-500">Instalados</p>
          <p className="font-semibold text-gray-900">{project.installedEquipment ?? 0}</p>
        </div>
        <div>
          <p className="text-gray-500">Por devolver</p>
          <p className="font-semibold text-amber-600">{project.toReturnEquipment ?? 0}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-500">
        <div className="flex -space-x-2">
          {technicians.map((tech) => (
            <span
              key={tech.id}
              title={tech.name}
              className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold border-2 border-white"
            >
              {tech.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </span>
          ))}
        </div>
        <span>
          {technicians.length} técnico{technicians.length !== 1 ? "s" : ""}
          {project.endDate ? ` · cierre ${formatDate(project.endDate)}` : ""}
        </span>
      </div>
    </Link>
  );
}