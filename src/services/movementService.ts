import { apiFetch } from "./api";
import type { Movement } from "@/types/movement";

export const movementService = {
  getAll: () =>
    apiFetch<Movement[]>("/movements"),

  create: (movement: Movement) =>
    apiFetch<Movement>("/movements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movement),
    }),
};