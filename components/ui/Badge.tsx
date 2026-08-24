import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export default function Badge({
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${className}`}
    >
      {children}
    </span>
  );
}