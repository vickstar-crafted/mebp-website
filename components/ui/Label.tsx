import type { LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export default function Label({
  children,
  className = "",
  ...props
}: LabelProps) {
  return (
    <label
      {...props}
      className={`mb-2 block font-medium text-gray-700 ${className}`}
    >
      {children}
    </label>
  );
}