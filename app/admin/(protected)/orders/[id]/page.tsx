
import { getOrderById } from "@/lib/services/admin";
import { notFound } from "next/navigation";
import OrderStatusEditor from "./OrderStatusEditor";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderPage({
  params,
}: PageProps) {
  const { id } = await params;

  const orderId = Number(id);

  if (!Number.isInteger(orderId) || orderId <= 0) {
    notFound();
  }

  const order = await getOrderById(orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-8 text-gray-900">
      {/* Page Header */}

      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          {order.order_reference}
        </h1>

        <p className="mt-2 text-gray-600">
          Order Details
        </p>
      </div>

      {/* Customer Information */}

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-5 text-xl font-semibold text-gray-900">
          Customer Information
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Customer */}

          <div>
            <p className="text-sm font-medium text-gray-700">
              Customer
            </p>

            <p className="mt-1 text-gray-900">
              {order.customer_name}
            </p>
          </div>

          {/* Phone */}

          <div>
            <p className="text-sm font-medium text-gray-700">
              Phone
            </p>

            <p className="mt-1 text-gray-900">
              {order.phone}
            </p>
          </div>

          {/* School */}

          <div>
            <p className="text-sm font-medium text-gray-700">
              School
            </p>

            <p className="mt-1 text-gray-900">
              {order.school_name}
            </p>
          </div>

          {/* Delivery Address */}

          <div className="sm:col-span-2">
            <p className="text-sm font-medium text-gray-700">
              Delivery Address
            </p>

            <p className="mt-1 text-gray-900">
              {order.location}
            </p>
          </div>
        </div>
      </div>

      {/* Order Status Management */}

      <OrderStatusEditor
        orderId={order.id}
        currentStatus={order.status}
      />

      {/* Books Ordered */}

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-5 text-xl font-semibold text-gray-900">
          Books Ordered
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-gray-900">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 text-left font-semibold text-gray-900">
                  Book
                </th>

                <th className="py-3 text-center font-semibold text-gray-900">
                  Quantity
                </th>
              </tr>
            </thead>

            <tbody>
              {order.enquiry_items.map(
                (item: any, index: number) => (
                  <tr
                    key={`${item.book?.id ?? index}-${index}`}
                    className="border-b border-gray-200"
                  >
                    <td className="py-4 text-gray-900">
                      {item.book?.title ?? "Book unavailable"}
                    </td>

                    <td className="py-4 text-center text-gray-900">
                      {item.quantity}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-5 text-xl font-semibold text-gray-900">
          Summary
        </h2>

        <div className="space-y-2 text-gray-900">
          <p>
            <strong className="font-semibold text-gray-900">
              Total Books:
            </strong>{" "}
            {order.total_books}
          </p>

          <p>
            <strong className="font-semibold text-gray-900">
              Total Copies:
            </strong>{" "}
            {order.total_copies}
          </p>

          <p>
            <strong className="font-semibold text-gray-900">
              Created:
            </strong>{" "}
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
