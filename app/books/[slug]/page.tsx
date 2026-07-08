import AddToCart from "@/components/AddToCart";
import Image from "next/image";
import { Tag } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { CircleCheckBig } from "lucide-react";
import { notFound } from "next/navigation";

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: book } = await supabase
    .from("books")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!book) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-10 bg-gray-50 min-h-screen">
  <div className="grid md:grid-cols-2 gap-10">

    <div>
  <Image
    src={`https://opigtrpgtyssktfybqqy.supabase.co/storage/v1/object/public/book-covers/${book.slug}.jpg`}
    alt={book.title}
    width={400}
    height={560}
    className="
rounded-xl
border
shadow-lg
hover:shadow-xl
transition-shadow
duration-300
"
  />
</div>
    <div>
      <Link
  href={`/books?category=${encodeURIComponent(book.category_name)}`}
  className="
    inline-flex
    items-center
    gap-2

    text-green-700

    font-medium

    hover:text-green-800

    hover:underline

    transition-colors

    duration-200
  "
>
  <Tag size={16} />
  {book.category_name}
</Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {book.title}
      </h1>

      <div className="bg-white border rounded-xl p-5 mb-8 shadow-sm">

  <div className="grid grid-cols-1 gap-5">

    <div>
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
  Publisher
</p>

<p className="font-semibold text-gray-900">
  Model Educational Book Publishers Ltd.
</p>
    </div>

    <div>
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
        Availability
      </p>

      <div className="flex items-center gap-2">
    <CircleCheckBig
        size={14}
        className="text-green-600"
    />

    <span className="font-semibold text-green-700">
        In Stock
    </span>
</div>
    </div>

    <div>
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
        Category
      </p>

      <p className="font-semibold text-gray-900">
        {book.category_name}
      </p>
    </div>

  </div>

</div>

      <AddToCart
  id={book.id}
  title={book.title}
  slug={book.slug}
  category_name={book.category_name}
/>
    </div>

  </div>
</main>
    </>
  );
}