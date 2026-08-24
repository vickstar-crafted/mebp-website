import { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-gray-200 bg-white">
        {/* Admin Header */}
        <div className="border-b border-gray-200 px-5 py-5">
          <h1 className="text-2xl font-bold text-green-700">
            MEBP Admin
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            {user.email}
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 p-4">
          <Link
            href="/admin"
            className="
              block
              rounded-lg
              px-4
              py-3
              font-medium
              text-gray-800
              hover:bg-green-50
              hover:text-green-700
              transition
            "
          >
            Dashboard
          </Link>

          <Link
            href="/admin/orders"
            className="
              block
              rounded-lg
              px-4
              py-3
              font-medium
              text-gray-800
              hover:bg-green-50
              hover:text-green-700
              transition
            "
          >
            Orders
          </Link>

          <Link
            href="/admin/books"
            className="
              block
              rounded-lg
              px-4
              py-3
              font-medium
              text-gray-800
              hover:bg-green-50
              hover:text-green-700
              transition
            "
          >
            Books
          </Link>

          <Link
            href="/admin/analytics"
            className="
              block
              rounded-lg
              px-4
              py-3
              font-medium
              text-gray-800
              hover:bg-green-50
              hover:text-green-700
              transition
            "
          >
            Analytics
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 p-10 text-gray-900">
        {children}
      </main>
    </div>
  );
}