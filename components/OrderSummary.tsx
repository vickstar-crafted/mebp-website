"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import WhatsAppCheckout from "@/components/WhatsAppCheckout";
import CustomerForm from "@/components/CustomerForm";
import ClearCartModal from "@/components/ClearCartModal";

type OrderSummaryProps = {
  totalBooks: number;
  totalCopies: number;
  onClearCart: () => void;
};

export default function OrderSummary({
  totalBooks,
  totalCopies,
  onClearCart,
}: OrderSummaryProps) {
  const [showClearModal, setShowClearModal] =
    useState(false);

  function handleClearCart() {
    onClearCart();
    setShowClearModal(false);
  }

  return (
    <>
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Order Summary
        </h2>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-gray-600">
            Book Titles
          </span>

          <span className="text-xl font-bold text-gray-900">
            {totalBooks}
          </span>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <span className="text-gray-600">
            Total Copies
          </span>

          <span className="text-xl font-bold text-gray-900">
            {totalCopies}
          </span>
        </div>

        <hr className="mb-6" />

        <CustomerForm />

        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setShowClearModal(true)}
            className="
              w-full
              rounded-xl
              bg-red-600
              py-3
              text-white
              transition-all
              duration-200
              hover:bg-red-700
              active:scale-[0.98]
            "
          >
            <span className="flex items-center justify-center gap-2">
              <Trash2 size={18} />

              <span>Clear Cart</span>
            </span>
          </button>

          <WhatsAppCheckout />
        </div>
      </div>

      <ClearCartModal
        open={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={handleClearCart}
      />
    </>
  );
}