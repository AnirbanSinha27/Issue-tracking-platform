export const metadata = {
  title: "ApniSec | Cybersecurity Simplified",
  description:
    "ApniSec helps you manage Cloud Security, Red Team, and VAPT issues securely.",
};

import Navbar from "./components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="px-8 py-20 max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">
          Secure Your Infrastructure with ApniSec
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Track and manage Cloud Security, Red Team Assessments, and VAPT issues
          in one unified platform.
        </p>

        <section className="grid md:grid-cols-3 gap-8">
          <Feature title="Cloud Security" />
          <Feature title="Red Team Assessment" />
          <Feature title="VAPT" />
        </section>
      </main>
    </>
  );
}

function Feature({ title }: { title: string }) {
  return (
    <div className="p-6 border rounded-xl">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500">
        Identify, track, and resolve security risks effectively.
      </p>
    </div>
  );
}
