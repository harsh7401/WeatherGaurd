import { useEffect, useState } from "react";

import UserTable from "../../components/users/UserTable";

import {
  getPendingUsers,
  approveUser,
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleApprove(id: string) {
    try {
      await approveUser(id);

      setUsers((prev) =>
        prev.filter((user) => user._id !== id),
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleReject(id: string) {
    try {
      await rejectUser(id);

      setUsers((prev) =>
        prev.filter((user) => user._id !== id),
      );
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Pending Users
        </h1>

        <p className="text-gray-500">
          Review and approve user access requests.
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