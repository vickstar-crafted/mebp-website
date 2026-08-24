import { createClient } from "@/lib/supabase-server";

export async function getOrders() {
  const supabase = await createClient();

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
  const supabase = await createClient();

  // ----------------------------------
  // 1. Fetch the order
  // ----------------------------------

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
    throw new Error(orderError.message);
  }

  if (!order) {
    return null;
  }

  // ----------------------------------
  // 2. Fetch enquiry items
  // ----------------------------------

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

  console.log("ITEMS");
  console.dir(items, { depth: null });

  // ----------------------------------
  // 3. No books?
  // ----------------------------------

  if (!items || items.length === 0) {
    return {
      ...order,
      enquiry_items: [],
    };
  }

  // ----------------------------------
  // 4. Fetch all books
  // ----------------------------------

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

  console.log("BOOKS");
  console.dir(books, { depth: null });

  // ----------------------------------
  // 5. Merge books into items
  // ----------------------------------

  const enquiry_items = items.map((item) => ({
    quantity: item.quantity,
    book: books?.find((book) => book.id === item.book_id),
  }));

  console.log("FINAL");
  console.dir(enquiry_items, { depth: null });

  return {
    ...order,
    enquiry_items,
  };
}

export async function updateOrderStatus(
  id: number,
  status: string
) {
  const supabase = await createClient();

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