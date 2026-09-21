"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useReports } from "@/hooks/useReports";
import ProjectConsumptionList from "@/components/reports/ProjectConsumptionList";
import CategoryBreakdown from "@/components/reports/CategoryBreakdown";
import SavedReportsTable from "@/components/reports/SavedReportsTable";

const HELPER_COLOR: Record<string, string> = {
  positive: "text-green-600",
  negative: "text-red-600",
};

export default function ReportesPage() {
  const { data, loading, error } = useReports();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </DashboardLayout>
    );
  }

  if (error || !data) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 text-red-700 rounded-lg p-6 text-sm">
          {error ?? "No se pudieron cargar los reportes."}
        </div>
      </DashboardLayout>
    );
  }

  const totalEquipment = data.categories.reduce((sum, c) => sum + c.units, 0);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Reportes</h1>
          <div className="flex gap-2">
            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600">
              <option>Últimos 90 días</option>
              <option>Últimos 30 días</option>
              <option>Este año</option>
            </select>
            <button className="border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Programar envío
            </button>
            <button className="bg-amber-400 hover:bg-amber-500 text-[#1B2A6B] font-semibold text-sm px-4 py-2 rounded-lg">
              Descargar PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.metrics.map((metric) => (
            <div key={metric.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">{metric.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
              <p className={`text-xs mt-1 ${HELPER_COLOR[metric.helperColor ?? ""] ?? "text-gray-500"}`}>
                {metric.helper}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Consumo por proyecto</h2>
            <ProjectConsumptionList items={data.consumption} />
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Existencia por categoría</h2>
            <CategoryBreakdown categories={data.categories} total={totalEquipment} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Reportes guardados</h2>
            <button className="text-blue-900 text-sm font-medium hover:underline">Crear reporte</button>
          </div>
          <SavedReportsTable reports={data.savedReports} />
        </div>
      </div>
    </DashboardLayout>
  );
}