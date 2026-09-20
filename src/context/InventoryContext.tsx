"use client";
import { createContext, useState, type ReactNode } from "react";
import type { Equipment } from "@/types/equipment";

export const InventoryContext = createContext<{
  equipment: Equipment[];
  setEquipment: React.Dispatch<React.SetStateAction<Equipment[]>>;
} | undefined>(undefined);

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  return <InventoryContext.Provider value={{ equipment, setEquipment }}>{children}</InventoryContext.Provider>;
}
