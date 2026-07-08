"use client";
import MiniCart from "@/components/MiniCart";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Books", href: "/books" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-2xl text-green-700">
          MEBP
        </h1>

        <div className="flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  isActive
                    ? "text-green-700 font-semibold bg-green-50 px-3 py-2 rounded-lg"
                    : "text-gray-600 hover:text-green-700"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          <MiniCart />
        </div>
      </div>
    </nav>
  );
}