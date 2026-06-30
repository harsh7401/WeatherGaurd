import AlertForm from "./AlertForm";

import type { Alert } from "../../types/alert";

type Props = {
  open: boolean;

  loading?: boolean;

  onClose: () => void;

  initialData?: Alert | null;

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
};

export default function AlertModal({
  open,
  loading = false,
  onClose,
  initialData,
  onSubmit,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold">
          {initialData
            ? "Edit Weather Alert"
            : "Create Weather Alert"}
        </h2>

        <AlertForm
          initialData={initialData}
          loading={loading}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}