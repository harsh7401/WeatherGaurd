import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
  const { token } = useAuth();

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          WeatherGuard Admin
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage users, alerts and system settings
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
          A
        </div>

        <div className="text-right">
          <p className="font-semibold text-slate-800">
            Administrator
          </p>

          <p className="text-sm text-slate-500">
            {token ? "Logged In" : "Guest"}
          </p>
        </div>
      </div>
    </header>
  );
}