import type { Alert } from "../../types/alert";

type Props = {
  alerts: Alert[];
};

export default function AlertTable({
  alerts,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-6 py-4 text-left">
              Title
            </th>

            <th className="px-6 py-4 text-left">
              City
            </th>

            <th className="px-6 py-4 text-left">
              Severity
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {alerts.map((alert) => (
            <tr
              key={alert._id}
              className="border-t"
            >
              <td className="px-6 py-4">
                {alert.title}
              </td>

              <td className="px-6 py-4">
                {alert.city}
              </td>

              <td className="px-6 py-4">
                {alert.severity}
              </td>

              <td className="px-6 py-4">
                {alert.enabled
                  ? "Enabled"
                  : "Disabled"}
              </td>

              <td className="px-6 py-4 text-center">
                Edit | Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}