"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";

const ALLOWED_STATUSES = [
  "Pending",
  "Processing",
  "Completed",
  "Cancelled",
] as const;

export async function updateOrderStatusAction(
  orderId: number,
  status: string
) {
  const { supabase } = await requireAdmin();

  if (!Number.isInteger(orderId) || orderId <= 0) {
    return {
      success: false,
      message: "Invalid order ID.",
    };
  }

  if (
    !ALLOWED_STATUSES.includes(
      status as (typeof ALLOWED_STATUSES)[number]
    )
  ) {
    return {
      success: false,
      message: "Invalid order status.",
    };
  }

  const { data, error } = await supabase
    .from("enquiries")
    .update({ status })
    .eq("id", orderId)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("Order status update failed:", error.message);

    return {
      success: false,
      message: "Unable to update order status. Please try again.",
    };
  }

  if (!data) {
    return {
      success: false,
      message: "Order not found or you are not authorized to update it.",
    };
  }

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);

  return {
    success: true,
    message: "Order status updated successfully.",
  };
}