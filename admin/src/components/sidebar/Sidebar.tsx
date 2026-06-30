import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  CloudLightning,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="flex h-screen w-72 flex-col bg-slate-900 text-white">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-6">
        <div className="rounded-xl bg-blue-600 p-2">
          <CloudLightning size={26} />
        </div>

        <div>
          <h1 className="text-xl font-bold">
            WeatherGuard
          </h1>

          <p className="text-sm text-slate-400">
            Admin Panel
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <NavLink
          to="/dashboard"
          className={linkClass}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/pending-users"
          className={linkClass}
        >
          <Users size={20} />
          Pending Users
        </NavLink>

        <NavLink
          to="/settings"
          className={linkClass}
        >
          <Settings size={20} />
          Settings
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-red-600 hover:text-white"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}