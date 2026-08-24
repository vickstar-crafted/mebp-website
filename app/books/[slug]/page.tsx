import AddToCart from "@/components/AddToCart";
import Image from "next/image";
import { Tag, CircleCheckBig } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
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

      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-10 md:grid-cols-2">
          
          {/* Book Cover */}
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
                transition-shadow
                duration-300
                hover:shadow-xl
              "
            />
          </div>

          {/* Book Information */}
          <div>
            {/* Category */}
            <Link
              href={`/books?category=${encodeURIComponent(
                book.category_name
              )}`}
              className="
                inline-flex
                items-center
                gap-2
                font-medium
                text-green-700
                transition-colors
                duration-200
                hover:text-green-800
                hover:underline
              "
            >
              <Tag size={16} />
              {book.category_name}
            </Link>

            {/* Title */}
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              {book.title}
            </h1>

            {/* Book Details */}
            <div className="mb-8 rounded-xl border bg-white p-5 shadow-sm">
              <div className="grid grid-cols-1 gap-5">
                
                {/* Publisher */}
                <div>
                  <p className="mb-1 text-xs uppercase tracking-widest text-gray-400">
                    Publisher
                  </p>

                  <p className="font-semibold text-gray-900">
                    Model Educational Book Publishers Ltd.
                  </p>
                </div>

                {/* Availability */}
                <div>
                  <p className="mb-1 text-xs uppercase tracking-wide text-gray-500">
                    Availability
                  </p>

                  <div className="flex items-center gap-2">
                    {book.in_stock ? (
                      <>
                        <CircleCheckBig
                          size={14}
                          className="text-green-600"
                        />

                        <span className="font-semibold text-green-700">
                          In Stock
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500" />

                        <span className="font-semibold text-red-600">
                          Out of Stock
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <p className="mb-1 text-xs uppercase tracking-wide text-gray-500">
                    Category
                  </p>

                  <p className="font-semibold text-gray-900">
                    {book.category_name}
                  </p>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            {book.in_stock ? (
              <AddToCart
                id={book.id}
                title={book.title}
                slug={book.slug}
                category_name={book.category_name}
              />
            ) : (
              <button
                disabled
                className="
                  w-full
                  cursor-not-allowed
                  rounded-xl
                  bg-gray-200
                  px-5
                  py-3
                  font-medium
                  text-gray-500
                "
              >
                Currently Out of Stock
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}