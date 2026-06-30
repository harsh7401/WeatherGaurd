import { useEffect, useState } from "react";

import { getDashboardStats } from "../../services/admin";

import StatsCard from "../../components/dashboard/StatsCard";

interface DashboardStats {
  totalUsers: number;
  pendingUsers: number;
  approvedUsers: number;
  rejectedUsers: number;
  recentUsers: {
    _id: string;
    name: string;
    email: string;
    status: string;
  }[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    pendingUsers: 0,
    approvedUsers: 0,
    rejectedUsers: 0,
    recentUsers: [],
  });

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          WeatherGuard Admin Overview
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          color="text-blue-600"
        />

        <StatsCard
          title="Pending Users"
          value={stats.pendingUsers}
          color="text-amber-500"
        />

        <StatsCard
          title="Approved Users"
          value={stats.approvedUsers}
          color="text-green-600"
        />

        <StatsCard
          title="Rejected Users"
          value={stats.rejectedUsers}
          color="text-red-600"
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-semibold">
            Recent Users
          </h2>
        </div>

        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Email
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {stats.recentUsers.map((user) => (
              <tr
                key={user._id}
                className="border-t border-slate-200 hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  {user.name}
                </td>

                <td className="px-6 py-4">
                  {user.email}
                </td>

                <td className="px-6 py-4 font-medium">
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