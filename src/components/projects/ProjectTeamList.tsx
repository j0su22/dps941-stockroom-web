import { mockUsers } from "@/data/mockData";
import type { ProjectTeamMember } from "@/types/projectDetail";

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2);
}

const ROLE_LABEL: Record<string, string> = {
  ADMIN: "Supervisora",
  WAREHOUSE: "Bodeguero",
  TECHNICIAN: "Técnico",
};

export default function ProjectTeamList({ team }: { team: ProjectTeamMember[] }) {
  if (team.length === 0) {
    return <p className="text-sm text-gray-400">Sin técnicos asignados todavía.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {team.map((member) => {
        const user = mockUsers.find((u) => u.id === member.userId);
        if (!user) return null;
        return (
          <li key={member.userId} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center text-sm">
                {initials(user.name)}
              </span>
              <div>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{ROLE_LABEL[user.role] ?? user.role}</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">
              {member.movementsCount > 0 ? `${member.movementsCount} mov.` : "—"}
            </span>
          </li>
        );
      })}
    </ul>
  );
}