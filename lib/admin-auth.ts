import "server-only";

import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export async function requireAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const allowedEmail = process.env.ADMIN_EMAIL
    ?.trim()
    .toLowerCase();

  const userEmail = user?.email
    ?.trim()
    .toLowerCase();

  if (
    error ||
    !user ||
    !allowedEmail ||
    userEmail !== allowedEmail
  ) {
    notFound();
  }

  return { supabase, user };
}