import {
  mockReportMetrics,
  mockProjectConsumption,
  mockCategoryStock,
  mockSavedReports,
} from "@/data/mockData";
import type { ReportMetric, ProjectConsumption, CategoryStock, SavedReport } from "@/types/report";

export interface ReportData {
  metrics: ReportMetric[];
  consumption: ProjectConsumption[];
  categories: CategoryStock[];
  savedReports: SavedReport[];
}

export async function getReportData(): Promise<ReportData> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    metrics: mockReportMetrics,
    consumption: mockProjectConsumption,
    categories: mockCategoryStock,
    savedReports: mockSavedReports,
  };
}