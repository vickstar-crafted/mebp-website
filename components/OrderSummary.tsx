"use client";
import { Trash2 } from "lucide-react";
import WhatsAppCheckout from "@/components/WhatsAppCheckout";
import CustomerForm from "@/components/CustomerForm";

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
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-8">

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Order Summary
      </h2>

      <div className="flex justify-between items-center mb-4">

        <span className="text-gray-600">
          Book Titles
        </span>

        <span className="text-xl font-bold text-gray-900">
          {totalBooks}
        </span>

      </div>

      <div className="flex justify-between items-center mb-6">

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

  duration-200
"
>
  <div className="flex items-center justify-center gap-2">
    <Trash2 size={18} />
    <span>Clear Cart</span>
  </div>
</button>

        <WhatsAppCheckout />

      </div>

    </div>
  );
}