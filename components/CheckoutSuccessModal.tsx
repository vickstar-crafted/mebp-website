"use client";

import { Trash2, CircleCheckBig, Copy } from "lucide-react";
import { useRouter } from "next/navigation";

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

  if (!open) return null;

  const copyReference = async () => {
    try {
      await navigator.clipboard.writeText(orderReference);
      alert("Order reference copied!");
    } catch {
      alert("Unable to copy.");
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/40
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-50
        animate-in
        fade-in
        duration-300
      "
    >
      <div
        className="
          bg-white
          rounded-2xl
          shadow-2xl
          p-8
          w-[90%]
          max-w-md
          animate-in
          zoom-in-95
          fade-in
        "
      >
        <div className="flex justify-center mb-5">
          <CircleCheckBig
            size={58}
            className="text-green-600"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-2">
          Order Submitted
        </h2>

        <p className="text-gray-600 text-center">
          Your order has been saved successfully.
        </p>

        <div className="mt-6 mb-6 rounded-xl bg-green-50 border border-green-200 p-4">
          <p className="text-sm text-gray-600 text-center">
            Order Reference
          </p>

          <p className="font-bold text-xl text-center text-green-700 break-all mt-2">
            {orderReference}
          </p>

          <button
            onClick={copyReference}
            className="
              mt-4
              w-full
              border
              rounded-lg
              py-2
              hover:bg-gray-100
              transition
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <Copy size={16} />
            Copy Reference
          </button>
        </div>

        <p className="text-sm text-gray-600 text-center mb-8">
          A WhatsApp chat has been opened with your order details.

          <br />
          <br />

          Please send the message to complete your order.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => {
              onContinue();
              router.push("/books");
            }}
            className="
              w-full
              border
              rounded-xl
              py-3
              hover:bg-gray-100
              active:scale-[0.98]
              transition-all
            "
          >
            Continue Shopping
          </button>

          <button
            onClick={onClearCart}
            className="
              w-full
              bg-red-600
              text-white
              py-3
              rounded-xl
              hover:bg-red-700
              active:scale-[0.98]
              transition-all
            "
          >
            <div className="flex items-center justify-center gap-2">
              <Trash2 size={18} />
              <span>Clear Cart</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}