"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import MiniCart from "@/components/MiniCart";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Books", href: "/books" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}

        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center"
          aria-label="MEBP Home"
        >
          <Image
            src="/mebp-logo wide.jpeg"
            alt="Model Educational Book Publishers Limited"
            width={300}
            height={80}
            priority
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}

        <div className="hidden items-center gap-1 text-sm font-medium md:flex md:gap-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 transition-colors ${
                  isActive
                    ? "bg-green-50 font-semibold text-green-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-green-700"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          <div className="ml-2">
            <MiniCart />
          </div>
        </div>

        {/* Mobile Navigation Controls */}

        <div className="flex items-center gap-3 md:hidden">
          <MiniCart />

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition hover:bg-gray-50 hover:text-green-700"
          >
            {isMenuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-green-50 font-semibold text-green-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-green-700"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}