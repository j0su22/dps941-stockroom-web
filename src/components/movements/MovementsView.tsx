"use client";

import { useState } from "react";
import MovementTable from "./MovementTable";
import { useInventory } from "@/context/InventoryContext";
import type { MovementType } from "@/types/movement";
import Link from "next/link";

export default function MovementsView() {
  const {
    equipment,
    movements,
    registerMovement,
  } = useInventory();

  const [equipmentId, setEquipmentId] = useState("");
  const [type, setType] = useState<MovementType>("EXIT");
  const [quantity, setQuantity] = useState(1);
  const [destination, setDestination] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const selectedEquipment = equipment.find(
    (item) => item.id === equipmentId
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const result = registerMovement({
      type,
      equipmentId,
      quantity,
      destination,
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    setSuccess(result.message);
    setQuantity(1);
    setDestination("");
  }

  return (
    <>
      <Link
        href="/inventario"
        className="mb-4 inline-block text-sm font-medium text-blue-600 hover:underline"
      >
        ← Ir a inventario
      </Link>
      <form
        onSubmit={handleSubmit}
        className="mb-8 grid gap-4 rounded-xl border border-gray-200 bg-white p-6 md:grid-cols-2 lg:grid-cols-4"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">
            Equipo
          </label>

          <select
            value={equipmentId}
            onChange={(e) => setEquipmentId(e.target.value)}
            className="w-full rounded-lg border p-2.5"
          >
            <option value="">Seleccionar...</option>

            {equipment.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {selectedEquipment && (
            <p className="mt-1 text-xs text-gray-500">
              Disponible: {selectedEquipment.stock}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Tipo
          </label>

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value as MovementType)
            }
            className="w-full rounded-lg border p-2.5"
          >
            <option value="ENTRY">Entrada</option>
            <option value="EXIT">Salida</option>
            <option value="RETURN">Devolución</option>
            <option value="TRANSFER">Traslado</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Cantidad
          </label>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full rounded-lg border p-2.5"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Destino
          </label>

          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Proyecto o ubicación"
            className="w-full rounded-lg border p-2.5"
          />
        </div>

        <div className="md:col-span-2 lg:col-span-4">
          {error && (
            <p className="mb-3 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p className="mb-3 text-sm font-medium text-green-700">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="rounded-lg bg-gray-900 px-5 py-2.5 font-medium text-white"
          >
            Registrar movimiento
          </button>
        </div>
      </form>

      <MovementTable
        movements={movements}
        equipment={equipment}
      />
    </>
  );
}