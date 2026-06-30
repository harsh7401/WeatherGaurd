import { useEffect, useState } from "react";

import type { Alert } from "../../types/alert";

type Props = {
  initialData?: Alert | null;

  loading?: boolean;

  onSubmit: (data: {
    title: string;
    description: string;
    city: string;
    severity:
      | "LOW"
      | "MEDIUM"
      | "HIGH"
      | "CRITICAL";
  }) => void;

  onCancel: () => void;
};

export default function AlertForm({
  initialData,
  loading = false,
  onSubmit,
  onCancel,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [city, setCity] = useState("");
  const [severity, setSeverity] = useState<
    "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  >("MEDIUM");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setCity(initialData.city);
      setSeverity(initialData.severity);
    } else {
      setTitle("");
      setDescription("");
      setCity("");
      setSeverity("MEDIUM");
    }
  }, [initialData]);

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
        placeholder="Title"
        value={title}
        disabled={loading}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        className="w-full rounded-lg border p-3"
        rows={4}
        placeholder="Description"
        value={description}
        disabled={loading}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <input
        className="w-full rounded-lg border p-3"
        placeholder="City"
        value={city}
        disabled={loading}
        onChange={(e) =>
          setCity(e.target.value)
        }
      />

      <select
        className="w-full rounded-lg border p-3"
        value={severity}
        disabled={loading}
        onChange={(e) =>
          setSeverity(
            e.target.value as
              | "LOW"
              | "MEDIUM"
              | "HIGH"
              | "CRITICAL"
          )
        }
      >
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
        <option value="CRITICAL">
          CRITICAL
        </option>
      </select>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          disabled={loading}
          onClick={onCancel}
          className="rounded-lg border px-5 py-2 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : initialData
            ? "Update Alert"
            : "Create Alert"}
        </button>
      </div>
    </form>
  );
}