import Image from "next/image";
import Link from "next/link";
import { launches } from "../../data/page.jsx";



export default async function Page({ params }) {
  // ✅ FIND THE LAUNCH
  const resolvedParams = await params;
  const launch = launches.find(l => l.slug === resolvedParams.slug);

  console.log(launch);

  // ✅ HANDLE NOT FOUND
  if (!launch) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white flex items-center justify-center">
        <h1 className="text-2xl">Launch not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white px-10 py-16">
      
      {/* IMAGE */}
      <div className="max-w-4xl mx-auto">
        <div className="w-full h-[320px] rounded-xl overflow-hidden mb-8 border border-[#1F2933]">
          <Image
            src={launch.image}
            alt={launch.name}
            width={1200}
            height={600}
            className="object-cover w-full h-full"
          />
        </div>

        {/* CONTENT */}
        <h1 className="text-4xl font-bold mb-3">
          {launch.name}
        </h1>

        <p className="text-gray-400 mb-6 text-lg">
          {launch.tagline}
        </p>

        <p className="text-gray-300 leading-relaxed mb-8">
          {launch.description}
        </p>

        {/* FOOTER */}
        <div className="flex items-center gap-6">
          <span className="text-sm uppercase text-blue-400">
            {launch.category}
          </span>

          {launch.url && (
            <a
              href={launch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Visit Launch
            </a>
          )}

          <Link
            href="/launches"
            className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white px-4 py-2 rounded-lg border border-[#1F2933] hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 hover:-translate-x-1"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
            Back to Launches
          </Link>
        </div>
      </div>
    </div>
  );
}
