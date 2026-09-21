"use client";

import { useMemo, useState } from "react";
import type { Equipment, EquipmentStatus } from "@/types/equipment";
import EquipmentTable from "./EquipmentTable";

interface InventoryViewProps {
  equipment: Equipment[];
}

type FilterStatus = "ALL" | "LOW_STOCK" | EquipmentStatus;

export default function InventoryView({ equipment }: InventoryViewProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<FilterStatus>("ALL");

  const filteredEquipment = useMemo(() => {
    const term = search.toLowerCase().trim();

    return equipment.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(term) ||
        item.code.toLowerCase().includes(term) ||
        item.serialNumber?.toLowerCase().includes(term);

      const matchesStatus =
        status === "ALL"
            ? true
            : status === "LOW_STOCK"
            ? item.stock <= item.minimumStock
            : item.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [equipment, search, status]);

  return (
    <>
      <div className="mb-5 flex flex-col gap-3 md:flex-row">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar equipo, código o serie..."
          className="w-full max-w-md rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900"
        />

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as FilterStatus)
          }
          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900"
        >
          <option value="ALL">Todos</option>
          <option value="IN_STOCK">En bodega</option>
          <option value="ASSIGNED">En proyecto</option>
          <option value="LOW_STOCK">Stock bajo</option>
          <option value="MAINTENANCE">Mantenimiento</option>
        </select>
      </div>

      <p className="mb-3 text-sm text-gray-600">
        {filteredEquipment.length} resultado(s)
      </p>

      <EquipmentTable equipment={filteredEquipment} />
    </>
  );
}