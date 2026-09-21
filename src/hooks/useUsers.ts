"use client";

import { useEffect, useState } from "react";
import { getUsers, getRolePermissions } from "@/services/userService";
import type { User, UserRole } from "@/types/user";
import type { PermissionDefinition, RolePermissionsMap } from "@/types/permission";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [permissionDefs, setPermissionDefs] = useState<PermissionDefinition[]>([]);
  const [rolePermissions, setRolePermissions] = useState<RolePermissionsMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    Promise.all([getUsers(), getRolePermissions()])
      .then(([usersData, permsData]) => {
        if (!active) return;
        setUsers(usersData);
        setPermissionDefs(permsData.definitions);
        setRolePermissions(permsData.byRole);
      })
      .catch(() => {
        if (active) setError("No se pudieron cargar los usuarios.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { users, permissionDefs, rolePermissions, loading, error };
}