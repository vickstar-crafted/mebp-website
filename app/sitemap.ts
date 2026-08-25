import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mebpbooks.com";

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/books`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  const { data: books } = await supabase
    .from("books")
    .select("slug, created_at");

  const bookPages =
    books?.map((book) => ({
      url: `${baseUrl}/books/${book.slug}`,
      lastModified: book.created_at
        ? new Date(book.created_at)
        : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })) ?? [];

  return [...staticPages, ...bookPages];
}