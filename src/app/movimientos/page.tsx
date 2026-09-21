import MovementsView from "@/components/movements/MovementsView";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function MovementsPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Movimientos
          </h1>

          <p className="mt-1 text-gray-600">
            Historial de entradas, salidas, devoluciones y traslados.
          </p>
        </div>

        <MovementsView />
      </div>
    </DashboardLayout>
  );
}