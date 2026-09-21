"use client";

import InventoryView from "@/components/inventory/InventoryView";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useInventory } from "@/context/InventoryContext";

export default function InventoryPage() {
  const { equipment } = useInventory();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Inventario
            </h1>

            <p className="mt-1 text-gray-600">
              {equipment.length} registros en inventario
            </p>
          </div>

          <div className="flex gap-2">
            <button className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-900">
              Importar CSV
            </button>

            <button className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-900">
              Exportar CSV
            </button>
          </div>
        </div>

        <InventoryView />
      </div>
    </DashboardLayout>
  );
}