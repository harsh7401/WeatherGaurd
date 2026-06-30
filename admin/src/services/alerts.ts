import api from "./api";

export async function getAlerts() {
  const res = await api.get("/alerts");
  return res.data;
}

export async function createAlert(data: {
  title: string;
  description: string;
  city: string;
  severity: string;
}) {
  const res = await api.post("/alerts", data);
  return res.data;
}

export async function updateAlert(
  id: string,
  data: {
    title: string;
    description: string;
    city: string;
    severity: string;
  }
) {
  const res = await api.patch(
    `/alerts/${id}`,
    data
  );

  return res.data;
}

export async function deleteAlert(id: string) {
  const res = await api.delete(
    `/alerts/${id}`
  );

  return res.data;
}