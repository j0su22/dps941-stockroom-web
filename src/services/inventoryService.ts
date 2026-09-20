import { apiFetch } from "./api";
import type { Equipment } from "@/types/equipment";

export const inventoryService = {
  getAll: () => apiFetch<Equipment[]>("/equipment"),
  getById: (id: string) => apiFetch<Equipment>(`/equipment/${id}`),
};
