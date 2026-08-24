"use client";

import { Trash2, Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

type CheckoutSuccessModalProps = {
  open: boolean;
  orderReference: string;
  onContinue: () => void;
  onClearCart: () => void;
};

export default function CheckoutSuccessModal({
  open,
  orderReference,
  onContinue,
  onClearCart,
}: CheckoutSuccessModalProps) {
  const router = useRouter();

  const copyReference = async () => {
    try {
      await navigator.clipboard.writeText(orderReference);
      alert("Order reference copied!");
    } catch {
      alert("Unable to copy.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onContinue}
    >
      <h2 className="mb-2 text-center text-2xl font-bold">
        Order Submitted
      </h2>

      <p className="text-center text-gray-600">
        Your order has been saved successfully.
      </p>

      <div className="mt-6 mb-6 rounded-xl border border-green-200 bg-green-50 p-4">
        <p className="text-center text-sm text-gray-600">
          Order Reference
        </p>

        <p className="mt-2 break-all text-center text-xl font-bold text-green-700">
          {orderReference}
        </p>

        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={copyReference}
          className="mt-4"
        >
          <span className="flex items-center justify-center gap-2">
            <Copy size={16} />
            Copy Reference
          </span>
        </Button>
      </div>

      <p className="mb-8 text-center text-sm text-gray-600">
        A WhatsApp chat has been opened with your order details.

        <br />
        <br />

        Please send the message to complete your order.
      </p>

      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={() => {
            onContinue();
            router.push("/books");
          }}
        >
          Continue Shopping
        </Button>

        <Button
          type="button"
          variant="danger"
          fullWidth
          onClick={onClearCart}
        >
          <span className="flex items-center justify-center gap-2">
            <Trash2 size={18} />
            <span>Clear Cart</span>
          </span>
        </Button>
      </div>
    </Modal>
  );
}