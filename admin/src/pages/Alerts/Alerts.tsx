import { useEffect, useState } from "react";

import AlertTable from "../../components/alerts/AlertTable";

import { getAlerts } from "../../services/alerts";

import type { Alert } from "../../types/alert";

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    loadAlerts();
  }, []);

  async function loadAlerts() {
    try {
      const data = await getAlerts();
      setAlerts(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Weather Alerts
          </h1>

          <p className="mt-2 text-slate-500">
            Manage weather alerts across cities.
          </p>
        </div>

        <button className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white">
          + New Alert
        </button>
      </div>

      <AlertTable alerts={alerts} />
    </div>
  );
}