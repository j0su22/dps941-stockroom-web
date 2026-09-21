import type { TraceabilityEvent } from "@/types/traceability";

interface Props {
  events: TraceabilityEvent[];
}

export default function TraceabilityTimeline({ events }: Props) {
  if (events.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No existen movimientos registrados para este equipo.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {events.map((event) => (
        <div
          key={event.id}
          className="relative border-l-2 border-gray-200 pl-6"
        >
          <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-gray-900" />

          <div className="flex flex-col justify-between gap-1 md:flex-row">
            <h3 className="font-semibold text-gray-900">
              {event.title}
            </h3>

            <time className="text-sm text-gray-500">
              {new Date(event.date).toLocaleDateString("es-SV")}
            </time>
          </div>

          <p className="mt-1 text-sm text-gray-600">
            {event.description}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Responsable: {event.responsible}
          </p>
        </div>
      ))}
    </div>
  );
}