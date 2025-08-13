"use client";

import React from "react";
import ProductList from "./components/ProductList";
import CartCard from "./components/CartCard";
import Attribution from "./components/Attribution";
import { useCart } from "./hooks/useCart";

export default function Home() {
  const cartActions = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Desserts
              </h1>
            </div>
            <ProductList
              addToCart={cartActions.addToCart}
              updateQuantity={cartActions.updateQuantity}
              getQuantity={cartActions.getQuantity}
              isInCart={cartActions.isInCart}
            />
          </main>

          <aside className="w-full lg:w-96 lg:sticky lg:top-8 lg:h-fit">
            <div className="bg-white rounded-lg shadow-sm border">
              <CartCard
                cart={cartActions.cart}
                getTotalPrice={cartActions.getTotalPrice}
                removeFromCart={cartActions.removeFromCart}
                updateQuantity={cartActions.updateQuantity}
              />
            </div>
          </aside>
        </div>

        <div className="mt-16">
          <Attribution />
        </div>
      </div>
    </div>
  );
}
