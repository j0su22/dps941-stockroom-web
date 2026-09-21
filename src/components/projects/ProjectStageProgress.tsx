import type { ProjectStage } from "@/types/projectDetail";

export default function ProjectStageProgress({ stages }: { stages: ProjectStage[] }) {
  if (stages.length === 0) {
    return <p className="text-sm text-gray-400">Aún no hay etapas registradas.</p>;
  }
  return (
    <div className="flex flex-col gap-4">
      {stages.map((stage) => (
        <div key={stage.name}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">{stage.name}</span>
            <span className="font-semibold text-gray-900">{stage.percentage}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${stage.percentage < 40 ? "bg-amber-400" : "bg-blue-900"}`}
              style={{ width: `${stage.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}