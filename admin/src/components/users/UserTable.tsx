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
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Provider</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-10 text-center text-slate-500"
              >
                No pending users.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user._id}
                className="border-t"
              >
                <td className="px-6 py-4">{user.name}</td>

                <td className="px-6 py-4">
                  {user.email}
                </td>

                <td className="px-6 py-4 capitalize">
                  {user.provider}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                    {user.status}
                  </span>
                </td>

                <td className="space-x-2 px-6 py-4 text-center">
                  <button
                    onClick={() => onApprove(user._id)}
                    className="rounded bg-green-600 px-3 py-2 text-white hover:bg-green-700"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => onReject(user._id)}
                    className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}