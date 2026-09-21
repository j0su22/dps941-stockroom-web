import { mockUsers, permissionDefinitions, mockRolePermissions } from "@/data/mockData";
import type { User } from "@/types/user";
import type { PermissionDefinition, RolePermissionsMap } from "@/types/permission";

export async function getUsers(): Promise<User[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockUsers;
}

export interface RolePermissionsData {
  definitions: PermissionDefinition[];
  byRole: RolePermissionsMap;
}

export async function getRolePermissions(): Promise<RolePermissionsData> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { definitions: permissionDefinitions, byRole: mockRolePermissions };
}