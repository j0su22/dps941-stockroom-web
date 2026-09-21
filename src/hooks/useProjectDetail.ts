"use client";

import { useEffect, useState } from "react";
import { getProjectById, getProjectDetail } from "@/services/projectService";
import type { Project } from "@/types/project";
import type { ProjectDetail } from "@/types/projectDetail";

interface UseProjectDetailResult {
  project: Project | null;
  detail: ProjectDetail | null;
  loading: boolean;
  error: string | null;
}

export function useProjectDetail(id: string): UseProjectDetailResult {
  const [project, setProject] = useState<Project | null>(null);
  const [detail, setDetail] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    Promise.all([getProjectById(id), getProjectDetail(id)])
      .then(([projectData, detailData]) => {
        if (!active) return;
        if (!projectData) {
          setError("Proyecto no encontrado.");
        } else {
          setProject(projectData);
          setDetail(detailData);
        }
      })
      .catch((err) => {
      console.error("Error cargando detalle del proyecto:", err);
      if (active) setError("No se pudo cargar el detalle del proyecto.");
    })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  return { project, detail, loading, error };
}