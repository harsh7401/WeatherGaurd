import {
  FiHome,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="border-b border-slate-700 p-6 text-2xl font-bold">
        WeatherGuard
      </div>

      <nav className="mt-6 flex flex-col flex-1">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-6 py-4 transition hover:bg-slate-800"
        >
          <FiHome size={20} />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/pending-users"
          className="flex items-center gap-3 px-6 py-4 transition hover:bg-slate-800"
        >
          <FiUsers size={20} />
          <span>Pending Users</span>
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 px-6 py-4 transition hover:bg-slate-800"
        >
          <FiSettings size={20} />
          <span>Settings</span>
        </Link>

        <button
          onClick={logout}
          className="mt-auto flex items-center gap-3 px-6 py-4 text-left transition hover:bg-red-600"
        >
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}