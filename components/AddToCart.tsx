"use client";

import CartToast from "@/components/CartToast";
import QuantitySelector from "@/components/QuantitySelector";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function AddToCart({
  id,
  title,
  slug,
  category_name,
}: {
  id: number;
  title: string;
  slug: string;
  category_name: string;
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();

  return (
    <>
      {added && (
        <CartToast
          title={title}
          slug={slug}
          quantity={quantity}
          onClose={() => setAdded(false)}
        />
      )}

      <div className="flex items-end gap-4 mt-6">

        <div>
          <p className="font-medium text-gray-700 mb-2">
            Quantity
          </p>

          <QuantitySelector
            quantity={quantity}
            onChange={setQuantity}
          />
        </div>

        <button
          onClick={() => {
            addToCart({
              id,
              title,
              slug,
              quantity,
              category_name,
            });

            setAdded(true);

            setTimeout(() => {
              setAdded(false);
            }, 3000);
          }}
          className="
  bg-green-700
  text-white
  px-6
  py-3
  rounded-xl

  hover:bg-green-800

  active:scale-[0.98]

  transition-all

  duration-200
"
        >
          Add to Cart
        </button>

      </div>
    </>
  );
}