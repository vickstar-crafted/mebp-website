"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  CircleCheckBig,
  Search,
  X,
} from "lucide-react";

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
    ...Array.from(
      new Set(
        books
          .map((book) => book.category_name)
          .filter(Boolean)
      )
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
      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search books by title..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-gray-200
            bg-white
            py-3
            pl-11
            pr-12
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
            type="button"
            onClick={() => setSearchTerm("")}
            aria-label="Clear search"
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-gray-400
              transition
              hover:text-red-500
            "
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() =>
              setSelectedCategory(category)
            }
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              selectedCategory === category
                ? "bg-green-700 text-white shadow-sm"
                : "border border-gray-200 bg-white text-gray-700 hover:border-green-700 hover:text-green-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Books */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="
                group
                flex
                flex-col
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-sm
                transition-all
                duration-300
                ease-out
                hover:-translate-y-2
                hover:shadow-xl
              "
            >
              <div className="overflow-hidden bg-gray-100">
                <Image
  src={`https://opigtrpgtyssktfybqqy.supabase.co/storage/v1/object/public/book-covers/${book.slug}.jpg`}
  alt={book.title}
  width={300}
  height={420}
  unoptimized
                  className="
                    h-auto
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />
              </div>

              <div className="flex flex-grow flex-col p-5">
                <p className="mb-2 text-xs font-medium text-green-700">
                  {book.category_name}
                </p>

                <h2 className="mb-3 min-h-[60px] text-sm font-semibold leading-5 text-gray-900">
                  {book.title}
                </h2>

                {/* Stock Status */}
                <div className="mb-4 flex items-center gap-2">
                  {book.in_stock ? (
                    <>
                      <CircleCheckBig
                        size={14}
                        className="text-green-600"
                      />

                      <span className="text-sm font-medium text-green-600">
                        In Stock
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="h-2 w-2 rounded-full bg-red-500" />

                      <span className="text-sm font-medium text-red-600">
                        Out of Stock
                      </span>
                    </>
                  )}
                </div>

                {/* Buttons */}
                <div className="mt-auto flex flex-col gap-3">
                  <Link
                    href={`/books/${book.slug}`}
                    className="
                      w-full
                      rounded-xl
                      bg-green-700
                      px-3
                      py-2.5
                      text-center
                      text-sm
                      font-medium
                      text-white
                      transition-all
                      duration-200
                      hover:bg-green-800
                      active:scale-[0.98]
                    "
                  >
                    View Details
                  </Link>

                  {book.in_stock ? (
                    <QuickAddButton
                      book={book}
                      onQuickAdd={(selected) => {
                        setSelectedBook(selected);
                        setShowQuickAdd(true);
                      }}
                    />
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="
                        w-full
                        cursor-not-allowed
                        rounded-xl
                        bg-gray-200
                        px-3
                        py-2.5
                        text-sm
                        font-medium
                        text-gray-500
                      "
                    >
                      Out of Stock
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            No books found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
            We could not find any books matching your search or selected
            category.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
            className="mt-6 rounded-xl bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-800"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Quick Add Modal */}
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

      {/* Cart Toast */}
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