"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CircleCheckBig } from "lucide-react";
import QuickAddButton from "./QuickAddButton";
import QuickAddModal from "./QuickAddModal";
import CartToast from "./CartToast";

export default function BooksCatalog({
  books,
}: {
  books: any[];
}) {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedBook, setSelectedBook] =
    useState<any>(null);

  const [showQuickAdd, setShowQuickAdd] =
    useState(false);

  const [toast, setToast] = useState<{
    title: string;
    slug: string;
    quantity: number;
  } | null>(null);

  const categories = [
    "All",
    ...new Set(
      books.map((book) => book.category_name)
    ),
  ];

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === "All" ||
      book.category_name === selectedCategory;

    const matchesSearch =
      book.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Search */}

      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search books by title..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="
            w-full
            bg-white
            border
            rounded-xl
            px-4
            pr-12
            py-3
            text-sm
            text-gray-900
            placeholder:text-gray-500
            focus:outline-none
            focus:ring-2
            focus:ring-green-600
          "
        />

        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="
absolute

right-3

top-1/2

-translate-y-1/2

text-gray-400

hover:text-red-500

text-lg

font-bold

transition-all

duration-150

active:scale-90
"
          >
            ×
          </button>
        )}
      </div>

      {/* Categories */}

      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category)
            }
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? "bg-green-700 text-white"
                : "bg-white border text-gray-700 hover:border-green-700 hover:text-green-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Books */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="
group

bg-white

rounded-2xl

overflow-hidden

border

shadow-sm

hover:-translate-y-2

hover:shadow-2xl

transition-all

duration-300

ease-out

flex

flex-col
"
          >
            <Image
              src={`https://opigtrpgtyssktfybqqy.supabase.co/storage/v1/object/public/book-covers/${book.slug}.jpg`}
              alt={book.title}
              width={300}
              height={420}
              className="
w-full

object-cover

transition-transform

duration-500

group-hover:scale-105
"
            />

            <div className="p-5 flex flex-col flex-grow">

              <p className="text-xs text-blue-600 font-medium mb-2">
                {book.category_name}
              </p>

              <h2 className="font-semibold text-gray-900 text-sm leading-5 mb-3 min-h-[60px]">
                {book.title}
              </h2>

              <div className="flex items-center gap-2 mb-4">
    <CircleCheckBig
        size={14}
        className="text-green-600"
    />

    <span className="text-green-600 text-sm font-medium">
        In Stock
    </span>
</div>

              <div className="mt-auto flex flex-col gap-3">

                <Link
                  href={`/books/${book.slug}`}
                  className="
                    w-full
                    text-center
                    bg-green-700
                    text-white
                    px-3
                    py-2
                    rounded-xl
                    text-sm
                    hover:bg-green-800

active:scale-[0.98]

transition-all

duration-200
                  "
                >
                  View Details
                </Link>

                <QuickAddButton
                  book={book}
                  onQuickAdd={(selected) => {
                    setSelectedBook(selected);
                    setShowQuickAdd(true);
                  }}
                />

              </div>

            </div>

          </div>
        ))}
      </div>

      {/* ONE Modal */}

      {selectedBook && (
        <QuickAddModal
          open={showQuickAdd}
          onClose={() => {
            setShowQuickAdd(false);
            setSelectedBook(null);
          }}
          book={selectedBook}
          onAdded={(
            title,
            slug,
            quantity
          ) => {
            setToast({
              title,
              slug,
              quantity,
            });

            setTimeout(() => {
              setToast(null);
            }, 3000);
          }}
        />
      )}

      {/* ONE Toast */}

      {toast && (
        <CartToast
          title={toast.title}
          slug={toast.slug}
          quantity={toast.quantity}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}