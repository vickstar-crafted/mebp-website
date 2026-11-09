import { requireAdmin } from "@/lib/admin-auth";

export async function getOrders() {
  const { supabase } = await requireAdmin();

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

  return data ?? [];
}

export async function getOrderById(id: number) {
  const { supabase } = await requireAdmin();

  const { data: order, error: orderError } = await supabase
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
    .eq("id", id)
    .single();

  if (orderError) {
    if (orderError.code === "PGRST116") {
      return null;
    }

    throw new Error(orderError.message);
  }

  if (!order) {
    return null;
  }

  const { data: items, error: itemsError } = await supabase
    .from("enquiry_items")
    .select(`
      book_id,
      quantity
    `)
    .eq("enquiry_id", id);

  if (itemsError) {
    throw new Error(itemsError.message);
  }

  if (!items || items.length === 0) {
    return {
      ...order,
      enquiry_items: [],
    };
  }

  const bookIds = items.map((item) => item.book_id);

  const { data: books, error: booksError } = await supabase
    .from("books")
    .select(`
      id,
      title,
      slug,
      category_name
    `)
    .in("id", bookIds);

  if (booksError) {
    throw new Error(booksError.message);
  }

  const enquiry_items = items.map((item) => ({
    quantity: item.quantity,
    book: books?.find(
      (book) => book.id === item.book_id
    ),
  }));

  return {
    ...order,
    enquiry_items,
  };
}

export async function updateOrderStatus(
  id: number,
  status: string
) {
  const { supabase } = await requireAdmin();

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