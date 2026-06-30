import {
  FiHome,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen">

      <div className="text-2xl font-bold p-6 border-b border-slate-700">
        WeatherGuard
      </div>

      <nav className="mt-6 flex flex-col">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <FiHome />
          Dashboard
        </Link>

        <Link
          to="/pending-users"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <FiUsers />
          Pending Users
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <FiSettings />
          Settings
        </Link>

        <button
          className="flex items-center gap-3 px-6 py-4 hover:bg-red-600 mt-auto"
        >
          <FiLogOut />
          Logout
        </button>

      </nav>

    </div>
  );
}