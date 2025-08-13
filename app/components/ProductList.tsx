import React from "react";
import Image from "next/image";
import { Product } from "../types";
import { Button } from "./ui/Button";
import products from "../../data.json";

import addRoCart from "../../public/images/icon-add-to-cart.svg";

interface ProductListProps {
  addToCart: (product: Product) => void;
  updateQuantity: (productName: string, quantity: number) => void;
  getQuantity: (productName: string) => number;
  isInCart: (productName: string) => boolean;
}

function ProductList({
  addToCart,
  updateQuantity,
  getQuantity,
  isInCart,
}: ProductListProps) {
  const handleQuantityChange = (product: Product, value: string) => {
    const qty = Math.max(1, Number(value));
    updateQuantity(product.name, qty);
  };

  return (
    <div className="w-full">
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {products.map((product, idx) => {
          const productInCart = isInCart(product.name);

          return (
            <div key={product.name + idx}>
              <div className="relative mb-3 w-max">
                <Image
                  src={product.image?.thumbnail}
                  alt={product.name}
                  width={250}
                  height={250}
                  className="rounded-lg"
                />

                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  {productInCart ? (
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor={`qty-${product.name}`}
                        className="sr-only"
                      >
                        Quantity for {product.name}
                      </label>
                      <input
                        id={`qty-${product.name}`}
                        type="number"
                        min={1}
                        value={getQuantity(product.name)}
                        onChange={(e) =>
                          handleQuantityChange(product, e.target.value)
                        }
                        className="border rounded px-3 py-2 w-20 text-center"
                      />
                      <span className="text-sm text-gray-600">in cart</span>
                    </div>
                  ) : (
                    <Button
                      onClick={() => addToCart(product as Product)}
                      className="w-max rounded-full flex gap-2 px-6 py-2 bg-white border-1 border-black"
                    >
                      <Image
                        src={addRoCart}
                        alt="Add to Cart"
                        width={16}
                        height={16}
                      />
                      Add to Cart
                    </Button>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm text-gray-500">{product.category}</p>
                <h2 className="font-semibold text-gray-900">{product.name}</h2>
                <p className="text-red-600">${product.price.toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;
