import React from "react";
import Image from "next/image";
import { Product } from "../types";
import { Button, QuantityControl } from "./ui/Button";
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
  return (
    <div className="w-full">
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-items-center">
        {products.map((product, idx) => {
          const productInCart = isInCart(product.name);

          return (
            <div key={product.name + idx} className="w-full max-w-[360px]">
              <div className="relative mb-3 w-full">
                <Image
                  src={product.image?.desktop}
                  alt={product.name}
                  width={250}
                  height={250}
                  className={`rounded-lg border-2 border-rose-100 w-full h-auto aspect-[5/4] md:aspect-square object-cover ${
                    productInCart ? "border-scarlet" : ""
                  }`}
                />

                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  {productInCart ? (
                    <QuantityControl
                      quantity={getQuantity(product.name)}
                      onIncrease={() =>
                        updateQuantity(
                          product.name,
                          getQuantity(product.name) + 1
                        )
                      }
                      onDecrease={() =>
                        updateQuantity(
                          product.name,
                          getQuantity(product.name) - 1
                        )
                      }
                      productName={product.name}
                    />
                  ) : (
                    <Button
                      onClick={() => addToCart(product as Product)}
                      className="w-max rounded-full flex gap-2 px-6 py-2 bg-rose-50 border-1 hover:border-scarlet border-rose-900 hover:cursor-pointer hover:text-scarlet"
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
                <p className="text-sm text-rose-500">{product.category}</p>
                <h2 className="font-semibold text-rose-950">{product.name}</h2>
                <p className="text-rose-700 font-semibold">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;
