import { mockProjects } from "@/data/mockData";
import type { Project } from "@/types/project";

// Simula una llamada a la API REST con un pequeño delay.
// Cuando exista el backend real, aquí adentro se reemplaza por un fetch()
// al endpoint correspondiente, sin tener que tocar el resto de la app.
export async function getProjects(): Promise<Project[]> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return mockProjects;
}