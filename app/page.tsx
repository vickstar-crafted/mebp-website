import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title:
    "Educational Books in Nigeria | Nursery & Primary School Books | MEBP",

  description:
    "Explore quality educational books for Nursery and Primary School learners in Nigeria. Model Educational Book Publishers Limited provides Mathematics, English, Handwriting, Verbal Reasoning, Quantitative Reasoning and educational storybooks.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title:
      "Educational Books in Nigeria | Nursery & Primary School Books | MEBP",

    description:
      "Explore quality educational books for Nursery and Primary School learners in Nigeria, including Mathematics, English, Handwriting, Verbal Reasoning and Quantitative Reasoning books.",

    url: "/",
    siteName: "Model Educational Book Publishers",
    locale: "en_NG",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Educational Books in Nigeria | Nursery & Primary School Books | MEBP",

    description:
      "Explore quality educational books for Nursery and Primary School learners in Nigeria.",
  },
};

export default async function Home() {
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name");

  /*
   * Structured data for the homepage.
   *
   * The Organization and WebSite schemas are already provided
   * globally in app/layout.tsx. This schema focuses specifically
   * on the homepage's educational book categories.
   */
  const categoryStructuredData =
    categories?.map((category, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: category.name,
      url: `https://www.mebpbooks.com/books?category=${encodeURIComponent(
        category.name
      )}`,
    })) ?? [];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Educational Books in Nigeria",
    description:
      "Educational books for Nursery and Primary School learners in Nigeria from Model Educational Book Publishers Limited.",
    url: "https://www.mebpbooks.com/",
    isPartOf: {
      "@type": "WebSite",
      name: "Model Educational Book Publishers",
      url: "https://www.mebpbooks.com/",
    },
    mainEntity: {
      "@type": "ItemList",
      name: "MEBP Educational Book Categories",
      numberOfItems: categoryStructuredData.length,
      itemListElement: categoryStructuredData,
    },
  };

  return (
    <>
      <Navbar />

      <main className="bg-white text-gray-900">

        {/* HOMEPAGE STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100">
          <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">

            <div className="mx-auto max-w-4xl text-center">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-medium text-green-700 shadow-sm">
                <GraduationCap size={18} />
                Educational Publishing Since 2007
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Quality Educational Books
                <span className="block text-green-700">
                  for Nursery and Primary Schools
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 md:text-xl">
                Model Educational Book Publishers Limited provides
                quality and accessible educational books for Nursery and
                Primary School learners in Nigeria. Our books are designed
                to support learning, creativity and strong academic
                foundations.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

                <Link
                  href="/books"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-4 font-semibold text-white transition hover:bg-green-800"
                >
                  Explore Our Books
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-4 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Learn About Us
                </Link>

              </div>

            </div>

          </div>
        </section>

        {/* ABOUT / INTRODUCTION */}
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">

          <div className="grid gap-12 md:grid-cols-2 md:items-center">

            <div>

              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-700">
                About MEBP
              </p>

              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Educational Books Designed for Young Learners
              </h2>

              <p className="mt-6 leading-8 text-gray-600">
                Since our establishment on 20th March 2007, Model
                Educational Book Publishers Limited has remained committed
                to producing educational resources that help children
                learn, grow and develop important academic skills.
              </p>

              <p className="mt-4 leading-8 text-gray-600">
                Our collection includes educational books for Nursery and
                Primary School learners, covering important areas such as
                Mathematics, English, Handwriting, Verbal Reasoning,
                Quantitative Reasoning and educational storybooks.
              </p>

              <p className="mt-4 leading-8 text-gray-600">
                We aim to provide learning materials that combine practical
                learning, creativity and strong academic foundations for
                children and schools.
              </p>

              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-800"
              >
                Discover Our Story
                <ArrowRight size={18} />
              </Link>

            </div>

            {/* STATISTICS */}
            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-green-700 p-6 text-white shadow-sm">
                <p className="text-4xl font-bold">19+</p>

                <p className="mt-2 text-green-100">
                  Years of Educational Publishing
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <p className="text-4xl font-bold text-gray-900">
                  80+
                </p>

                <p className="mt-2 text-gray-600">
                  Educational Books
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <p className="text-4xl font-bold text-gray-900">
                  Nursery
                </p>

                <p className="mt-2 text-gray-600">
                  Early Learning Resources
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <p className="text-4xl font-bold text-gray-900">
                  Primary
                </p>

                <p className="mt-2 text-gray-600">
                  School Learning Resources
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* BOOK CATEGORIES */}
        <section className="border-y border-gray-200 bg-gray-50">

          <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">

            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">

              <div>

                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-700">
                  Our Collection
                </p>

                <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                  Educational Book Categories
                </h2>

                <p className="mt-4 max-w-2xl text-gray-600">
                  Explore our collection of educational books for Nursery
                  and Primary School learners. Find learning resources
                  across different subjects and academic areas.
                </p>

              </div>

              <Link
                href="/books"
                className="inline-flex items-center gap-2 font-semibold text-green-700"
              >
                View All Books
                <ArrowRight size={18} />
              </Link>

            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {categories?.map((category) => (

                <Link
                  key={category.id}
                  href={`/books?category=${encodeURIComponent(
                    category.name
                  )}`}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-md"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
                      <BookOpen size={24} />
                    </div>

                    <ArrowRight
                      size={20}
                      className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-green-700"
                    />

                  </div>

                  <h3 className="mt-6 text-xl font-bold text-gray-900">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Browse educational books and learning resources in{" "}
                    {category.name} for Nursery and Primary School
                    learners.
                  </p>

                </Link>

              ))}

            </div>

          </div>

        </section>

        {/* SUBJECT AREAS */}
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
              Learning Resources
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Books for Different Areas of Learning
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              Our educational book collection supports different stages
              and areas of learning, helping children develop essential
              academic and creative skills.
            </p>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-gray-200 p-7">

              <h3 className="text-xl font-bold text-gray-900">
                Mathematics
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Educational resources designed to help young learners
                develop mathematical understanding and problem-solving
                skills.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 p-7">

              <h3 className="text-xl font-bold text-gray-900">
                English & Handwriting
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Books that support English language development,
                handwriting practice and foundational literacy skills.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 p-7">

              <h3 className="text-xl font-bold text-gray-900">
                Reasoning & Storybooks
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Verbal Reasoning, Quantitative Reasoning and educational
                storybooks that encourage thinking, creativity and
                independent learning.
              </p>

            </div>

          </div>

        </section>

        {/* WHY MEBP */}
        <section className="border-t border-gray-200 bg-gray-50">

          <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">

            <div className="mx-auto max-w-3xl text-center">

              <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
                Our Commitment
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                Supporting Learning Beyond the Classroom
              </h2>

              <p className="mt-5 leading-8 text-gray-600">
                We believe that quality educational materials play an
                important role in helping children develop confidence,
                knowledge, creativity and the skills they need for the
                future.
              </p>

            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">

              <div className="rounded-2xl border border-gray-200 bg-white p-7">

                <h3 className="text-xl font-bold text-gray-900">
                  Quality Education
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Carefully developed educational materials that support
                  effective learning and help children build strong
                  academic foundations.
                </p>

              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-7">

                <h3 className="text-xl font-bold text-gray-900">
                  Creativity
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Resources that encourage children to think, explore,
                  practise new skills and develop their creativity.
                </p>

              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-7">

                <h3 className="text-xl font-bold text-gray-900">
                  Accessibility
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Educational resources designed to make learning more
                  accessible to students, parents, teachers and schools.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* CTA */}
        <section className="bg-green-700">

          <div className="mx-auto max-w-7xl px-6 py-20 text-center md:px-10">

            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Find the Right Educational Books for Your Learners
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-green-100">
              Browse our collection of educational books for Nursery and
              Primary School learners in Nigeria.
            </p>

            <Link
              href="/books"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 font-semibold text-green-700 transition hover:bg-green-50"
            >
              Browse Our Books
              <ArrowRight size={18} />
            </Link>

          </div>

        </section>

      </main>
    </>
  );
}