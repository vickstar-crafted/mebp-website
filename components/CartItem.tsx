"use client";
import QuantitySelector from "./QuantitySelector";
import { Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

type CartItemProps = {
  item: {
    id: number;
    title: string;
    slug: string;
    quantity: number;
    category_name?: string;
  };
};

export default function CartItem({
  item,
}: CartItemProps) {
  const {
    removeFromCart,
    updateQuantity,
  } = useCart();

  return (
    <div
      className="
        bg-white
        p-5
        rounded-xl
        border
        shadow-sm
      "
    >
      <div className="flex gap-5">

        <img
          src={`https://opigtrpgtyssktfybqqy.supabase.co/storage/v1/object/public/book-covers/${item.slug}.jpg`}
          alt={item.title}
          className="
            w-24
            h-32
            object-cover
            rounded-lg
            border
            shadow-sm
            flex-shrink-0
          "
        />

        <div className="flex-1">

          <p className="text-sm text-green-700 font-medium mb-1">
            {item.category_name || "Educational Book"}
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            {item.title}
          </h2>

          <div className="mt-5">

            <p className="text-sm font-medium text-gray-700 mb-2">
              Quantity
            </p>

            <QuantitySelector
  quantity={item.quantity}
  onChange={(value) =>
    updateQuantity(item.id, value)
  }
  size="sm"
/>

            <button
  onClick={() => removeFromCart(item.id)}
  className="
  mt-5

  flex
  items-center
  gap-2

  text-red-600

  font-medium

  hover:text-red-700

  active:scale-[0.98]

  transition-all

  duration-200
"
>
  <div className="flex items-center gap-2">
    <Trash2 size={16} />
    <span>Remove</span>
  </div>
</button>

          </div>

        </div>

      </div>
    </div>
  );
}