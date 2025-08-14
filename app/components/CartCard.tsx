import React from "react";
import Image from "next/image";
import { CartItem } from "../types";
import { Button } from "./ui/Button";
import { RemoveIcon } from "./ui/Icons";
import carbonNeutral from "../../public/images/icon-carbon-neutral.svg";
interface CartCardProps {
  cart: CartItem[];
  getTotalPrice: () => number;
  removeFromCart: (productName: string) => void;
  updateQuantity: (productName: string, quantity: number) => void;
}

function CartCard({ cart, getTotalPrice, removeFromCart }: CartCardProps) {
  const totalPrice = getTotalPrice();

  return (
    <div className="p-4 text-scarlet">
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
          <p className="text-sm text-rose-800">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <>
          <ul className="space-y-2 mb-4">
            {cart.map((item) => (
              <li
                key={item.name}
                className="flex items-center gap-2 p-2 border-b border-rose-100"
              >
                <div className="flex-1">
                  <div className="font-semibold text-sm text-rose-900 mb-1">
                    {item.name}
                  </div>
                  <div className="flex gap-2 text-sm text-rose-500">
                    <span className="font-semibold mr-0.5 text-rose-700">
                      {item.quantity}x
                    </span>{" "}
                    <span>@ ${item.price.toFixed(2)}</span>{" "}
                    <span className="font-semibold ">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button
                  className="border-1 rounded-full p-1 border-rose-400 text-rose-400 hover:text-rose-800 hover:border-rose-800 hover:cursor-pointer"
                  onClick={() => removeFromCart(item.name)}
                >
                  <RemoveIcon className="" width={8} height={8} />
                </Button>
              </li>
            ))}
          </ul>

          <div className="py-4 text-rose-900">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm">Order Total</span>
              <span className="text-lg font-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2 justify-center py-3 mb-4 bg-rose-100 rounded-md">
              <Image
                src={carbonNeutral}
                alt="Carbon Neutral"
                width={16}
                height={16}
              />
              <p className="text-sm">
                This is a <b>carbon-neutral</b> delivery
              </p>
            </div>

            <Button
              onClick={() => alert("Order confirmed!")}
              className="w-full text-rose-50 py-4 rounded-full bg-scarlet hover:bg-rose-800"
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
