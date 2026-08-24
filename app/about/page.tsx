import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Eye,
  Heart,
  Target,
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="bg-gray-50">
        {/* Hero */}

        <section className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
            <div className="max-w-3xl">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-green-700">
                About MEBP
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
                Educating Young Minds.
                <span className="block text-green-700">
                  Building Stronger Futures.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600">
                Model Educational Book Publishers Limited is committed
                to creating accessible, affordable and quality
                educational resources that support learning, creativity
                and academic excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}

        <section className="bg-gray-50">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
            {/* Left */}

            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-green-700">
                Our Story
              </p>

              <h2 className="text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                Supporting Learning
                <span className="block">
                  Since 2007
                </span>
              </h2>

              <div className="mt-8 space-y-5 text-base leading-8 text-gray-600">
                <p>
                  Model Educational Book Publishers Limited (MEBP)
                  was established on 20th March 2007 with a commitment
                  to providing quality educational publications for
                  young learners.
                </p>

                <p>
                  Our books are designed to support effective learning,
                  encourage creativity and help students develop the
                  knowledge and skills they need for success.
                </p>

                <p>
                  We believe that quality educational resources play
                  an important role in building confident learners and
                  creating stronger foundations for the future.
                </p>
              </div>
            </div>

            {/* Right */}

            <div className="relative overflow-hidden rounded-3xl bg-green-700 p-10 text-white shadow-lg md:p-14">
              <BookOpen
                size={48}
                className="mb-10 opacity-90"
              />

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-100">
                Established
              </p>

              <p className="mt-3 text-6xl font-bold md:text-7xl">
                2007
              </p>

              <div className="my-10 h-px bg-green-500" />

              <p className="max-w-sm text-lg leading-8 text-green-50">
                Over the years, our focus has remained the same:
                creating educational resources that help children
                learn, grow and succeed.
              </p>
            </div>
          </div>
        </section>

        {/* Purpose */}

        <section className="border-y border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-green-700">
                What Guides Us
              </p>

              <h2 className="text-3xl font-bold text-gray-900 md:text-5xl">
                Our Purpose and Values
              </h2>

              <p className="mt-5 leading-7 text-gray-600">
                Everything we create is guided by our commitment to
                education, creativity and quality learning.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Mission */}

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <Target size={24} />
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  Our Mission
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  To provide accessible, affordable and quality
                  educational publications that support learning,
                  creativity and academic excellence.
                </p>
              </div>

              {/* Vision */}

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <Eye size={24} />
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  Our Vision
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  To be a leading publishing company recognized for
                  excellence, innovation and the dissemination of
                  knowledge that transforms lives and shapes the
                  future.
                </p>
              </div>

              {/* Corporate Statement */}

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <Heart size={24} />
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  Our Promise
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  We combine academic excellence, practical learning,
                  moral values and affordability to create resources
                  that inspire learning and help equip readers for
                  success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}

        <section className="bg-green-700">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="grid gap-10 text-center text-white sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-4xl font-bold">
                  19+
                </p>

                <p className="mt-2 text-sm text-green-100">
                  Years of Educational Publishing
                </p>
              </div>

              <div>
                <p className="text-4xl font-bold">
                  80+
                </p>

                <p className="mt-2 text-sm text-green-100">
                  Educational Books
                </p>
              </div>

              <div>
                <p className="text-4xl font-bold">
                  Nursery
                </p>

                <p className="mt-2 text-sm text-green-100">
                  Early Learning Resources
                </p>
              </div>

              <div>
                <p className="text-4xl font-bold">
                  Primary
                </p>

                <p className="mt-2 text-sm text-green-100">
                  School Learning Resources
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}

        <section className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-200 md:p-16">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-green-700">
                Explore MEBP
              </p>

              <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold text-gray-900 md:text-5xl">
                Find the Right Books for Your Learners
              </h2>

              <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-600">
                Explore our collection of educational books designed
                to support Nursery and Primary School learners.
              </p>

              <Link
                href="/books"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 active:scale-[0.98]"
              >
                Explore Our Books

                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}