import Link from "next/link";
import { notFound } from "next/navigation";
import { mockEquipment } from "@/data/mockData";
import TraceabilityTimeline from "@/components/inventory/TraceabilityTimeline";
import { mockTraceability } from "@/data/mockTraceability";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EquipmentDetailPage({ params }: Props) {
  const { id } = await params;

  const equipment = mockEquipment.find((item) => item.id === id);
  const traceability = mockTraceability
    .filter((event) => event.equipmentId === equipment.id)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  if (!equipment) {
    notFound();
  }

  const lowStock = equipment.stock <= equipment.minimumStock;

  return (
    <main className="min-h-screen bg-gray-50 p-6 text-gray-900 md:p-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/inventario"
          className="mb-6 inline-block text-sm text-gray-600 hover:text-gray-900"
        >
          ← Volver al inventario
        </Link>

        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row">
          <div>
            <p className="text-sm text-gray-500">{equipment.code}</p>

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

          <Info
            label="Existencia"
            value={String(equipment.stock)}
          />

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

          <TraceabilityTimeline events={traceability} />
        </section>
      </div>
    </main>
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
      <p className="mt-1 font-medium">{value || "No registrado"}</p>
    </div>
  );
}