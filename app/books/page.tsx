import BooksCatalog from "@/components/BooksCatalog";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
  }>;
}) {
  const { category } = await searchParams;

let query = supabase
  .from("books")
  .select("*");

if (category) {
  query = query.eq("category_name", category);
}

const { data: books } = await query.order("display_order");

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-6 bg-gray-50 min-h-screen">
        <div className="mb-10">
  <h1 className="text-4xl font-bold text-gray-900">
  {category
    ? `${category} Books`
    : "Our Books"}
</h1>

  <p className="text-lg text-gray-600">
  {category
    ? `Browse our ${category.toLowerCase()} collection.`
    : "Browse all of our Educational Books for Nursery & Primary Schools."}
</p>
</div>

        <BooksCatalog books={books || []} />
      </main>
    </>
  );
}