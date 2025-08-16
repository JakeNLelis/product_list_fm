import React from "react";
import Image from "next/image";
import { CartItem } from "../../types";
import { Button } from "./Button";
import orderConfirmed from "../../../public/images/icon-order-confirmed.svg";

interface OrderConfirmationModalProps {
  isOpen: boolean;
  cart: CartItem[];
  totalPrice: number;
  onStartNewOrder: () => void;
}

// Modal component following Single Responsibility Principle
export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  isOpen,
  cart,
  totalPrice,
  onStartNewOrder,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
      <div className="bg-white w-full sm:max-w-md sm:rounded-lg rounded-t-2xl sm:rounded-t-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="mb-6">
            <Image
              src={orderConfirmed}
              alt="Order Confirmed"
              width={42}
              height={42}
              className="mb-4"
            />
            <h2 className="text-4xl font-bold text-rose-900 mb-2">
              Order Confirmed
            </h2>
            <p className="text-rose-500 text-sm">
              We hope you enjoy your food!
            </p>
          </div>

          <div className="bg-rose-50 rounded-lg p-4 mb-6">
            <ul className="space-y-3">
              {cart.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center gap-3 pb-3 border-b border-rose-100"
                >
                  <Image
                    src={item.image.thumbnail}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-rose-900 text-sm">
                      {item.name}
                    </h3>
                    <div className="flex gap-3 text-sm text-rose-600">
                      <span className="font-semibold text-rose-700">
                        {item.quantity}x
                      </span>
                      <span className="text-rose-500">
                        @ ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="font-semibold text-rose-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center pt-4 mt-4">
              <span className="text-sm text-rose-500">Order Total</span>
              <span className="font-bold text-xl text-rose-900">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <Button
            onClick={onStartNewOrder}
            className="w-full bg-scarlet hover:bg-rose-800 text-rose-50 py-3 rounded-full"
          >
            Start New Order
          </Button>
        </div>
      </div>
    </div>
  );
};
