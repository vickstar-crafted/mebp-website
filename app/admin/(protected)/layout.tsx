import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = await requireAdmin();

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      <aside className="w-64 shrink-0 border-r border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-5">
          <h1 className="text-2xl font-bold text-green-700">
            MEBP Admin
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            {user.email}
          </p>
        </div>

        <nav className="space-y-2 p-4">
          <Link
            href="/admin"
            className="block rounded-lg px-4 py-3 font-medium text-gray-800 transition hover:bg-green-50 hover:text-green-700"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/orders"
            className="block rounded-lg px-4 py-3 font-medium text-gray-800 transition hover:bg-green-50 hover:text-green-700"
          >
            Orders
          </Link>

          <Link
            href="/admin/books"
            className="block rounded-lg px-4 py-3 font-medium text-gray-800 transition hover:bg-green-50 hover:text-green-700"
          >
            Books
          </Link>

          <Link
            href="/admin/analytics"
            className="block rounded-lg px-4 py-3 font-medium text-gray-800 transition hover:bg-green-50 hover:text-green-700"
          >
            Analytics
          </Link>
        </nav>
      </aside>

      <main className="min-w-0 flex-1 p-10 text-gray-900">
        {children}
      </main>
    </div>
  );
}