import React from "react";
import Image from "next/image";
import { CartItem } from "../types";
import { Button, QuantityControl } from "./ui/Button";

interface CartCardProps {
  cart: CartItem[];
  getTotalPrice: () => number;
  removeFromCart: (productName: string) => void;
  updateQuantity: (productName: string, quantity: number) => void;
}

function CartCard({
  cart,
  getTotalPrice,
  removeFromCart,
  updateQuantity,
}: CartCardProps) {
  const totalPrice = getTotalPrice();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Your Cart ({cart.length})</h1>

      {cart.length === 0 ? (
        <div className="text-center py-8">
          <Image
            src="/images/illustration-empty-cart.svg"
            alt="Empty Cart"
            width={120}
            height={80}
            className="mx-auto mb-4"
          />
          <p className="text-gray-500">Your added items will appear here</p>
        </div>
      ) : (
        <>
          <ul className="space-y-2 mb-4">
            {cart.map((item) => (
              <li
                key={item.name}
                className="flex items-center gap-2 p-2 border-b"
              >
                <Image
                  src={item.image.thumbnail}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="rounded"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">{item.name}</div>
                  <div className="text-sm text-gray-600">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </div>
                  <div className="text-sm font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
                <QuantityControl
                  quantity={item.quantity}
                  onIncrease={() =>
                    updateQuantity(item.name, item.quantity + 1)
                  }
                  onDecrease={() =>
                    updateQuantity(item.name, item.quantity - 1)
                  }
                  onRemove={() => removeFromCart(item.name)}
                  productName={item.name}
                />
              </li>
            ))}
          </ul>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-lg">
                Total: ${totalPrice.toFixed(2)}
              </span>
            </div>

            <Button
              onClick={() => alert("Order confirmed!")}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              Confirm Order
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartCard;
