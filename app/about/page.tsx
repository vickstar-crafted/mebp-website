import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto p-10">
        <h1 className="text-4xl font-bold mb-6">
          About MEBP
        </h1>

        <p className="mb-6">
          Model Educational Book Publishers Limited (MEBP)
          was established on 20th March 2007.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          Mission Statement
        </h2>

        <p className="mb-6">
          To provide accessible, affordable, and quality
          educational publications that support learning,
          creativity, and academic excellence.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          Vision Statement
        </h2>

        <p className="mb-6">
          To be a leading publishing company recognized
          for excellence, innovation, and the dissemination
          of knowledge that transforms lives and shapes
          the future.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          Corporate Statement
        </h2>

        <p>
          What makes our books different is our commitment
          to combining academic excellence, practical
          learning, moral values, and affordability.
          We do not merely publish books; we create
          resources that inspire learning, build
          character, and equip readers for success
          in school, life, and society.
        </p>
      </main>
    </>
  );
}