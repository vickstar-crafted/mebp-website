"use client";

import { useEffect, useState } from "react";
import QuantitySelector from "./QuantitySelector";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
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

  return (
    <Modal open={open} onClose={onClose}>
      <img
        src={`https://opigtrpgtyssktfybqqy.supabase.co/storage/v1/object/public/book-covers/${book.slug}.jpg`}
        alt={book.title}
        className="
          mx-auto
          mb-6
          w-32
          rounded-lg
          border
          shadow
        "
      />

      <h2 className="text-center text-2xl font-bold text-gray-900">
        {book.title}
      </h2>

      <p className="mt-2 mb-6 text-center text-green-700">
        {book.category_name}
      </p>

      <div className="mb-8">
        <p className="mb-3 font-medium text-gray-700">
          Quantity
        </p>

        <QuantitySelector
          quantity={quantity}
          onChange={setQuantity}
          size="sm"
        />
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          type="button"
          fullWidth
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
        >
          Add to Cart
        </Button>
      </div>
    </Modal>
  );
}