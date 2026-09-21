"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import MetricCard from "@/components/dashboard/MetricCard";
import WeeklyMovementsChart from "@/components/dashboard/WeeklyMovementsChart";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const { data, loading, error } = useDashboard();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
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
          {error ?? "No se pudo cargar el panel general."}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Panel general</h1>
          <p className="text-sm text-gray-500">Estado del inventario · actualizado hoy</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {data.metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Movimientos por semana</h2>
            <WeeklyMovementsChart data={data.weeklyMovements} />
          </div>
          <AlertsPanel alerts={data.alerts} />
        </div>
      </div>
    </DashboardLayout>
  );
}