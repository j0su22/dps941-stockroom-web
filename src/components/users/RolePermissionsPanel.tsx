import type { PermissionDefinition } from "@/types/permission";
import type { UserRole } from "@/types/user";

const ROLE_LABEL: Record<UserRole, string> = {
  ADMIN: "Supervisora",
  WAREHOUSE: "Bodeguero",
  TECHNICIAN: "Técnico",
};

export default function RolePermissionsPanel({
  role,
  definitions,
  permissions,
}: {
  role: UserRole;
  definitions: PermissionDefinition[];
  permissions: Record<string, boolean>;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-sm font-semibold text-gray-900">Permisos por rol</h2>
      <p className="text-xs text-gray-500 mb-4">
        Rol seleccionado: <span className="font-semibold text-gray-700">{ROLE_LABEL[role]}</span>
      </p>
      <ul className="flex flex-col gap-4">
        {definitions.map((def) => {
          const enabled = permissions[def.key];
          return (
            <li key={def.key} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{def.label}</span>
              <span
                className={`w-10 h-6 rounded-full flex items-center px-0.5 transition-colors ${
                  enabled ? "bg-blue-900 justify-end" : "bg-gray-200 justify-start"
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white block" />
              </span>
            </li>
          );
        })}
      </ul>
      <p className="text-xs text-gray-400 mt-4">
        Haz clic en un usuario de la tabla para ver los permisos de su rol.
      </p>
    </div>
  );
}