import { useState } from "react";

import type { Alert } from "../../types/alert";

type Props = {
  initialData?: Alert | null;

  onSubmit: (data: {
    title: string;
    description: string;
    city: string;
    severity: Alert["severity"];
  }) => void;

  onCancel: () => void;
};

export default function AlertForm({
  initialData,
  onSubmit,
  onCancel,
}: Props) {
  const [title, setTitle] = useState(
    initialData?.title ?? ""
  );

  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );

  const [city, setCity] = useState(
    initialData?.city ?? ""
  );

  const [severity, setSeverity] =
    useState<Alert["severity"]>(
      initialData?.severity ?? "MEDIUM"
    );

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();

        onSubmit({
          title,
          description,
          city,
          severity,
        });
      }}
    >
      <input
        className="w-full rounded-lg border p-3"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full rounded-lg border p-3"
        rows={4}
        value={description}
        placeholder="Description"
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <input
        className="w-full rounded-lg border p-3"
        value={city}
        placeholder="City"
        onChange={(e) => setCity(e.target.value)}
      />

      <select
        className="w-full rounded-lg border p-3"
        value={severity}
        onChange={(e) =>
          setSeverity(
            e.target.value as Alert["severity"]
          )
        }
      >
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
        <option value="CRITICAL">CRITICAL</option>
      </select>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border px-5 py-2"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2 text-white"
        >
          {initialData
            ? "Update Alert"
            : "Create Alert"}
        </button>
      </div>
    </form>
  );
}