import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

          {/* Company */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="MEBP Home"
            >
              <Image
  src="/mebp-logo.jpeg"
  alt="Model Educational Book Publishers Limited"
  width={240}
  height={60}
  className="h-12 w-auto object-contain"
/>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-600">
              Model Educational Book Publishers Limited provides
              accessible, affordable and quality educational resources
              designed to support learning, creativity and academic
              excellence.
            </p>

            <p className="mt-4 text-sm font-medium text-green-700">
              Established 20th March 2007
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 font-semibold text-gray-900">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link
                href="/"
                className="text-gray-600 transition-colors hover:text-green-700"
              >
                Home
              </Link>

              <Link
                href="/books"
                className="text-gray-600 transition-colors hover:text-green-700"
              >
                Our Books
              </Link>

              <Link
                href="/about"
                className="text-gray-600 transition-colors hover:text-green-700"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="text-gray-600 transition-colors hover:text-green-700"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 font-semibold text-gray-900">
              Contact
            </h3>

            <div className="space-y-4 text-sm text-gray-600">

              {/* Address */}
              <div className="flex gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-green-700"
                />

                <p className="leading-6">
                  19, Eyiowuawi Street,
                  <br />
                  Pedro, Somolu,
                  <br />
                  Lagos, Nigeria
                </p>
              </div>

              {/* Phone Numbers */}
              <div className="flex gap-3">
                <Phone
                  size={18}
                  className="mt-0.5 shrink-0 text-green-700"
                />

                <div className="flex flex-col gap-1">
                  <a
                    href="tel:08033961238"
                    className="transition-colors hover:text-green-700"
                  >
                    08033961238
                  </a>

                  <a
                    href="tel:08023010713"
                    className="transition-colors hover:text-green-700"
                  >
                    08023010713
                  </a>

                  <a
                    href="tel:08029080363"
                    className="transition-colors hover:text-green-700"
                  >
                    08029080363
                  </a>

                  <a
                    href="tel:08051153359"
                    className="transition-colors hover:text-green-700"
                  >
                    08051153359
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3">
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-green-700"
                />

                <a
                  href="mailto:mebpubltd@gmail.com"
                  className="transition-colors hover:text-green-700"
                >
                  mebpubltd@gmail.com
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-3 border-t border-gray-200 pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} Model Educational Book Publishers Limited.
            All rights reserved.
          </p>

          <p>
            Educational Publishing Since 2007
          </p>
        </div>
      </div>
    </footer>
  );
}