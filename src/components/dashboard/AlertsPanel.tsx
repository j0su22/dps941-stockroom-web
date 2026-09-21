import Link from "next/link";
import type { AlertItem } from "@/types/dashboard";

const SEVERITY_COLOR: Record<AlertItem["severity"], string> = {
  critical: "border-red-500",
  warning: "border-amber-400",
  info: "border-blue-900",
};

export default function AlertsPanel({ alerts }: { alerts: AlertItem[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-gray-900">Requiere atención</h2>
      {alerts.length === 0 ? (
        <p className="text-sm text-gray-400">Todo en orden, sin alertas pendientes.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {alerts.map((alert) => (
            <li key={alert.id} className={`border-l-4 pl-3 ${SEVERITY_COLOR[alert.severity]}`}>
              <p className="text-sm font-medium text-gray-900">{alert.title}</p>
              <p className="text-xs text-gray-500">{alert.subtitle}</p>
            </li>
          ))}
        </ul>
      )}
      <Link
        href="/alertas"
        className="text-center border border-blue-900 text-blue-900 rounded-lg py-2 text-sm font-medium hover:bg-blue-50"
      >
        Ver todas las alertas
      </Link>
    </div>
  );
}