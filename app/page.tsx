import Link from "next/link";
import { BookOpen, ArrowRight, GraduationCap } from "lucide-react";

import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: categories } = await supabase
    .from("categories")
    .select("*");

  return (
    <>
      <Navbar />

      <main className="bg-white text-gray-900">

        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100">
          <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">

            <div className="mx-auto max-w-4xl text-center">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-medium text-green-700 shadow-sm">
                <GraduationCap size={18} />
                Educational Publishing Since 2007
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Building Strong Foundations
                <span className="block text-green-700">
                  Through Quality Education
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 md:text-xl">
                Model Educational Book Publishers Limited provides
                accessible, affordable and quality educational books
                designed to support learning, creativity and academic
                excellence.
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
                Who We Are
              </p>

              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Educational Books Designed for Young Learners
              </h2>

              <p className="mt-6 leading-8 text-gray-600">
                Since our establishment on 20th March 2007, Model
                Educational Book Publishers Limited has remained
                committed to creating educational resources that help
                children learn, grow and develop important academic
                skills.
              </p>

              <p className="mt-4 leading-8 text-gray-600">
                Our books cover a wide range of subjects and learning
                areas for Nursery and Primary School students, combining
                practical learning with creativity and strong academic
                foundations.
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
                  Explore Our Book Categories
                </h2>

                <p className="mt-4 max-w-2xl text-gray-600">
                  Browse educational resources designed to support
                  learning at different stages of a child's academic
                  development.
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
                    Explore our collection of educational books in this
                    category.
                  </p>

                </Link>

              ))}

            </div>

          </div>

        </section>


        {/* WHY MEBP */}
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">

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

            <div className="rounded-2xl border border-gray-200 p-7">

              <h3 className="text-xl font-bold text-gray-900">
                Quality Education
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Carefully developed educational materials that support
                effective learning.
              </p>

            </div>


            <div className="rounded-2xl border border-gray-200 p-7">

              <h3 className="text-xl font-bold text-gray-900">
                Creativity
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Resources that encourage children to think, explore and
                develop their creativity.
              </p>

            </div>


            <div className="rounded-2xl border border-gray-200 p-7">

              <h3 className="text-xl font-bold text-gray-900">
                Accessibility
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Educational resources designed to make learning more
                accessible to students and schools.
              </p>

            </div>

          </div>

        </section>


        {/* CTA */}
        <section className="bg-green-700">

          <div className="mx-auto max-w-7xl px-6 py-20 text-center md:px-10">

            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Find the Right Books for Your Learners
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-green-100">
              Browse our collection of educational books for Nursery and
              Primary School learners.
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