import { useState, useCallback } from "react";
import { CartItem, Product } from "../types";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.name === product.name);
      if (existingItem) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productName: string) => {
    setCart((prev) => prev.filter((item) => item.name !== productName));
  }, []);

  const updateQuantity = useCallback(
    (productName: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productName);
        return;
      }

      setCart((prev) =>
        prev.map((item) =>
          item.name === productName ? { ...item, quantity } : item
        )
      );
    },
    [removeFromCart]
  );

  const getQuantity = useCallback(
    (productName: string): number => {
      const item = cart.find((item) => item.name === productName);
      return item ? item.quantity : 0;
    },
    [cart]
  );

  const isInCart = useCallback(
    (productName: string): boolean => {
      return cart.some((item) => item.name === productName);
    },
    [cart]
  );

  const getTotalItems = useCallback((): number => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const getTotalPrice = useCallback((): number => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    getQuantity,
    isInCart,
    getTotalItems,
    getTotalPrice,
    clearCart,
  };
};
