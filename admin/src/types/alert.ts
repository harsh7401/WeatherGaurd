export interface Alert {
  _id: string;
  title: string;
  description: string;
  city: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}