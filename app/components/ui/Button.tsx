import React from "react";

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

  const buttonClasses = `${baseStyles} ${disabledStyles} ${className}`.trim();

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
  onRemove: () => void;
  productName: string;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
  productName,
}) => {
  return (
    <div className="flex items-center gap-1">
      <Button
        onClick={onDecrease}
        variant="secondary"
        size="sm"
        className="w-6 h-6 p-0"
        aria-label={`Decrease quantity of ${productName}`}
      >
        -
      </Button>
      <span className="w-8 text-center text-sm">{quantity}</span>
      <Button
        onClick={onIncrease}
        variant="secondary"
        size="sm"
        className="w-6 h-6 p-0"
        aria-label={`Increase quantity of ${productName}`}
      >
        +
      </Button>
      <Button
        onClick={onRemove}
        variant="danger"
        size="sm"
        className="ml-2 text-xs"
        aria-label={`Remove ${productName} from cart`}
      >
        ✕
      </Button>
    </div>
  );
};
