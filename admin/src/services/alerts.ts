import api from "./api";
import type { Alert } from "../types/alert";

export async function getAlerts() {
  const { data } = await api.get<Alert[]>("/alerts");
  return data;
}

export async function createAlert(alert: {
  title: string;
  description: string;
  city: string;
  severity: string;
}) {
  const { data } = await api.post("/alerts", alert);
  return data;
}

export async function updateAlert(
  id: string,
  alert: Partial<Alert>,
) {
  const { data } = await api.patch(
    `/alerts/${id}`,
    alert,
  );

  return data;
}

export async function deleteAlert(id: string) {
  const { data } = await api.delete(
    `/alerts/${id}`,
  );

  return data;
}

export async function toggleAlert(id: string) {
  const { data } = await api.patch(
    `/alerts/${id}/toggle`,
  );

  return data;
}