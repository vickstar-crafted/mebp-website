import { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
  className?: string;
};

export default function SectionTitle({
  children,
  className = "",
}: SectionTitleProps) {
  return (
    <h2
      className={`
        mb-5
        text-xl
        font-semibold
        text-gray-900
        ${className}
      `}
    >
      {children}
    </h2>
  );
}