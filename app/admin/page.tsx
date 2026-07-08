import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-green-700">
          MEBP Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Welcome back,
        </p>

        <p className="font-semibold text-lg">
          {session.user.email}
        </p>

      </div>
    </main>
  );
}