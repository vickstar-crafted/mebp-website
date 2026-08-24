import { ReactNode } from "react";

type TableProps = {
  children: ReactNode;
  className?: string;
};

export default function Table({
  children,
  className = "",
}: TableProps) {
  return (
    <div
      className={`
        overflow-x-auto
        rounded-xl
        border
        border-gray-200
        bg-white
        ${className}
      `}
    >
      <table className="min-w-full">
        {children}
      </table>
    </div>
  );
}

type TableHeaderProps = {
  children: ReactNode;
  className?: string;
};

export function TableHeader({
  children,
  className = "",
}: TableHeaderProps) {
  return (
    <thead
      className={`
        bg-gray-100
        ${className}
      `}
    >
      {children}
    </thead>
  );
}

type TableBodyProps = {
  children: ReactNode;
  className?: string;
};

export function TableBody({
  children,
  className = "",
}: TableBodyProps) {
  return (
    <tbody className={className}>
      {children}
    </tbody>
  );
}

type TableRowProps = {
  children: ReactNode;
  className?: string;
};

export function TableRow({
  children,
  className = "",
}: TableRowProps) {
  return (
    <tr
      className={`
        border-t
        border-gray-200
        hover:bg-gray-50
        ${className}
      `}
    >
      {children}
    </tr>
  );
}

type TableHeadProps = {
  children: ReactNode;
  className?: string;
};

export function TableHead({
  children,
  className = "",
}: TableHeadProps) {
  return (
    <th
      className={`
        px-5
        py-4
        text-left
        text-sm
        font-semibold
        text-gray-700
        ${className}
      `}
    >
      {children}
    </th>
  );
}

type TableCellProps = {
  children: ReactNode;
  className?: string;
};

export function TableCell({
  children,
  className = "",
}: TableCellProps) {
  return (
    <td
      className={`
        px-5
        py-4
        text-sm
        text-gray-700
        ${className}
      `}
    >
      {children}
    </td>
  );
}