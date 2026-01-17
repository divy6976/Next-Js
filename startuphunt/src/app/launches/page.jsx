import Image from "next/image";
import Link from "next/link";
import { launches } from "../data/page.jsx";
import LaunchCard from "../LaunchCard/page.jsx";

export default function LaunchesPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white px-10 py-16">
      <h1 className="text-4xl font-bold mb-2">
        Latest Launches
      </h1>
      <p className="text-gray-400 mb-10">
        Explore products launched by early founders
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {
          launches.map((launch) => (
            <LaunchCard key={launch.slug} launch={launch} />
          ))
        }


         
      </div>

      

      </div>
   
  );
}
