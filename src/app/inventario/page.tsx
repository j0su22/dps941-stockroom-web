"use client";

import InventoryView from "@/components/inventory/InventoryView";
import { useInventory } from "@/context/InventoryContext";

export default function InventoryPage() {
  const { equipment } = useInventory();

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
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

        <InventoryView equipment={equipment} />
      </div>
    </main>
  );
}