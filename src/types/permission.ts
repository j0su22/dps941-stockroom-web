import type { UserRole } from "@/types/user";

export type PermissionKey =
  | "viewInventory"
  | "registerExitsReturns"
  | "registerInstallations"
  | "createEditEquipment"
  | "approveTransfers"
  | "viewExecutiveReports";

export interface PermissionDefinition {
  key: PermissionKey;
  label: string;
}

export type RolePermissionsMap = Record<UserRole, Record<PermissionKey, boolean>>;