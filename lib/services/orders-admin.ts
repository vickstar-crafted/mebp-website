import { supabase } from "@/lib/supabase";

export async function getOrders() {
  const { data, error } = await supabase
    .from("enquiries")
    .select(`
      id,
      order_reference,
      customer_name,
      phone,
      school_name,
      location,
      total_books,
      total_copies,
      status,
      created_at
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getOrderById(id: number) {
  const { data, error } = await supabase
    .from("enquiries")
    .select(`
      id,
      order_reference,
      customer_name,
      phone,
      school_name,
      location,
      total_books,
      total_copies,
      status,
      created_at,
      enquiry_items (
        quantity,
        books (
          id,
          title,
          slug,
          category_name
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateOrderStatus(
  id: number,
  status: string
) {
  const { error } = await supabase
    .from("enquiries")
    .update({
      status,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}