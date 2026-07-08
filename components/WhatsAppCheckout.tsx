"use client";

import { useState } from "react";
import CheckoutSuccessModal from "./CheckoutSuccessModal";
import { createOrder } from "@/lib/services/orders";
import { useCart } from "@/context/CartContext";
import { useCustomer } from "@/context/CustomerContext";

export default function WhatsAppCheckout() {
  const { cart, clearCart } = useCart();

  const { customer, validateCustomer } = useCustomer();

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderReference, setOrderReference] = useState("");

  async function handleCheckout() {
    if (loading) return;

    const valid = validateCustomer();

    if (!valid) {
      return;
    }

    setLoading(true);

    try {
      const order = await createOrder({
        customerName: customer.name,
        phone: customer.phone,
        schoolName: customer.school,
        location: customer.address,
        totalBooks: cart.length,
        totalCopies: cart.reduce(
          (sum, item) => sum + item.quantity,
          0
        ),
        items: cart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      });

      setOrderReference(order.order_reference);

      console.log("Order:", order);

      const orderReference = order.order_reference;

      const now = new Date();

      const orderDate = now.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const orderTime = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });

      let message = `Hello Model Educational Book Publishers,

I would like to place the following order.

━━━━━━━━━━━━━━━━━━━━━━

ORDER DETAILS

Order Reference:
${orderReference}

Order Date:
${orderDate}

Order Time:
${orderTime}

━━━━━━━━━━━━━━━━━━━━━━

BOOKS ORDERED

`;

      cart.forEach((item, index) => {
        message += `${index + 1}.

${item.title}

Quantity: ${item.quantity}

`;
      });

      const totalCopies = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      message += `━━━━━━━━━━━━━━━━━━━━━━

ORDER SUMMARY

Book Titles:
${cart.length}

Total Copies:
${totalCopies}

━━━━━━━━━━━━━━━━━━━━━━

CUSTOMER INFORMATION

Name:
${customer.name}

Phone:
${customer.phone}

School / Organisation:
${customer.school || "Not provided"}

Delivery Address:
${customer.address || "Not provided"}

━━━━━━━━━━━━━━━━━━━━━━

Thank you.

Regards,

${customer.name}
`;

      const phoneNumber = "2348033961238";

      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;

      window.open(url, "_blank");

      setShowModal(true);
    } catch (error) {
      console.error(error);

      alert(
        "Sorry, we couldn't process your order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={handleCheckout}
        disabled={cart.length === 0 || loading}
        className={`
w-full
py-3
rounded-xl
text-white
font-medium
transition-all
duration-200
${
  cart.length === 0 || loading
    ? "bg-gray-400 cursor-not-allowed"
    : "bg-green-700 hover:bg-green-800 active:scale-[0.98]"
}
`}
      >
        {loading
          ? "Processing Order..."
          : "Checkout via WhatsApp →"}
      </button>

      <CheckoutSuccessModal
        open={showModal}
        orderReference={orderReference}
        onContinue={() => setShowModal(false)}
        onClearCart={() => {
          clearCart();
          setShowModal(false);
        }}
      />
    </>
  );
}