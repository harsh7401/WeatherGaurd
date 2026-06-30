import { Outlet } from "react-router-dom";

import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}