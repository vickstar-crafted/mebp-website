"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/ui/StatusBadge";
import { updateOrderStatusAction } from "./actions";

const STATUSES = [
  "Pending",
  "Processing",
  "Completed",
  "Cancelled",
] as const;

type OrderStatusEditorProps = {
  orderId: number;
  currentStatus: string;
};

export default function OrderStatusEditor({
  orderId,
  currentStatus,
}: OrderStatusEditorProps) {
  const [status, setStatus] = useState(currentStatus);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSave() {
    setMessage("");
    setSuccess(false);

    startTransition(async () => {
      const result = await updateOrderStatusAction(
        orderId,
        status
      );

      setMessage(result.message);
      setSuccess(result.success);

      if (result.success) {
        router.refresh();
      }
    });
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="mb-5 text-xl font-semibold text-gray-900">
        Order Status Management
      </h2>

      <div className="mb-5 flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">
          Current status:
        </span>

        <StatusBadge status={currentStatus} />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label
            htmlFor="order-status"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Update status
          </label>

          <select
            id="order-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={isPending}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
          >
            {STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isPending || status === currentStatus}
          className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save Status"}
        </button>
      </div>

      {message && (
        <p
          role="status"
          className={`mt-4 rounded-lg px-4 py-3 text-sm font-medium ${
            success
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}