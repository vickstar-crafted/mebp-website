import Link from "next/link";
import { getOrders } from "@/lib/services/admin";

import PageHeader from "@/components/ui/PageHeader";
import Table, {
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import StatusBadge from "@/components/ui/StatusBadge";

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <>
      <PageHeader
        title="Orders"
        description="Manage customer enquiries."
      />

      <Table>
        <TableHeader>
          <TableRow className="border-t-0 hover:bg-gray-100">
            <TableHead className="text-gray-900">
              Reference
            </TableHead>

            <TableHead className="text-gray-900">
              Customer
            </TableHead>

            <TableHead className="text-gray-900">
              Phone
            </TableHead>

            <TableHead className="text-center text-gray-900">
              Books
            </TableHead>

            <TableHead className="text-center text-gray-900">
              Copies
            </TableHead>

            <TableHead className="text-center text-gray-900">
              Status
            </TableHead>

            <TableHead className="text-gray-900">
              Date
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="text-gray-900">
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="
                    font-medium
                    text-green-700
                    hover:underline
                  "
                >
                  {order.order_reference}
                </Link>
              </TableCell>

              <TableCell className="text-gray-900">
                {order.customer_name}
              </TableCell>

              <TableCell className="text-gray-900">
                {order.phone}
              </TableCell>

              <TableCell className="text-center text-gray-900">
                {order.total_books}
              </TableCell>

              <TableCell className="text-center text-gray-900">
                {order.total_copies}
              </TableCell>

              <TableCell className="text-center">
                <StatusBadge status={order.status} />
              </TableCell>

              <TableCell className="text-gray-900">
                {new Date(
                  order.created_at
                ).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}