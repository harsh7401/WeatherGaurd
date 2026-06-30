import type { User } from "../../types/user";

interface UserTableProps {
  users: User[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function UserTable({
  users,
  onApprove,
  onReject,
}: UserTableProps) {
  if (users.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-700">
          No Pending Users
        </h2>

        <p className="mt-2 text-slate-500">
          Every user has already been reviewed.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
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
              Provider
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-t border-slate-200 hover:bg-slate-50 transition"
            >
              <td className="px-6 py-4 font-medium">
                {user.name}
              </td>

              <td className="px-6 py-4 text-slate-600">
                {user.email}
              </td>

              <td className="px-6 py-4 capitalize">
                {user.provider}
              </td>

              <td className="px-6 py-4">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                  {user.status}
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => onApprove(user._id)}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => onReject(user._id)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}