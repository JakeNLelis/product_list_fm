import React from "react";
import { IncrementIcon, DecrementIcon } from "./Icons";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  disabled = false,
  "aria-label": ariaLabel,
  ...props
}) => {
  const baseStyles =
    "font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  const buttonClasses =
    `hover:cursor-pointer ${baseStyles} ${disabledStyles} ${className}`.trim();

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
};

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  productName: string;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  productName,
}) => {
  return (
    <div className="flex items-center gap-7 px-4 py-3 rounded-full bg-scarlet text-rose-50">
      <Button
        onClick={onDecrease}
        variant="secondary"
        size="sm"
        className="p-1 hover:text-scarlet border-1 border-rose-50 hover:bg-rose-50 rounded-full"
        aria-label={`Decrease quantity of ${productName}`}
      >
        <DecrementIcon className="" width={10} height={10} />
      </Button>
      <span className="w-8 text-center text-sm">{quantity}</span>
      <Button
        onClick={onIncrease}
        variant="secondary"
        size="sm"
        className="p-1 hover:text-scarlet border-1 border-rose-50 hover:bg-rose-50 rounded-full"
        aria-label={`Increase quantity of ${productName}`}
      >
        <IncrementIcon className="" width={10} height={10} />
      </Button>
    </div>
  );
};
