"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { Equipment } from "@/types/equipment";
import type { Movement, MovementType } from "@/types/movement";
import type { TraceabilityEvent } from "@/types/traceability";

import { mockEquipment } from "@/data/mockData";
import { mockMovements } from "@/data/mockMovements";
import { mockTraceability } from "@/data/mockTraceability";

interface RegisterMovementData {
  type: MovementType;
  equipmentId: string;
  quantity: number;
  destination: string;
}

interface RegisterMovementResult {
  success: boolean;
  message: string;
}

interface InventoryContextType {
  equipment: Equipment[];
  movements: Movement[];
  traceability: TraceabilityEvent[];

  registerMovement: (
    data: RegisterMovementData
  ) => RegisterMovementResult;
}

const InventoryContext = createContext<
  InventoryContextType | undefined
>(undefined);

export function InventoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [equipment, setEquipment] =
    useState<Equipment[]>(mockEquipment);

  const [movements, setMovements] =
    useState<Movement[]>(mockMovements);

  const [traceability, setTraceability] =
    useState<TraceabilityEvent[]>(mockTraceability);

  function registerMovement(
    data: RegisterMovementData
  ): RegisterMovementResult {
    const { type, equipmentId, quantity, destination } = data;

    const selectedEquipment = equipment.find(
      (item) => item.id === equipmentId
    );

    // Validación: equipo existente
    if (!selectedEquipment) {
      return {
        success: false,
        message: "El equipo seleccionado no existe.",
      };
    }

    // Validación: cantidad
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return {
        success: false,
        message: "La cantidad debe ser mayor que cero.",
      };
    }

    // Validación: stock para salidas
    if (
      type === "EXIT" &&
      quantity > selectedEquipment.stock
    ) {
      return {
        success: false,
        message: `Stock insuficiente. Disponible: ${selectedEquipment.stock}.`,
      };
    }

    // Salida y traslado necesitan destino
    if (
      (type === "EXIT" || type === "TRANSFER") &&
      !destination.trim()
    ) {
      return {
        success: false,
        message: "Debes indicar el destino del movimiento.",
      };
    }

    // No permitir traslado hacia la misma ubicación
    if (
      type === "TRANSFER" &&
      destination.trim().toLowerCase() ===
        selectedEquipment.location.trim().toLowerCase()
    ) {
      return {
        success: false,
        message:
          "El destino debe ser diferente a la ubicación actual.",
      };
    }

    const origin =
      type === "ENTRY"
        ? "Proveedor"
        : selectedEquipment.location;

    const finalDestination =
      type === "ENTRY" || type === "RETURN"
        ? "Bodega principal"
        : destination.trim();

    // Actualizar inventario
    setEquipment((current) =>
      current.map((item) => {
        if (item.id !== equipmentId) {
          return item;
        }

        if (type === "ENTRY" || type === "RETURN") {
          return {
            ...item,
            stock: item.stock + quantity,
          };
        }

        if (type === "EXIT") {
          return {
            ...item,
            stock: item.stock - quantity,
          };
        }

        if (type === "TRANSFER") {
          return {
            ...item,
            location: finalDestination,
          };
        }

        return item;
      })
    );

    const movementId = `MOV-${Date.now()}`;
    const date = new Date().toISOString();

    // Registrar movimiento
    const newMovement: Movement = {
      id: movementId,
      type,
      equipmentId,
      quantity,
      origin,
      destination: finalDestination,
      responsibleUserId: "USR-001",
      responsibleName: "Encargado de bodega",
      date,
    };

    setMovements((current) => [
      newMovement,
      ...current,
    ]);

    // Generar trazabilidad automáticamente
    const traceabilityData = getTraceabilityData(
      type,
      origin,
      finalDestination,
      quantity
    );

    const newTraceabilityEvent: TraceabilityEvent = {
      id: `TR-${Date.now()}`,
      equipmentId,
      type,
      title: traceabilityData.title,
      description: traceabilityData.description,
      date,
      responsible: "Encargado de bodega",
    };

    setTraceability((current) => [
      newTraceabilityEvent,
      ...current,
    ]);

    return {
      success: true,
      message: "Movimiento registrado correctamente.",
    };
  }

  return (
    <InventoryContext.Provider
      value={{
        equipment,
        movements,
        traceability,
        registerMovement,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);

  if (!context) {
    throw new Error(
      "useInventory debe utilizarse dentro de InventoryProvider."
    );
  }

  return context;
}

function getTraceabilityData(
  type: MovementType,
  origin: string,
  destination: string,
  quantity: number
) {
  switch (type) {
    case "ENTRY":
      return {
        title: "Ingreso a inventario",
        description: `Ingreso de ${quantity} unidad(es) desde ${origin}.`,
      };

    case "EXIT":
      return {
        title: "Salida de inventario",
        description: `Salida de ${quantity} unidad(es) desde ${origin} hacia ${destination}.`,
      };

    case "RETURN":
      return {
        title: "Devolución a bodega",
        description: `Devolución de ${quantity} unidad(es) a ${destination}.`,
      };

    case "TRANSFER":
      return {
        title: "Traslado de equipo",
        description: `Traslado desde ${origin} hacia ${destination}.`,
      };
  }
}