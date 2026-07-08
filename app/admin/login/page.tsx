"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function AdminLoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

router.push("/admin");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border">

        <h1 className="text-3xl font-bold text-center text-green-700 mb-2">
          MEBP Admin
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Sign in to manage bookstore orders
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-700 py-3 font-medium text-white hover:bg-green-800 disabled:bg-gray-400"
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}