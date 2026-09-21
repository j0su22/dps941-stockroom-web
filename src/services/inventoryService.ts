import { apiFetch } from "./api";
import type { Equipment } from "@/types/equipment";

export const inventoryService = {
  getAll: () =>
    apiFetch<Equipment[]>("/equipment"),

  getById: (id: string) =>
    apiFetch<Equipment>(`/equipment/${id}`),

  update: (id: string, data: Partial<Equipment>) =>
    apiFetch<Equipment>(`/equipment/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
};