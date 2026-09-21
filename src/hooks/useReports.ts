"use client";

import { useEffect, useState } from "react";
import { getReportData } from "@/services/reportService";
import type { ReportData } from "@/services/reportService";

export function useReports() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getReportData()
      .then((result) => {
        if (active) setData(result);
      })
      .catch(() => {
        if (active) setError("No se pudieron cargar los reportes.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { data, loading, error };
}