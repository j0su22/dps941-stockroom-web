"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatusBadge from "@/components/projects/StatusBadge";
import EquipmentStatusBadge from "@/components/projects/EquipmentStatusBadge";
import ProjectStageProgress from "@/components/projects/ProjectStageProgress";
import ProjectTeamList from "@/components/projects/ProjectTeamList";
import { useProjectDetail } from "@/hooks/useProjectDetail";
import { mockUsers } from "@/data/mockData";

const TABS = ["Equipos asignados", "Movimientos", "Documentos"] as const;

function formatDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { project, detail, loading, error } = useProjectDetail(id);
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Equipos asignados");

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col gap-4">
          <div className="h-6 w-64 bg-gray-100 rounded animate-pulse" />
          <div className="h-32 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !project || !detail) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 text-red-700 rounded-lg p-6 text-sm">
          {error ?? "No se encontró el proyecto solicitado."}
          <div className="mt-3">
            <Link href="/proyectos" className="text-blue-900 font-medium underline">
              Volver a Proyectos
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav className="text-sm text-gray-500">
            <Link href="/proyectos" className="hover:underline">
              Proyectos
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900 font-medium">{project.name}</span>
          </nav>
          <div className="flex gap-2">
            <button className="border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Exportar acta
            </button>
            <button className="bg-amber-400 hover:bg-amber-500 text-[#1B2A6B] font-semibold text-sm px-4 py-2 rounded-lg">
              Asignar equipos
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-gray-900">{project.name}</h1>
              <StatusBadge status={project.status} />
            </div>
            <p className="text-sm text-gray-500">
              {project.client}
              {project.location ? ` · ${project.location}` : ""} · {formatDate(project.startDate)}
              {project.endDate ? ` – ${formatDate(project.endDate)}` : ""}
            </p>
          </div>
          <div className="flex gap-8">
            <div>
              <p className="text-xs text-gray-500">Avance</p>
              <p className={`text-lg font-bold ${project.status === "DELAYED" ? "text-red-600" : "text-blue-900"}`}>
                {project.progress}%
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Asignados</p>
              <p className="text-lg font-bold text-gray-900">{project.assignedEquipment ?? 0}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Instalados</p>
              <p className="text-lg font-bold text-gray-900">{project.installedEquipment ?? 0}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Por devolver</p>
              <p className="text-lg font-bold text-amber-600">{project.toReturnEquipment ?? 0}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex gap-6 border-b border-gray-100 mb-4">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium border-b-2 -mb-px ${
                    activeTab === tab ? "border-blue-900 text-blue-900" : "border-transparent text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "Equipos asignados" &&
              (detail.assignedEquipment.length === 0 ? (
                <p className="text-sm text-gray-400 py-8 text-center">
                  Todavía no hay equipos asignados a este proyecto.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 border-b border-gray-100">
                        <th className="py-2 font-medium">Equipo</th>
                        <th className="py-2 font-medium">Serie</th>
                        <th className="py-2 font-medium">Cant.</th>
                        <th className="py-2 font-medium">Técnico</th>
                        <th className="py-2 font-medium">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detail.assignedEquipment.map((item) => {
                        const tech = mockUsers.find((u) => u.id === item.technicianId);
                        return (
                          <tr key={item.id} className="border-b border-gray-50">
                            <td className="py-3 font-medium text-gray-900">{item.equipmentName}</td>
                            <td className="py-3 text-gray-500">{item.serialNumber ?? "–"}</td>
                            <td className="py-3 text-gray-900">{item.quantity}</td>
                            <td className="py-3 text-gray-700">{tech?.name ?? "—"}</td>
                            <td className="py-3">
                              <EquipmentStatusBadge status={item.status} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ))}

            {activeTab === "Movimientos" && (
              <p className="text-sm text-gray-400 py-8 text-center">
                El historial de movimientos de este proyecto se integrará con el módulo de Movimientos.
              </p>
            )}

            {activeTab === "Documentos" && (
              <p className="text-sm text-gray-400 py-8 text-center">
                Aún no hay documentos cargados para este proyecto.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Avance por etapa</h2>
              <ProjectStageProgress stages={detail.stages} />
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Equipo de trabajo</h2>
              <ProjectTeamList team={detail.team} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}