import type { DashboardMetric } from "@/types/dashboard";

const HELPER_COLOR: Record<NonNullable<DashboardMetric["helperColor"]>, string> = {
  positive: "text-green-600",
  negative: "text-red-600",
  warning: "text-amber-600",
  neutral: "text-gray-500",
};

export default function MetricCard({ metric }: { metric: DashboardMetric }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-sm text-gray-500">{metric.label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
      <p className={`text-xs mt-1 ${HELPER_COLOR[metric.helperColor ?? "neutral"]}`}>{metric.helper}</p>
    </div>
  );
}