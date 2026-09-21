import type { Movement } from "@/types/movement";
import type { Equipment } from "@/types/equipment";

interface Props {
  movements: Movement[];
  equipment: Equipment[];
}

const movementLabels = {
  ENTRY: "Entrada",
  EXIT: "Salida",
  RETURN: "Devolución",
  TRANSFER: "Traslado",
};

export default function MovementTable({
  movements,
  equipment,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-left text-sm text-gray-900">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="px-5 py-4">Folio</th>
            <th className="px-5 py-4">Tipo</th>
            <th className="px-5 py-4">Equipo</th>
            <th className="px-5 py-4">Origen → Destino</th>
            <th className="px-5 py-4">Cantidad</th>
            <th className="px-5 py-4">Responsable</th>
            <th className="px-5 py-4">Fecha</th>
          </tr>
        </thead>

        <tbody>
          {movements.map((movement) => {
            const item = equipment.find(
              (equipment) => equipment.id === movement.equipmentId
            );

            return (
              <tr
                key={movement.id}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="px-5 py-4 font-medium">
                  {movement.id}
                </td>

                <td className="px-5 py-4">
                  {movementLabels[movement.type]}
                </td>

                <td className="px-5 py-4">
                  {item?.name ?? "Equipo no encontrado"}
                </td>

                <td className="px-5 py-4">
                  {movement.origin} → {movement.destination}
                </td>

                <td className="px-5 py-4">
                  {movement.quantity}
                </td>

                <td className="px-5 py-4">
                  {movement.responsibleName}
                </td>

                <td className="px-5 py-4">
                  {new Date(movement.date).toLocaleDateString("es-SV")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}