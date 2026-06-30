import type { User } from "../../types/user";
import UserTable from "../../components/users/UserTable";

export default function PendingUsers() {
  const users: User[] = [];

  const handleApprove = (id: string) => {
    console.log("Approve:", id);
  };

  const handleReject = (id: string) => {
    console.log("Reject:", id);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Pending Users
        </h1>

        <p className="mt-2 text-slate-500">
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