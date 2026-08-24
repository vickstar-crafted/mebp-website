"use client";

import { useCustomer } from "@/context/CustomerContext";

import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import SectionTitle from "@/components/ui/SectionTitle";

export default function CustomerForm() {
  const {
    customer,
    updateCustomer,
    errors,
  } = useCustomer();

  return (
    <div>
      <SectionTitle>
        Customer Information
      </SectionTitle>

      <div className="space-y-4">

        {/* Full Name */}

        <div>
          <Label>
            Full Name{" "}
            <span className="text-red-500">
              *
            </span>
          </Label>

          <Input
            type="text"
            placeholder="Enter your full name"
            value={customer.name}
            onChange={(e) =>
              updateCustomer({
                name: e.target.value,
              })
            }
            className={
              errors.name
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : ""
            }
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        {/* School / Organisation */}

        <div>
          <Label>
            School / Organisation
            <span className="text-gray-400">
              {" "}
              (Optional)
            </span>
          </Label>

          <Input
            type="text"
            placeholder="Enter school or organisation"
            value={customer.school}
            onChange={(e) =>
              updateCustomer({
                school: e.target.value,
              })
            }
            className={
              errors.school
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : ""
            }
          />

          {errors.school && (
            <p className="mt-1 text-sm text-red-600">
              {errors.school}
            </p>
          )}
        </div>

        {/* Phone Number */}

        <div>
          <Label>
            Phone Number{" "}
            <span className="text-red-500">
              *
            </span>
          </Label>

          <Input
            type="tel"
            inputMode="numeric"
            placeholder="e.g. 08033961238"
            value={customer.phone}
            onChange={(e) =>
              updateCustomer({
                phone: e.target.value,
              })
            }
            className={
              errors.phone
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : ""
            }
          />

          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Delivery Address */}

        <div>
          <Label>
            Delivery Address{" "}
            <span className="text-red-500">
              *
            </span>
          </Label>

          <Textarea
            rows={4}
            placeholder="Enter delivery address"
            value={customer.address}
            onChange={(e) =>
              updateCustomer({
                address: e.target.value,
              })
            }
            className={
              errors.address
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : ""
            }
          />

          {errors.address && (
            <p className="mt-1 text-sm text-red-600">
              {errors.address}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}