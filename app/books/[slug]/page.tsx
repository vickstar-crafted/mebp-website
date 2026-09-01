import AddToCart from "@/components/AddToCart";
import Image from "next/image";
import { Tag, CircleCheckBig, ChevronRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

const baseUrl = "https://www.mebpbooks.com";

function getBookImageUrl(slug: string) {
  return `https://opigtrpgtyssktfybqqy.supabase.co/storage/v1/object/public/book-covers/${slug}.jpg`;
}

/* ================================
   DYNAMIC SEO METADATA
================================ */

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: book } = await supabase
    .from("books")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!book) {
    return {
      title: "Book Not Found",
      description:
        "The requested educational book could not be found.",
    };
  }

  const bookUrl = `${baseUrl}/books/${book.slug}`;
  const imageUrl = getBookImageUrl(book.slug);

  const description =
    book.description ||
    `${book.title} is an educational book published by Model Educational Book Publishers Limited for Nursery and Primary School learners in Nigeria.`;

  return {
    title: book.title,

    description,

    keywords: [
      book.title,
      book.category_name,
      "MEBP",
      "Model Educational Book Publishers",
      "Educational Books Nigeria",
      "Educational Publishers Nigeria",
      "Primary School Books Nigeria",
      "Nursery School Books Nigeria",
      "Primary School Textbooks",
      "Learning Materials for Children",
    ].filter(Boolean),

    alternates: {
      canonical: bookUrl,
    },

    openGraph: {
      type: "website",
      locale: "en_NG",
      url: bookUrl,
      siteName: "Model Educational Book Publishers Limited",
      title: `${book.title} | MEBP`,
      description,
      images: [
        {
          url: imageUrl,
          width: 400,
          height: 560,
          alt: `${book.title} - Model Educational Book Publishers`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${book.title} | MEBP`,
      description,
      images: [imageUrl],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

/* ================================
   BOOK DETAILS PAGE
================================ */

export default async function BookDetailsPage({
  params,
}: Props) {
  const { slug } = await params;

  const { data: book } = await supabase
    .from("books")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!book) {
    notFound();
  }

  const bookUrl = `${baseUrl}/books/${book.slug}`;
  const imageUrl = getBookImageUrl(book.slug);

  const description =
    book.description ||
    `${book.title} is an educational book published by Model Educational Book Publishers Limited for Nursery and Primary School learners in Nigeria.`;

  /* ================================
     STRUCTURED DATA
  ================================= */

  const bookStructuredData = {
    "@context": "https://schema.org",
    "@type": "Book",

    name: book.title,

    description,

    image: imageUrl,

    url: bookUrl,

    author: {
      "@type": "Organization",
      name: "Model Educational Book Publishers Limited",
    },

    publisher: {
      "@type": "Organization",
      name: "Model Educational Book Publishers Limited",
      url: baseUrl,
    },

    inLanguage: "en",

    genre: book.category_name || "Educational",

    isFamilyFriendly: true,
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },

      {
        "@type": "ListItem",
        position: 2,
        name: "Books",
        item: `${baseUrl}/books`,
      },

      {
        "@type": "ListItem",
        position: 3,
        name: book.title,
        item: bookUrl,
      },
    ],
  };

  return (
    <>
      {/* Book structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bookStructuredData),
        }}
      />

      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <Navbar />

      <main className="min-h-screen bg-gray-50">

        {/* Breadcrumbs */}
        <div className="mx-auto max-w-5xl px-6 pt-6">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1 text-sm text-gray-500"
          >
            <Link
              href="/"
              className="transition hover:text-green-700"
            >
              Home
            </Link>

            <ChevronRight size={15} />

            <Link
              href="/books"
              className="transition hover:text-green-700"
            >
              Books
            </Link>

            <ChevronRight size={15} />

            <span
              className="font-medium text-gray-700"
              aria-current="page"
            >
              {book.title}
            </span>
          </nav>
        </div>

        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-10 md:grid-cols-2">

          {/* Book Cover */}
          <div>
            <Image
              src={imageUrl}
              alt={`${book.title} - Model Educational Book Publishers`}
              width={400}
              height={560}
              priority
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
            <h1 className="mb-4 mt-3 text-3xl font-bold text-gray-900">
              {book.title}
            </h1>

            {/* Description */}
            {book.description && (
              <p className="mb-6 leading-7 text-gray-600">
                {book.description}
              </p>
            )}

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