"use client";

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

      <main className="max-w-7xl mx-auto px-6 py-10 bg-gray-50 min-h-screen">

  <h1 className="text-3xl font-bold text-gray-900 mb-8">
    Shopping Cart
  </h1>

  {cart.length === 0 ? (

    <div className="bg-white rounded-xl border p-8">
      <p className="text-gray-600">
        Your cart is empty.
      </p>
    </div>

  ) : (

    <div className="grid lg:grid-cols-3 gap-10">

      <div className="lg:col-span-2 space-y-4">

        {cart.map((item) => (

  <CartItem
    key={item.id}
    item={item}
  />

))}

      </div>

      <div className="lg:sticky lg:top-24 h-fit">

  <OrderSummary
    totalBooks={cart.length}
    totalCopies={totalCopies}
    onClearCart={clearCart}
  />

</div>

    </div>

  )}

</main>
    </>
  );
}