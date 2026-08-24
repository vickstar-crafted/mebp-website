"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function AdminLoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
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
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-center text-3xl font-bold text-green-700">
          MEBP Admin
        </h1>

        <p className="mb-8 text-center text-gray-600">
          Sign in to manage bookstore orders
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>
    </main>
  );
}