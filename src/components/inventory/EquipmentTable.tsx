import Link from "next/link";
import type { Equipment } from "@/types/equipment";

interface EquipmentTableProps {
  equipment: Equipment[];
}

const statusLabels = {
  IN_STOCK: "En bodega",
  ASSIGNED: "En proyecto",
  MAINTENANCE: "Mantenimiento",
};

export default function EquipmentTable({
  equipment,
}: EquipmentTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-left text-sm text-gray-900">
        <thead className="border-b bg-gray-50 text-gray-600">
          <tr>
            <th className="px-5 py-4">Equipo</th>
            <th className="px-5 py-4">Código</th>
            <th className="px-5 py-4">Categoría</th>
            <th className="px-5 py-4">Ubicación</th>
            <th className="px-5 py-4">Existencia</th>
            <th className="px-5 py-4">Estado</th>
          </tr>
        </thead>

        <tbody>
          {equipment.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
            >
              <td className="px-5 py-4 font-medium">
                <Link
                  href={`/inventario/${item.id}`}
                  className="hover:underline"
                >
                  {item.name}
                </Link>
              </td>

              <td className="px-5 py-4">{item.code}</td>
              <td className="px-5 py-4">{item.category}</td>
              <td className="px-5 py-4">{item.location}</td>

              <td className="px-5 py-4">
                <span
                  className={
                    item.stock <= item.minimumStock
                      ? "font-semibold text-red-600"
                      : ""
                  }
                >
                  {item.stock}
                </span>
              </td>

              <td className="px-5 py-4">
                {statusLabels[item.status]}
              </td>
              <td className="px-5 py-4">
                <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        item.status === "ASSIGNED"
                        ? "bg-blue-100 text-blue-700"
                        : item.status === "IN_STOCK"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                    }`}
                >
                    {statusLabels[item.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}