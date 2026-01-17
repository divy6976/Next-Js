import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function page({launch}) {
  return (
    <div className="group bg-[#111111] border border-[#1F2933] rounded-xl p-6 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      {/* IMAGE */}
      <div className="w-full h-[200px] rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-[#1F2933] to-[#111111]">
        <Image
          src={launch.image}
          alt={launch.name}
          width={400}
          height={200}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
          {launch.name}
        </h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-1">
          {launch.description}
        </p>

        {/* FOOTER */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#1F2933] group-hover:border-blue-500/30 transition-colors duration-300">
          <span className="text-xs text-blue-400 uppercase tracking-wide font-semibold px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
            SaaS
          </span>

          <Link
            href={`/launches/${launch.slug}`}
            className="text-sm text-gray-300 hover:text-blue-400 font-medium flex items-center gap-1 transition-colors duration-300 group-hover:gap-2"
          >
            View
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page
