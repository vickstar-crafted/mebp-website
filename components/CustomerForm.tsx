"use client";

import { useCustomer } from "@/context/CustomerContext";
export default function CustomerForm() {
    const {
  customer,
  updateCustomer,
} = useCustomer();
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Customer Information
      </h3>

      <div className="space-y-4">
        <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Full Name <span className="text-red-500">*</span>
  </label>

  <input
    type="text"
    required
    placeholder="Enter your full name"
    value={customer.name}
    onChange={(e) =>
      updateCustomer({
        name: e.target.value,
      })
    }
    className="
      w-full
      border
      rounded-xl
      px-4
      py-3
      text-gray-900
      focus:ring-2
      focus:ring-green-600
      outline-none
    "
  />
</div>

        <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    School / Organisation
    <span className="text-gray-400">
      {" "}
      (Optional)
    </span>
  </label>

  <input
    type="text"
    placeholder="Enter school or organisation"
    value={customer.school}
    onChange={(e) =>
      updateCustomer({
        school: e.target.value,
      })
    }
    className="
      w-full
      border
      rounded-xl
      px-4
      py-3
      text-gray-900
      focus:ring-2
      focus:ring-green-600
      outline-none
    "
  />
</div>

        <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Phone Number <span className="text-red-500">*</span>
  </label>

  <input
    type="tel"
    required
    placeholder="Enter your phone number"
    value={customer.phone}
    onChange={(e) =>
      updateCustomer({
        phone: e.target.value,
      })
    }
    className="
      w-full
      border
      rounded-xl
      px-4
      py-3
      text-gray-900
      focus:ring-2
      focus:ring-green-600
      outline-none
    "
  />
</div>

        <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Delivery Address
    <span className="text-gray-400">
      {" "}
      (Optional)
    </span>
  </label>

  <textarea
    rows={4}
    placeholder="Enter delivery address"
    value={customer.address}
    onChange={(e) =>
      updateCustomer({
        address: e.target.value,
      })
    }
    className="
      w-full
      border
      rounded-xl
      px-4
      py-3
      text-gray-900
      focus:ring-2
      focus:ring-green-600
      outline-none
    "
  />
</div>
      </div>
    </div>
  );
}