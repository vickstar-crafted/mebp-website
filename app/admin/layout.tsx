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
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-gray-100">

      <aside className="w-72 bg-white border-r shadow-sm">

        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-green-700">
            MEBP Admin
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            {session.user.email}
          </p>
        </div>

        <nav className="p-4 space-y-2">

          <Link
            href="/admin"
            className="block rounded-lg px-4 py-3 hover:bg-green-50"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/orders"
            className="block rounded-lg px-4 py-3 hover:bg-green-50"
          >
            Orders
          </Link>

          <Link
            href="/admin/books"
            className="block rounded-lg px-4 py-3 hover:bg-green-50"
          >
            Books
          </Link>

          <Link
            href="/admin/analytics"
            className="block rounded-lg px-4 py-3 hover:bg-green-50"
          >
            Analytics
          </Link>

        </nav>

      </aside>

      <main className="flex-1 p-10">
        {children}
      </main>

    </div>
  );
}