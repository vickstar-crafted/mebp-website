"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function MiniCart() {
  const { cart, mounted } = useCart();

  const [open, setOpen] = useState(false);

  const totalItems = cart.length;

  const totalCopies = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Cart Button */}

      <Link
        href="/cart"
        className="
          relative
          flex
          items-center
          gap-2

          text-green-700

          font-medium

          hover:text-green-800

          transition-colors

          duration-200
        "
      >
        <div className="relative">
          <ShoppingCart size={22} />

          {/* Prevent hydration mismatch */}
          {mounted && totalItems > 0 && (
            <span
              className="
                absolute
                -top-2
                -right-2
                min-w-[20px]
                h-5
                px-1
                rounded-full
                bg-green-700
                text-white
                text-[10px]
                font-bold
                flex
                items-center
                justify-center
                shadow-md
                ring-2
                ring-white
              "
            >
              {totalItems}
            </span>
          )}
        </div>

        <span>Cart</span>
      </Link>

      {/* Dropdown */}

      {mounted && open && cart.length > 0 && (
        <div
          className="
            absolute
            right-0
            mt-2
            w-80

            bg-white
            rounded-2xl

            shadow-2xl
            border

            overflow-hidden

            z-50

            animate-in
            fade-in
            slide-in-from-top-2

            duration-300
            ease-out
          "
        >
          {/* Header */}

          <div className="p-5 border-b">
            <h3 className="text-lg font-bold text-gray-900">
              Shopping Cart
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {totalItems} book{totalItems !== 1 ? "s" : ""} •{" "}
              {totalCopies} cop{totalCopies !== 1 ? "ies" : "y"}
            </p>
          </div>

          {/* Cart Items */}

          <div className="max-h-80 overflow-y-auto">
            {cart.slice(0, 4).map((item) => (
              <Link
                key={item.id}
                href={`/books/${item.slug}`}
                className="
                  flex
                  gap-3
                  p-4
                  border-b
                  hover:bg-gray-50

                  transition-colors

                  duration-200
                "
              >
                <img
                  src={`https://opigtrpgtyssktfybqqy.supabase.co/storage/v1/object/public/book-covers/${item.slug}.jpg`}
                  alt={item.title}
                  className="
                    w-12
                    h-16
                    rounded
                    border
                    object-cover
                    shadow-sm
                  "
                />

                <div className="flex-1">
                  <p
                    className="
                      text-sm
                      font-semibold
                      text-gray-900
                      line-clamp-2
                    "
                  >
                    {item.title}
                  </p>

                  {item.category_name && (
                    <p className="text-xs text-green-700 mt-1">
                      {item.category_name}
                    </p>
                  )}

                  <p className="text-sm text-gray-500 mt-1">
                    Qty: {item.quantity}
                  </p>
                </div>
              </Link>
            ))}

            {cart.length > 4 && (
              <div className="p-4 text-center text-sm text-gray-500">
                + {cart.length - 4} more books
              </div>
            )}
          </div>

          {/* Footer */}

          <div className="p-5">
            <Link
              href="/cart"
              className="
                block

                text-center

                bg-green-700

                text-white

                rounded-xl

                py-3

                font-medium

                hover:bg-green-800

                active:scale-[0.98]

                transition-all

                duration-200
              "
            >
              View Cart →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}