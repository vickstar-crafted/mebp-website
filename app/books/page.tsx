import type { Metadata } from "next";
import BooksCatalog from "@/components/BooksCatalog";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

type Props = {
  searchParams: Promise<{
    category?: string;
  }>;
};

/* ================================
   SEO METADATA
================================ */

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { category } = await searchParams;

  const cleanCategory = category?.trim();

  if (cleanCategory) {
    return {
      title: `${cleanCategory} Books for Nursery & Primary Schools in Nigeria`,

      description:
        `Explore ${cleanCategory.toLowerCase()} books for Nursery and Primary School learners in Nigeria. Browse educational resources from Model Educational Book Publishers Limited.`,

      keywords: [
        `${cleanCategory} books`,
        `${cleanCategory} books Nigeria`,
        `${cleanCategory} books for primary schools`,
        `${cleanCategory} books for nursery schools`,
        "Educational Books Nigeria",
        "Primary School Books Nigeria",
        "Nursery School Books Nigeria",
        "MEBP",
        "Model Educational Book Publishers",
      ],

      alternates: {
        canonical: `/books?category=${encodeURIComponent(cleanCategory)}`,
      },

      openGraph: {
        title: `${cleanCategory} Books for Nursery & Primary Schools in Nigeria`,

        description:
          `Browse ${cleanCategory.toLowerCase()} books for Nursery and Primary School learners in Nigeria from Model Educational Book Publishers Limited.`,

        url: `/books?category=${encodeURIComponent(cleanCategory)}`,

        siteName: "Model Educational Book Publishers",

        locale: "en_NG",

        type: "website",
      },

      twitter: {
        card: "summary_large_image",

        title: `${cleanCategory} Books for Nursery & Primary Schools in Nigeria`,

        description:
          `Browse ${cleanCategory.toLowerCase()} books for Nursery and Primary School learners in Nigeria.`,
      },
    };
  }

  return {
    title:
      "Educational Books in Nigeria | Nursery & Primary School Books",

    description:
      "Browse educational books for Nursery and Primary School learners in Nigeria. Explore Mathematics, English, Handwriting, Verbal Reasoning, Quantitative Reasoning, storybooks and other learning resources from Model Educational Book Publishers Limited.",

    keywords: [
      "Educational Books Nigeria",
      "Educational Books in Nigeria",
      "Primary School Books Nigeria",
      "Nursery School Books Nigeria",
      "Primary School Textbooks Nigeria",
      "Nursery School Textbooks Nigeria",
      "Mathematics Books for Primary Schools",
      "English Books for Primary Schools",
      "Handwriting Books for Children",
      "Verbal Reasoning Books",
      "Quantitative Reasoning Books",
      "Educational Storybooks",
      "MEBP",
      "Model Educational Book Publishers",
    ],

    alternates: {
      canonical: "/books",
    },

    openGraph: {
      title:
        "Educational Books in Nigeria | Nursery & Primary School Books",

      description:
        "Browse educational books for Nursery and Primary School learners in Nigeria, including Mathematics, English, Handwriting, Verbal Reasoning and Quantitative Reasoning books.",

      url: "/books",

      siteName: "Model Educational Book Publishers",

      locale: "en_NG",

      type: "website",
    },

    twitter: {
      card: "summary_large_image",

      title:
        "Educational Books in Nigeria | Nursery & Primary School Books",

      description:
        "Browse educational books for Nursery and Primary School learners in Nigeria.",
    },
  };
}

/* ================================
   BOOKS CATALOG PAGE
================================ */

export default async function BooksPage({
  searchParams,
}: Props) {
  const { category } = await searchParams;

  const cleanCategory = category?.trim();

  let query = supabase
    .from("books")
    .select(
      "id, title, slug, category_name, description, cover_image, in_stock, featured, display_order"
    );

  if (cleanCategory) {
    query = query.eq("category_name", cleanCategory);
  }

  const { data: books } = await query.order("display_order");

  const bookList = books ?? [];

  /* ================================
     STRUCTURED DATA
  ================================= */

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",

    name: cleanCategory
      ? `${cleanCategory} Books`
      : "Educational Books in Nigeria",

    description: cleanCategory
      ? `Educational ${cleanCategory.toLowerCase()} books for Nursery and Primary School learners in Nigeria.`
      : "Educational books for Nursery and Primary School learners in Nigeria.",

    url: cleanCategory
      ? `https://www.mebpbooks.com/books?category=${encodeURIComponent(
          cleanCategory
        )}`
      : "https://www.mebpbooks.com/books",

    isPartOf: {
      "@type": "WebSite",
      name: "Model Educational Book Publishers",
      url: "https://www.mebpbooks.com/",
    },

    mainEntity: {
      "@type": "ItemList",

      name: cleanCategory
        ? `${cleanCategory} Books`
        : "MEBP Educational Books",

      numberOfItems: bookList.length,

      itemListElement: bookList.map((book, index) => ({
        "@type": "ListItem",

        position: index + 1,

        url: `https://www.mebpbooks.com/books/${book.slug}`,

        item: {
          "@type": "Book",

          name: book.title,

          url: `https://www.mebpbooks.com/books/${book.slug}`,

          ...(book.description
            ? {
                description: book.description,
              }
            : {}),

          publisher: {
            "@type": "Organization",
            name: "Model Educational Book Publishers Limited",
          },

          ...(book.category_name
            ? {
                genre: book.category_name,
              }
            : {}),
        },
      })),
    },
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">

        {/* BOOKS PAGE STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <div className="mx-auto max-w-6xl px-6 py-10">

          {/* PAGE INTRODUCTION */}
          <div className="mb-10">

            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-700">
              MEBP Book Collection
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              {cleanCategory
                ? `${cleanCategory} Books`
                : "Educational Books for Nursery & Primary Schools"}
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
              {cleanCategory
                ? `Browse our collection of ${cleanCategory.toLowerCase()} books for Nursery and Primary School learners in Nigeria.`
                : "Browse quality educational books for Nursery and Primary School learners in Nigeria. Explore learning resources across Mathematics, English, Handwriting, Verbal Reasoning, Quantitative Reasoning, storybooks and other educational areas."}
            </p>

          </div>

          {/* BOOK CATALOG */}
          <BooksCatalog books={bookList} />

        </div>

      </main>
    </>
  );
}