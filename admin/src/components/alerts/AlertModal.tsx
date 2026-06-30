import AlertForm from "./AlertForm";

type Props = {
  open: boolean;

  onClose: () => void;

  onSubmit: (data: {
    title: string;
    description: string;
    city: string;
    severity: string;
  }) => void;
};

export default function AlertModal({
  open,
  onClose,
  onSubmit,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold">
          Create Weather Alert
        </h2>

        <AlertForm
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}