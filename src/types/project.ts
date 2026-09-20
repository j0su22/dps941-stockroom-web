export interface Project {
  id: string;
  name: string;
  client: string;
  status: "PENDING" | "IN_PROGRESS" | "CLOSED" | "DELAYED";
  progress: number;
  startDate: string;
  endDate?: string;
}
