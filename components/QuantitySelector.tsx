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
    <div
      className="
        inline-flex
        items-center
        overflow-hidden
        rounded-xl
        border
        bg-white
        shadow-sm
      "
    >
      <button
        onClick={() =>
          onChange(Math.max(min, quantity - 1))
        }
        className={`
font-semibold

hover:bg-gray-100

active:scale-90

transition-all

duration-150

${sizes[size].button}
`}
      >
        −
      </button>

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

text-center

outline-none

text-gray-900

font-medium

transition-all

duration-150

focus:scale-105

${sizes[size].input}
`}
      />

      <button
        onClick={() =>
          onChange(quantity + 1)
        }
        className={`
font-semibold

hover:bg-gray-100

active:scale-90

transition-all

duration-150

${sizes[size].button}
`}
      >
        +
      </button>
    </div>
  );
}