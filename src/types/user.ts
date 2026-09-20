export type UserRole = "ADMIN" | "WAREHOUSE" | "TECHNICIAN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
}
