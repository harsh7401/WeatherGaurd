import { useEffect, useState } from "react";

import StatsCard from "../../components/dashboard/StatsCard";

import { getDashboardStats } from "../../services/admin";

import type { DashboardStats } from "../../types/dashboard";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadDashboard();
  }, []);

  if (!stats) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          WeatherGuard Admin Overview
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
        />

        <StatsCard
          title="Pending Users"
          value={stats.pendingUsers}
        />

        <StatsCard
          title="Approved Users"
          value={stats.approvedUsers}
        />

        <StatsCard
          title="Rejected Users"
          value={stats.rejectedUsers}
        />
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          Recent Users
        </h2>

        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Name</th>
              <th className="py-2 text-left">Email</th>
              <th className="py-2 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {stats.recentUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b"
              >
                <td className="py-3">
                  {user.name}
                </td>

                <td className="py-3">
                  {user.email}
                </td>

                <td className="py-3">
                  {user.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}