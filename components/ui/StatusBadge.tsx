type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const styles: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-800",
    Processing: "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  const statusStyle =
    styles[status] ?? "bg-gray-100 text-gray-800";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusStyle}`}
    >
      {status}
    </span>
  );
}