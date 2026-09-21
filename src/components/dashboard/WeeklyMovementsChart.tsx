import type { WeeklyMovement } from "@/types/dashboard";

export default function WeeklyMovementsChart({ data }: { data: WeeklyMovement[] }) {
  const max = Math.max(...data.map((d) => Math.max(d.exits, d.returns)), 1);

  return (
    <div>
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-blue-900 inline-block" /> Salidas
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block" /> Devoluciones
        </span>
      </div>
      <div className="flex items-end gap-6 h-48">
        {data.map((week) => (
          <div key={week.week} className="flex flex-col items-center gap-2 flex-1">
            <div className="flex items-end gap-1 h-40 w-full justify-center">
              <div
                className="w-4 bg-blue-900 rounded-t"
                style={{ height: `${(week.exits / max) * 100}%` }}
                title={`Salidas: ${week.exits}`}
              />
              <div
                className="w-4 bg-amber-400 rounded-t"
                style={{ height: `${(week.returns / max) * 100}%` }}
                title={`Devoluciones: ${week.returns}`}
              />
            </div>
            <span className="text-xs text-gray-400">{week.week}</span>
          </div>
        ))}
      </div>
    </div>
  );
}