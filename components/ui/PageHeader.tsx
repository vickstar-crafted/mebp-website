import { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: ReactNode;
};

export default function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900">
        {title}
      </h1>

      {description && (
        <p className="mt-2 text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}