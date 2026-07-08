import Navbar from "@/components/Navbar";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto p-10">
        <h1 className="text-4xl font-bold mb-6">
          Contact Us
        </h1>

        <p className="mb-4">
          19, Eyiowuawi Street,
          Pedro, Somolu,
          Lagos, Nigeria
        </p>

        <p>08033961238</p>
        <p>08029080363</p>
        <p>08051153359</p>

        <p className="mt-4">
          mebpubltd@gmail.com
        </p>
      </main>
    </>
  );
}