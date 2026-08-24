"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ShoppingCart,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    clearCart,
  } = useCart();

  const totalCopies = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-7xl">

          {/* Page Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Shopping Cart
              </h1>

              {cart.length > 0 && (
                <p className="mt-2 text-gray-600">
                  Review your selected books before placing your order.
                </p>
              )}
            </div>

            {/* Continue Shopping */}
            {cart.length > 0 && (
              <Link
                href="/books"
                className="
                  inline-flex
                  w-fit
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-green-700
                  bg-white
                  px-5
                  py-3
                  font-medium
                  text-green-700
                  transition-all
                  duration-200
                  hover:bg-green-50
                  active:scale-[0.98]
                "
              >
                <ArrowLeft size={18} />

                Continue Shopping
              </Link>
            )}

          </div>

          {cart.length === 0 ? (
            <div className="flex min-h-[450px] items-center justify-center">

              <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white px-8 py-12 text-center shadow-sm">

                {/* Cart Icon */}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
                  <ShoppingCart
                    size={36}
                    className="text-green-700"
                  />
                </div>

                {/* Heading */}
                <h2 className="mt-6 text-2xl font-bold text-gray-900">
                  Your cart is empty
                </h2>

                {/* Description */}
                <p className="mt-3 leading-7 text-gray-600">
                  Looks like you haven&apos;t added any books to your
                  cart yet. Explore our collection and find the perfect
                  books for your learners.
                </p>

                {/* Browse Button */}
                <Link
                  href="/books"
                  className="
                    mt-8
                    inline-flex
                    items-center
                    justify-center
                    rounded-xl
                    bg-green-700
                    px-6
                    py-3
                    font-medium
                    text-white
                    transition-all
                    duration-200
                    hover:bg-green-800
                    active:scale-[0.98]
                  "
                >
                  Browse Our Books →
                </Link>

              </div>

            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-3">

              {/* Cart Items */}
              <div className="space-y-4 lg:col-span-2">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                  />
                ))}
              </div>

              {/* Order Summary */}
              <div className="h-fit lg:sticky lg:top-24">
                <OrderSummary
                  totalBooks={cart.length}
                  totalCopies={totalCopies}
                  onClearCart={clearCart}
                />
              </div>

            </div>
          )}

        </div>
      </main>
    </>
  );
}