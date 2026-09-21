import type { ProjectConsumption } from "@/types/report";

export default function ProjectConsumptionList({ items }: { items: ProjectConsumption[] }) {
  const max = Math.max(...items.map((i) => i.units), 1);
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <div key={item.projectName}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-700">{item.projectName}</span>
            <span className="font-semibold text-gray-900">{item.units} u.</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-900 rounded-full" style={{ width: `${(item.units / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}