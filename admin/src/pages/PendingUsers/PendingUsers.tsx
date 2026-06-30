import { useEffect, useState } from "react";

import UserTable from "../../components/users/UserTable";

import {
  approveUser,
  getPendingUsers,
  rejectUser,
} from "../../services/admin";

import type { User } from "../../types/user";

export default function PendingUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadUsers() {
    try {
      const data = await getPendingUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleApprove(id: string) {
    await approveUser(id);
    loadUsers();
  }

  async function handleReject(id: string) {
    await rejectUser(id);
    loadUsers();
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-slate-200">
        Loading users...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Pending Users
        </h1>

        <p className="mt-2 text-slate-500">
          Review and approve new user registrations.
        </p>
      </div>

      <UserTable
        users={users}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}