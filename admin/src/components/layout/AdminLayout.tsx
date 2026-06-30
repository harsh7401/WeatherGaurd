import { Outlet } from "react-router-dom";

import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";

export default function AdminLayout() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-slate-100 min-h-screen">

        <Topbar />

        <div className="p-8">
          <Outlet />
        </div>

      </div>

    </div>
  );
}