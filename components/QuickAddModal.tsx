"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "@/context/CartContext";

type QuickAddModalProps = {
  open: boolean;
  onClose: () => void;

  book: {
    id: number;
    title: string;
    slug: string;
    category_name: string;
  };

  onAdded: (
    title: string,
    slug: string,
    quantity: number
  ) => void;
};

export default function QuickAddModal({
  open,
  onClose,
  book,
  onAdded,
}: QuickAddModalProps) {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  // Reset quantity whenever the modal opens
  useEffect(() => {
    if (open) {
      setQuantity(1);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  // Lock background scrolling
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="
fixed
inset-0

bg-black/40

backdrop-blur-sm

flex
items-center
justify-center

z-[100]

animate-in
fade-in

duration-300
ease-out
"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
relative

bg-white

rounded-2xl

w-full
max-w-md

p-8

shadow-2xl

animate-in
fade-in
zoom-in-95

duration-300
ease-out
"
      >
        {/* Close Button */}

        <button
          onClick={onClose}
          className="
absolute

top-4
right-4

text-gray-400

hover:text-gray-700

active:scale-90

transition-all

duration-150
"
        >
          <X size={20} />
        </button>

        <img
          src={`https://opigtrpgtyssktfybqqy.supabase.co/storage/v1/object/public/book-covers/${book.slug}.jpg`}
          alt={book.title}
          className="
            w-32
            mx-auto
            rounded-lg
            shadow
            border
            mb-6
          "
        />

        <h2 className="text-2xl font-bold text-center text-gray-900">
          {book.title}
        </h2>

        <p className="text-center text-green-700 mt-2 mb-6">
          {book.category_name}
        </p>

        <div className="mb-8">
          <p className="font-medium mb-3 text-gray-700">
            Quantity
          </p>

          <QuantitySelector
            quantity={quantity}
            onChange={setQuantity}
            size="sm"
          />
        </div>

        <div className="flex gap-4">

          <button
            onClick={onClose}
            className="
  flex-1
  border
  rounded-xl
  py-3

  hover:bg-gray-100

  active:scale-[0.98]

  transition-all

  duration-200
"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              addToCart({
                ...book,
                quantity,
              });

              onAdded(
                book.title,
                book.slug,
                quantity
              );

              setQuantity(1);

              onClose();
            }}
            className="
flex-1

bg-green-700

text-white

rounded-xl

py-3

hover:bg-green-800

active:scale-[0.98]

transition-all

duration-200
"
          >
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  );
}