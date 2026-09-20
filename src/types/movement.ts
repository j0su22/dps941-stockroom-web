export type MovementType = "ENTRY" | "EXIT" | "RETURN" | "TRANSFER";

export interface Movement {
  id: string;
  type: MovementType;
  equipmentId: string;
  quantity: number;
  origin?: string;
  destination?: string;
  projectId?: string;
  responsibleUserId: string;
  date: string;
  notes?: string;
}
