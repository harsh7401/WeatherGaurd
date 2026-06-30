import { useEffect, useState } from "react";

import toast from "react-hot-toast";

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

  const [loading, setLoading] =
    useState(false);

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
      toast.error("Failed to load alerts");
    }
  }

  async function handleSubmit(data: {
    title: string;
    description: string;
    city: string;
    severity:
      | "LOW"
      | "MEDIUM"
      | "HIGH"
      | "CRITICAL";
  }) {
    setLoading(true);

    try {
      if (selectedAlert) {
        await updateAlert(
          selectedAlert._id,
          data
        );

        toast.success(
          "Alert updated successfully"
        );
      } else {
        await createAlert(data);

        toast.success(
          "Alert created successfully"
        );
      }

      setOpen(false);
      setSelectedAlert(null);

      await loadAlerts();
    } catch (err) {
      console.error(err);

      toast.error("Failed to save alert");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (
      !window.confirm(
        "Delete this alert?"
      )
    ) {
      return;
    }

    try {
      await deleteAlert(id);

      toast.success("Alert deleted");

      await loadAlerts();
    } catch (err) {
      console.error(err);

      toast.error("Failed to delete alert");
    }
  }

  function handleEdit(alert: Alert) {
    setSelectedAlert(alert);
    setOpen(true);
  }

  function handleCreate() {
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
              Manage weather alerts across
              cities.
            </p>
          </div>

          <button
            onClick={handleCreate}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
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
        loading={loading}
        initialData={selectedAlert}
        onClose={() => {
          setOpen(false);
          setSelectedAlert(null);
        }}
        onSubmit={handleSubmit}
      />
    </>
  );
}