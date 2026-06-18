import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default async function BooksPage() {
  const { data: books } = await supabase
    .from("books")
    .select("*")
    .order("display_order");

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-8">
        Our Books
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books?.map((book) => (
          <div
  key={book.id}
  className="border rounded-xl p-5 shadow-sm"
>
  {book.cover_path && (
    <Image
      src={book.cover_path}
      alt={book.title}
      width={250}
      height={350}
      className="rounded-lg mb-4 w-full h-auto"
    />
  )}

  <h2 className="font-semibold mb-2">
    {book.title}
  </h2>

  <p className="text-sm mb-3">
    {book.category_name}
  </p>

  <p>
    {book.in_stock
      ? "✅ In Stock"
      : "❌ Out of Stock"}
  </p>
</div>
        ))}
      </div>
    </main>
  );
}