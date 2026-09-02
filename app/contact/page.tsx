import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Model Educational Book Publishers | MEBP Nigeria",

  description:
    "Contact Model Educational Book Publishers Limited in Lagos, Nigeria for enquiries about educational books, school learning resources, orders, and distribution.",

  keywords: [
    "Contact MEBP",
    "Model Educational Book Publishers contact",
    "Educational Publishers Lagos",
    "Educational Books Nigeria",
    "Educational Book Suppliers Lagos",
    "Primary School Books Nigeria",
    "Nursery School Books Nigeria",
    "MEBP Nigeria",
  ],

  alternates: {
    canonical: "https://www.mebpbooks.com/contact",
  },

  openGraph: {
    title: "Contact Model Educational Book Publishers | MEBP Nigeria",
    description:
      "Get in touch with Model Educational Book Publishers Limited in Lagos for enquiries, educational books, school learning resources, and orders.",
    url: "https://www.mebpbooks.com/contact",
    siteName: "Model Educational Book Publishers",
    type: "website",
    locale: "en_NG",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Model Educational Book Publishers | MEBP Nigeria",
    description:
      "Contact MEBP in Lagos for enquiries about educational books, school learning resources, and orders.",
  },
};

export default function ContactPage() {
  const phoneNumbers = [
    "08033961238",
    "08023010713",
    "08029080363",
    "08051153359",
  ];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Model Educational Book Publishers Limited",
    alternateName: "MEBP",
    url: "https://www.mebpbooks.com",
    email: "mailto:mebpubltd@gmail.com",
    telephone: phoneNumbers.map((phone) => `+234${phone.slice(1)}`),
    address: {
      "@type": "PostalAddress",
      streetAddress: "19, Eyiowuawi Street",
      addressLocality: "Pedro, Somolu",
      addressRegion: "Lagos",
      addressCountry: "NG",
    },
    foundingDate: "2007-03-20",
  };

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Model Educational Book Publishers",
    url: "https://www.mebpbooks.com/contact",
    description:
      "Contact page for Model Educational Book Publishers Limited in Lagos, Nigeria.",
    mainEntity: organizationSchema,
  };

  return (
    <>
      <Navbar />

      {/* Contact Page structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema),
        }}
      />

      {/* Organization structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <main>
        {/* Hero Section */}
        <section className="border-b border-gray-200 bg-gradient-to-br from-white via-green-50 to-white">
          <div className="mx-auto max-w-7xl px-6 py-20 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-green-700">
              Get In Touch
            </p>

            <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              We Would Love to Hear From You
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Whether you represent a school or work as an educational
              bookseller or agent, we are available to help you find the right
              books and learning resources for your students and customers.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Address */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
                  <MapPin size={24} />
                </div>

                <h2 className="text-xl font-bold text-gray-900">
                  Visit Us
                </h2>

                <p className="mt-4 leading-7 text-gray-600">
                  19, Eyiowuawi Street,
                  <br />
                  Pedro, Somolu,
                  <br />
                  Lagos, Nigeria
                </p>
              </div>

              {/* Phone */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
                  <Phone size={24} />
                </div>

                <h2 className="text-xl font-bold text-gray-900">
                  Call Us
                </h2>

                <div className="mt-4 space-y-3">
                  {phoneNumbers.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone}`}
                      className="block text-gray-600 transition-colors hover:text-green-700"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
                  <Mail size={24} />
                </div>

                <h2 className="text-xl font-bold text-gray-900">
                  Email Us
                </h2>

                <p className="mt-4 text-gray-600">
                  For enquiries and information, send us an email.
                </p>

                <a
                  href="mailto:mebpubltd@gmail.com"
                  className="mt-4 block font-medium text-green-700 hover:text-green-800"
                >
                  mebpubltd@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* WhatsApp CTA */}
        <section className="bg-gray-50 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-3xl bg-green-700 px-8 py-14 text-center text-white md:px-16">
              <div className="mx-auto max-w-2xl">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <MessageCircle size={28} />
                </div>

                <h2 className="text-3xl font-bold">
                  Looking for Educational Books?
                </h2>

                <p className="mx-auto mt-4 max-w-xl leading-7 text-green-50">
                  Browse our collection and contact us directly to make an
                  enquiry or place an order.
                </p>

                <Link
                  href="/books"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
                >
                  Browse Our Books
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}