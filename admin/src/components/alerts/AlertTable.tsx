import type { Alert } from "../../types/alert";

type Props = {
  alerts: Alert[];
  onEdit: (alert: Alert) => void;
  onDelete: (id: string) => void;
};

export default function AlertTable({
  alerts,
  onEdit,
  onDelete,
}: Props) {
  function severityBadge(
    severity: Alert["severity"]
  ) {
    switch (severity) {
      case "LOW":
        return "bg-green-100 text-green-700";

      case "MEDIUM":
        return "bg-yellow-100 text-yellow-700";

      case "HIGH":
        return "bg-orange-100 text-orange-700";

      case "CRITICAL":
        return "bg-red-100 text-red-700";

      default:
        return "";
    }
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-lg">
      <table className="w-full min-w-[900px]">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-8 py-5 text-center text-sm font-bold uppercase tracking-wide text-slate-600">
              #
            </th>

            <th className="px-8 py-5 text-left text-sm font-bold uppercase tracking-wide text-slate-600">
              Title
            </th>

            <th className="px-8 py-5 text-left text-sm font-bold uppercase tracking-wide text-slate-600">
              City
            </th>

            <th className="px-8 py-5 text-left text-sm font-bold uppercase tracking-wide text-slate-600">
              Severity
            </th>

            <th className="px-8 py-5 text-left text-sm font-bold uppercase tracking-wide text-slate-600">
              Status
            </th>

            <th className="px-8 py-5 text-center text-sm font-bold uppercase tracking-wide text-slate-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200">
          {alerts.map((alert, index) => (
            <tr
              key={alert._id}
              className="transition-colors duration-200 hover:bg-slate-50"
            >
              <td className="px-8 py-5 text-center font-medium text-slate-500">
                {index + 1}
              </td>

              <td className="px-8 py-5 font-semibold text-slate-800">
                {alert.title}
              </td>

              <td className="px-8 py-5 text-slate-600">
                {alert.city}
              </td>

              <td className="px-8 py-5">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${severityBadge(
                    alert.severity
                  )}`}
                >
                  {alert.severity}
                </span>
              </td>

              <td className="px-8 py-5">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                    alert.enabled
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {alert.enabled
                    ? "Enabled"
                    : "Disabled"}
                </span>
              </td>

              <td className="px-8 py-5">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => onEdit(alert)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      onDelete(alert._id)
                    }
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {alerts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-5xl">🌤️</div>

          <p className="mt-4 text-lg font-semibold text-slate-700">
            No weather alerts found
          </p>

          <p className="mt-2 text-slate-500">
            Click <strong>New Alert</strong> to create your first weather alert.
          </p>
        </div>
      )}
    </div>
  );
}