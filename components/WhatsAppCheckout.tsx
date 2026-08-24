"use client";

import { useState } from "react";

import CheckoutSuccessModal from "./CheckoutSuccessModal";
import { createOrder } from "@/lib/services/orders";

import { useCart } from "@/context/CartContext";
import { useCustomer } from "@/context/CustomerContext";

export default function WhatsAppCheckout() {
  const { cart, clearCart } = useCart();

  const {
    customer,
    validateCustomer,
    normalizePhoneNumber,
    clearCustomer,
  } = useCustomer();

  const [showModal, setShowModal] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [orderReference, setOrderReference] =
    useState("");

  async function handleCheckout() {
    // Prevent duplicate orders while processing
    if (loading) return;

    // Prevent checkout with an empty cart
    if (cart.length === 0) return;

    // Validate customer information
    const valid = validateCustomer();

    if (!valid) {
      return;
    }

    setLoading(true);

    try {
      /*
        Normalize the phone number before
        saving it to Supabase and displaying
        it in the WhatsApp order.
      */

      const normalizedPhone =
        normalizePhoneNumber(customer.phone);

      /*
        CREATE ORDER
      */

      const order = await createOrder({
        customerName: customer.name.trim(),

        phone: normalizedPhone,

        schoolName:
          customer.school.trim(),

        location:
          customer.address.trim(),

        totalBooks: cart.length,

        totalCopies: cart.reduce(
          (sum, item) =>
            sum + item.quantity,
          0
        ),

        items: cart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      });

      /*
        STORE ORDER REFERENCE
      */

      const reference =
        order.order_reference;

      setOrderReference(reference);

      console.log(
        "Order created:",
        order
      );

      /*
        CREATE DATE AND TIME
      */

      const now = new Date();

      const orderDate =
        now.toLocaleDateString(
          "en-GB",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        );

      const orderTime =
        now.toLocaleTimeString(
          "en-GB",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        );

      /*
        BUILD WHATSAPP MESSAGE
      */

      let message =
        `Hello Model Educational Book Publishers,

I would like to place the following order.

━━━━━━━━━━━━━━━━━━━━━━

ORDER DETAILS

Order Reference:
${reference}

Order Date:
${orderDate}

Order Time:
${orderTime}

━━━━━━━━━━━━━━━━━━━━━━

BOOKS ORDERED

`;

      /*
        ADD EACH BOOK
      */

      cart.forEach((item, index) => {
        message += `${index + 1}.

${item.title}

Quantity: ${item.quantity}

`;
      });

      /*
        CALCULATE TOTAL COPIES
      */

      const totalCopies =
        cart.reduce(
          (sum, item) =>
            sum + item.quantity,
          0
        );

      /*
        ADD ORDER SUMMARY AND
        CUSTOMER INFORMATION
      */

      message +=
        `━━━━━━━━━━━━━━━━━━━━━━

ORDER SUMMARY

Book Titles:
${cart.length}

Total Copies:
${totalCopies}

━━━━━━━━━━━━━━━━━━━━━━

CUSTOMER INFORMATION

Name:
${customer.name.trim()}

Phone:
${normalizedPhone}

School / Organisation:
${customer.school.trim() || "Not provided"}

Delivery Address:
${customer.address.trim()}

━━━━━━━━━━━━━━━━━━━━━━

Thank you.

Regards,

${customer.name.trim()}
`;

      /*
        MEBP WHATSAPP BUSINESS NUMBER

        This number is where the completed
        order message will be sent.
      */

      const phoneNumber =
        "2348033961238";

      /*
        CREATE WHATSAPP URL
      */

      const url =
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          message
        )}`;

      /*
        OPEN WHATSAPP
      */

      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );

      /*
        SHOW SUCCESS MODAL
      */

      setShowModal(true);
    } catch (error) {
      console.error(
        "Checkout error:",
        error
      );

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
        type="button"
        onClick={handleCheckout}
        disabled={
          cart.length === 0 || loading
        }
        className={`
          w-full
          rounded-xl
          py-3
          font-medium
          text-white
          transition-all
          duration-200
          ${
            cart.length === 0 || loading
              ? "cursor-not-allowed bg-gray-400"
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
        onContinue={() =>
          setShowModal(false)
        }
        onClearCart={() => {
          clearCart();
          clearCustomer();
          setShowModal(false);
        }}
      />
    </>
  );
}