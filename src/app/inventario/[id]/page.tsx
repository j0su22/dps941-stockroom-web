"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useInventory } from "@/context/InventoryContext";
import TraceabilityTimeline from "@/components/inventory/TraceabilityTimeline";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function EquipmentDetailPage() {
  const params = useParams<{ id: string }>();
  const { equipment: equipmentList, traceability } = useInventory();

  const equipment = equipmentList.find(
    (item) => item.id === params.id
  );

  if (!equipment) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-6xl">
          <p>Equipo no encontrado.</p>

          <Link
            href="/inventario"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            ← Volver al inventario
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const equipmentTraceability = traceability
    .filter((event) => event.equipmentId === equipment.id)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  const lowStock =
    equipment.stock <= equipment.minimumStock;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl text-gray-900">
        <Link
          href="/inventario"
          className="mb-6 inline-block text-sm text-gray-600 hover:text-gray-900"
        >
          ← Volver al inventario
        </Link>

        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row">
          <div>
            <p className="text-sm text-gray-500">
              {equipment.code}
            </p>

            <h1 className="text-3xl font-bold">
              {equipment.name}
            </h1>

            <p className="mt-1 text-gray-500">
              {equipment.brand} · {equipment.category}
            </p>
          </div>

          {lowStock && (
            <span className="h-fit rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
              Stock bajo
            </span>
          )}
        </div>

        <section className="grid gap-6 rounded-xl border border-gray-200 bg-white p-6 md:grid-cols-2 lg:grid-cols-3">
          <Info label="Modelo" value={equipment.model} />
          <Info label="Serial" value={equipment.serialNumber} />
          <Info label="MAC" value={equipment.macAddress} />
          <Info label="Ubicación" value={equipment.location} />
          <Info label="Responsable" value={equipment.responsible} />
          <Info label="Proveedor" value={equipment.supplier} />
          <Info label="Garantía" value={equipment.warranty} />
          <Info label="Fecha de compra" value={equipment.purchaseDate} />
          <Info label="Existencia" value={String(equipment.stock)} />
          <Info
            label="Stock mínimo"
            value={String(equipment.minimumStock)}
          />
          <Info
            label="Valor unitario"
            value={
              equipment.unitValue
                ? `$${equipment.unitValue.toFixed(2)}`
                : undefined
            }
          />
        </section>

        <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Trazabilidad
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Historial de movimientos y asignaciones del equipo.
            </p>
          </div>

          <TraceabilityTimeline events={equipmentTraceability} />
        </section>
      </div>
    </DashboardLayout>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 font-medium">
        {value || "No registrado"}
      </p>
    </div>
  );
}