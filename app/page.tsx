import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: categories } = await supabase
    .from("categories")
    .select("*");

  return (
    <main className="min-h-screen">
      <section className="p-12 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Model Educational Book Publishers Ltd
        </h1>

        <p className="text-lg mb-2">
          Established 20th March 2007
        </p>

        <p className="max-w-3xl mx-auto">
          Providing accessible, affordable and quality educational
          publications that support learning, creativity and
          academic excellence.
        </p>
      </section>

      <section className="p-12">
        <h2 className="text-3xl font-bold mb-6">
          Book Categories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories?.map((category) => (
            <div
              key={category.id}
              className="border rounded-xl p-6 shadow-sm hover:shadow-md"
            >
              <h3 className="text-xl font-semibold">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}