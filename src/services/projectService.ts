import { mockProjects } from "@/data/mockData";
import type { Project } from "@/types/project";
import { mockProjectDetails } from "@/data/mockData";
import type { ProjectDetail } from "@/types/projectDetail";

// Simula una llamada a la API REST con un pequeño delay.
// Cuando exista el backend real, aquí adentro se reemplaza por un fetch()
// al endpoint correspondiente, sin tener que tocar el resto de la app.
export async function getProjects(): Promise<Project[]> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return mockProjects;
}

export async function getProjectById(id: string): Promise<Project | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockProjects.find((p) => p.id === id) ?? null;
}

export async function getProjectDetail(id: string): Promise<ProjectDetail> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return (
    mockProjectDetails[id] ?? {
      projectId: id,
      assignedEquipment: [],
      stages: [],
      team: [],
    }
  );
}