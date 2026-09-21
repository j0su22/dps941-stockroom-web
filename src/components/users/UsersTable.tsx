import type { User, UserRole } from "@/types/user";

const ROLE_LABEL: Record<UserRole, string> = {
  ADMIN: "Supervisora",
  WAREHOUSE: "Bodeguero",
  TECHNICIAN: "Técnico",
};

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2);
}

export default function UsersTable({
  users,
  selectedRole,
  onSelectRole,
}: {
  users: User[];
  selectedRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}) {
  if (users.length === 0) {
    return <p className="text-sm text-gray-400 py-8 text-center">No hay usuarios registrados todavía.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b border-gray-100">
            <th className="py-2 font-medium">Usuario</th>
            <th className="py-2 font-medium">Rol</th>
            <th className="py-2 font-medium">Bodega / ámbito</th>
            <th className="py-2 font-medium">Último acceso</th>
            <th className="py-2 font-medium">Estado</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              onClick={() => onSelectRole(user.role)}
              title="Click para ver los permisos de este rol"
              className={`border-b border-gray-50 cursor-pointer ${
                selectedRole === user.role ? "bg-blue-50/50" : "hover:bg-gray-50"
              }`}
            >
              <td className="py-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-semibold flex items-center justify-center text-xs">
                    {initials(user.name)}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 text-gray-700">{ROLE_LABEL[user.role]}</td>
              <td className="py-3 text-gray-600">{user.warehouseScope ?? "—"}</td>
              <td className="py-3 text-gray-500">{user.lastAccess ?? "—"}</td>
              <td className="py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {user.active ? "ACTIVO" : "INACTIVO"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}