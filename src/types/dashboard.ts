export interface DashboardMetric {
  label: string;
  value: string;
  helper: string;
  helperColor?: "positive" | "negative" | "neutral" | "warning";
}

export interface WeeklyMovement {
  week: string;
  exits: number;
  returns: number;
}

export interface AlertItem {
  id: string;
  title: string;
  subtitle: string;
  severity: "critical" | "warning" | "info";
}