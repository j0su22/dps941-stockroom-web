import { mockDashboardMetrics, mockWeeklyMovements, mockAlerts } from "@/data/mockData";
import type { DashboardMetric, WeeklyMovement, AlertItem } from "@/types/dashboard";

export interface DashboardData {
  metrics: DashboardMetric[];
  weeklyMovements: WeeklyMovement[];
  alerts: AlertItem[];
}

export async function getDashboardData(): Promise<DashboardData> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    metrics: mockDashboardMetrics,
    weeklyMovements: mockWeeklyMovements,
    alerts: mockAlerts,
  };
}