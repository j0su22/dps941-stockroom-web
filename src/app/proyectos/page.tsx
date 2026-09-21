"use client";

import { useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProjectCard from "@/components/projects/ProjectCard";
import { useProjects } from "@/hooks/useProjects";
import type { Project } from "@/types/project";

const TABS: { label: string; statuses: Project["status"][] }[] = [
  { label: "En ejecución", statuses: ["IN_PROGRESS", "DELAYED"] },
  { label: "Por iniciar", statuses: ["PENDING"] },
  { label: "Cerrados", statuses: ["CLOSED"] },
];

export default function ProyectosPage() {
  const { projects, loading, error } = useProjects();
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const allowedStatuses = TABS[activeTab].statuses;
    return projects.filter((p) => {
      const matchesTab = allowedStatuses.includes(p.status);
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.client.toLowerCase().includes(search.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [projects, activeTab, search]);

  const activeCount = projects.filter((p) => p.status === "IN_PROGRESS" || p.status === "DELAYED").length;
  const totalAssigned = projects.reduce((sum, p) => sum + (p.assignedEquipment ?? 0), 0);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar proyecto o cliente..."
            className="w-full max-w-sm rounded-lg border border-gray-200 px-4 py-2 text-sm"
          />
          <button className="bg-amber-400 hover:bg-amber-500 text-[#1B2A6B] font-semibold text-sm px-4 py-2 rounded-lg">
            Nuevo proyecto
          </button>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">Proyectos</h1>
          <p className="text-sm text-gray-500">
            {activeCount} activos · {totalAssigned} equipos asignados
          </p>
        </div>

        <div className="flex gap-2">
          {TABS.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === index ? "bg-blue-900 text-white" : "bg-white border border-gray-200 text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-50 text-red-700 rounded-lg p-4 text-sm">{error}</div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">
            No hay proyectos que coincidan con la búsqueda o el filtro seleccionado.
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            <button className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 text-blue-900 py-10 hover:bg-blue-50 transition-colors">
              <span className="text-2xl">+</span>
              <span className="font-semibold">Crear nuevo proyecto</span>
              <span className="text-xs text-gray-400 px-6 text-center">
                Definí cliente, fechas y equipos previstos.
              </span>
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}