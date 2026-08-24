"use client";

type QuantitySelectorProps = {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  size?: "sm" | "md" | "lg";
};

export default function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  size = "md",
}: QuantitySelectorProps) {
  const sizes = {
    sm: {
      button: "px-3 py-2 text-base",
      input: "w-14 py-2 text-sm",
    },

    md: {
      button: "px-4 py-3 text-lg",
      input: "w-20 py-3 text-base",
    },

    lg: {
      button: "px-5 py-4 text-xl",
      input: "w-24 py-4 text-lg",
    },
  };

  return (
    <div className="inline-flex items-center rounded-xl border border-gray-200 bg-white overflow-hidden">
      {/* Minus */}
      <button
        type="button"
        onClick={() =>
          onChange(Math.max(min, quantity - 1))
        }
        className={`
          ${sizes[size].button}
          font-semibold
          text-gray-900
          hover:bg-gray-100
          active:scale-90
          transition-all
          duration-150
        `}
        aria-label="Decrease quantity"
      >
        −
      </button>

      {/* Quantity */}
      <input
        type="number"
        min={min}
        value={quantity}
        onChange={(e) =>
          onChange(
            Math.max(
              min,
              Number(e.target.value) || min
            )
          )
        }
        className={`
          border-x
          border-gray-200
          text-center
          outline-none
          text-gray-900
          font-medium
          ${sizes[size].input}
        `}
        aria-label="Quantity"
      />

      {/* Plus */}
      <button
        type="button"
        onClick={() =>
          onChange(quantity + 1)
        }
        className={`
          ${sizes[size].button}
          font-semibold
          text-gray-900
          hover:bg-gray-100
          active:scale-90
          transition-all
          duration-150
        `}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}