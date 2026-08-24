import {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Variant =
  | "primary"
  | "secondary"
  | "danger"
  | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  fullWidth?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const variants: Record<Variant, string> = {
    primary:
      "bg-green-700 text-white hover:bg-green-800",

    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200",

    danger:
      "bg-red-600 text-white hover:bg-red-700",

    outline:
      "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100",
  };

  return (
    <button
      {...props}
      className={`
        rounded-xl
        px-5
        py-3
        font-medium
        transition-all
        duration-200
        active:scale-[0.98]
        disabled:opacity-50
        disabled:pointer-events-none
        ${fullWidth ? "w-full" : ""}
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}