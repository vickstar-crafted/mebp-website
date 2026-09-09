"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type CartItem = {
  id: number;
  title: string;
  slug: string;
  quantity: number;
  category_name?: string;
};

type CartContextType = {
  cart: CartItem[];
  mounted: boolean;

  addToCart: (item: CartItem) => void;

  updateQuantity: (
    id: number,
    quantity: number
  ) => void;

  removeFromCart: (id: number) => void;

  clearCart: () => void;
};

const CartContext =
  createContext<CartContextType | null>(null);

const MINIMUM_ORDER_QUANTITY = 5;

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Start with an empty cart on both server and client
  const [cart, setCart] = useState<CartItem[]>([]);

  // Indicates when the client has mounted
  const [mounted, setMounted] =
    useState(false);

  // Load cart from localStorage after mount
  useEffect(() => {
    const savedCart =
      localStorage.getItem("mebp-cart");

    if (savedCart) {
      try {
        const parsedCart: CartItem[] =
          JSON.parse(savedCart);

        // Ensure every existing saved item
        // follows the new minimum quantity rule.
        const normalizedCart = parsedCart.map(
          (item) => ({
            ...item,
            quantity: Math.max(
              MINIMUM_ORDER_QUANTITY,
              item.quantity
            ),
          })
        );

        setCart(normalizedCart);
      } catch (error) {
        console.error(
          "Failed to load saved cart:",
          error
        );

        localStorage.removeItem("mebp-cart");
      }
    }

    setMounted(true);
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem(
      "mebp-cart",
      JSON.stringify(cart)
    );
  }, [cart, mounted]);

  const addToCart = (item: CartItem) => {
    setCart((current) => {
      const existing = current.find(
        (book) => book.id === item.id
      );

      // Always enforce the minimum quantity
      // when a new item is added.
      const incomingQuantity = Math.max(
        MINIMUM_ORDER_QUANTITY,
        item.quantity
      );

      if (existing) {
        return current.map((book) =>
          book.id === item.id
            ? {
                ...book,
                quantity:
                  Math.max(
                    MINIMUM_ORDER_QUANTITY,
                    book.quantity
                  ) + incomingQuantity,
              }
            : book
        );
      }

      return [
        ...current,
        {
          ...item,
          quantity: incomingQuantity,
        },
      ];
    });
  };

  function updateQuantity(
    id: number,
    quantity: number
  ) {
    setCart((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                MINIMUM_ORDER_QUANTITY,
                quantity
              ),
            }
          : item
      )
    );
  }

  function removeFromCart(id: number) {
    setCart((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  }

  function clearCart() {
    setCart([]);

    localStorage.removeItem(
      "mebp-cart"
    );
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        mounted,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}