import api from "./api";

export const getPendingUsers = async () => {
  const { data } = await api.get("/admin/pending-users");
  return data;
};

export const approveUser = async (id: string) => {
  const { data } = await api.patch(`/admin/approve/${id}`);
  return data;
};

export const rejectUser = async (id: string) => {
  const { data } = await api.patch(`/admin/reject/${id}`);
  return data;
};