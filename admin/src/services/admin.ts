import api from "./api";

export async function getPendingUsers() {
  const response = await api.get("/admin/pending-users");
  return response.data;
}

export async function getAllUsers() {
  const response = await api.get("/admin/users");
  return response.data;
}

export async function approveUser(id: string) {
  const response = await api.patch(`/admin/approve/${id}`);
  return response.data;
}

export async function rejectUser(id: string) {
  const response = await api.patch(`/admin/reject/${id}`);
  return response.data;
}