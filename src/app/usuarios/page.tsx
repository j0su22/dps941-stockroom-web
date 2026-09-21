"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useUsers } from "@/hooks/useUsers";
import UsersTable from "@/components/users/UsersTable";
import RolePermissionsPanel from "@/components/users/RolePermissionsPanel";
import type { UserRole } from "@/types/user";

export default function UsuariosPage() {
  const { users, permissionDefs, rolePermissions, loading, error } = useUsers();
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("TECHNICIAN");

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
      </DashboardLayout>
    );
  }

  if (error || !rolePermissions) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 text-red-700 rounded-lg p-6 text-sm">
          {error ?? "No se pudieron cargar los usuarios."}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar usuario..."
            className="w-full max-w-sm rounded-lg border border-gray-200 px-4 py-2 text-sm"
          />
          <div className="flex gap-2">
            <button className="border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Registro de auditoría
            </button>
            <button className="bg-amber-400 hover:bg-amber-500 text-[#1B2A6B] font-semibold text-sm px-4 py-2 rounded-lg">
              Invitar usuario
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">Usuarios y permisos</h1>
          <p className="text-sm text-gray-500">
            {users.filter((u) => u.active).length} usuarios activos · 3 roles definidos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <UsersTable users={filteredUsers} selectedRole={selectedRole} onSelectRole={setSelectedRole} />
          </div>
          <RolePermissionsPanel
            role={selectedRole}
            definitions={permissionDefs}
            permissions={rolePermissions[selectedRole]}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}