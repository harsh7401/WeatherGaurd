import { useState } from "react";

type Props = {
  onSubmit: (data: {
    title: string;
    description: string;
    city: string;
    severity: string;
  }) => void;

  onCancel: () => void;
};

export default function AlertForm({
  onSubmit,
  onCancel,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [city, setCity] = useState("");
  const [severity, setSeverity] =
    useState("MEDIUM");

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
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        className="w-full rounded-lg border p-3"
        placeholder="Description"
        rows={4}
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <input
        className="w-full rounded-lg border p-3"
        placeholder="City"
        value={city}
        onChange={(e) =>
          setCity(e.target.value)
        }
      />

      <select
        className="w-full rounded-lg border p-3"
        value={severity}
        onChange={(e) =>
          setSeverity(e.target.value)
        }
      >
        <option>LOW</option>
        <option>MEDIUM</option>
        <option>HIGH</option>
        <option>CRITICAL</option>
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
          Create Alert
        </button>
      </div>
    </form>
  );
}