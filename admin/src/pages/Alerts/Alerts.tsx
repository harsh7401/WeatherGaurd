import { useEffect, useState } from "react";

import AlertTable from "../../components/alerts/AlertTable";
import AlertModal from "../../components/alerts/AlertModal";

import {
  getAlerts,
  createAlert,
  updateAlert,
  deleteAlert,
} from "../../services/alerts";

import type { Alert } from "../../types/alert";

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [open, setOpen] = useState(false);

  const [selectedAlert, setSelectedAlert] =
    useState<Alert | null>(null);

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

  async function handleSubmit(data: {
    title: string;
    description: string;
    city: string;
    severity: Alert["severity"];
  }) {
    try {
      if (selectedAlert) {
        await updateAlert(selectedAlert._id, data);
      } else {
        await createAlert(data);
      }

      setOpen(false);
      setSelectedAlert(null);

      await loadAlerts();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this alert?")) {
      return;
    }

    try {
      await deleteAlert(id);
      await loadAlerts();
    } catch (err) {
      console.error(err);
    }
  }

  function handleEdit(alert: Alert) {
    setSelectedAlert(alert);
    setOpen(true);
  }

  function handleNewAlert() {
    setSelectedAlert(null);
    setOpen(true);
  }

  return (
    <>
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

          <button
            onClick={handleNewAlert}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + New Alert
          </button>
        </div>

        <AlertTable
          alerts={alerts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <AlertModal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedAlert(null);
        }}
        initialData={selectedAlert}
        onSubmit={handleSubmit}
      />
    </>
  );
}