export interface ReportMetric {
  label: string;
  value: string;
  helper: string;
  helperColor?: "positive" | "negative";
}

export interface ProjectConsumption {
  projectName: string;
  units: number;
}

export interface CategoryStock {
  category: string;
  units: number;
  color: string;
}

export interface SavedReport {
  id: string;
  name: string;
  frequency: string;
  recipients: number;
  lastGenerated: string;
  formats: string[];
}