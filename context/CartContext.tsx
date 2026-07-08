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
      setCart(JSON.parse(savedCart));
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

      if (existing) {
        return current.map((book) =>
          book.id === item.id
            ? {
                ...book,
                quantity:
                  book.quantity + item.quantity,
              }
            : book
        );
      }

      return [...current, item];
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
              quantity: Math.max(1, quantity),
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