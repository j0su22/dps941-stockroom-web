export type TraceabilityEventType =
  | "ENTRY"
  | "EXIT"
  | "ASSIGNMENT"
  | "INSTALLATION"
  | "RETURN"
  | "TRANSFER";

export interface TraceabilityEvent {
  id: string;
  equipmentId: string;
  type: TraceabilityEventType;
  title: string;
  description: string;
  date: string;
  responsible: string;
}