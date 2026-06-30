import { useEffect, useState } from "react";

import toast from "react-hot-toast";

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
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleApprove(id: string) {
    const confirmed = window.confirm(
      "Approve this user?"
    );

    if (!confirmed) return;

    try {
      await approveUser(id);

      toast.success("User approved");

      loadUsers();
    } catch {
      toast.error("Approval failed");
    }
  }

  async function handleReject(id: string) {
    const confirmed = window.confirm(
      "Reject this user?"
    );

    if (!confirmed) return;

    try {
      await rejectUser(id);

      toast.success("User rejected");

      loadUsers();
    } catch {
      toast.error("Reject failed");
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
        Loading users...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
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