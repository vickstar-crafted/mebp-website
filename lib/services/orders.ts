import { supabase } from "@/lib/supabase";

type CartItem = {
  id: number;
  quantity: number;
};

export type OrderResult = {
  id: number;
  order_reference: string;
};

type CreateOrderInput = {
  customerName: string;
  phone: string;
  schoolName: string;
  location: string;
  totalBooks: number;
  totalCopies: number;
  items: CartItem[];
};

export async function createOrder({
  customerName,
  phone,
  schoolName,
  location,
  totalBooks,
  totalCopies,
  items,
}: CreateOrderInput): Promise<OrderResult> {
  const { data, error } = await supabase
    .rpc("create_complete_order", {
      p_customer_name: customerName,
      p_phone: phone,
      p_school_name: schoolName,
      p_location: location,
      p_total_books: totalBooks,
      p_total_copies: totalCopies,
      p_items: items,
    })
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data as OrderResult;
}