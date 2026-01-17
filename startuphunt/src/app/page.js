export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 text-center text-lg font-medium bg-[#0B0B0B] text-white">
      
      <p>
        Discover the latest startups and innovations in the tech world with{" "}
        <span className="relative inline-flex">
          <span className="absolute inset-0 blur-lg opacity-30 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E]"></span>
          <span className="relative font-semibold text-white">
            StartupHunt
          </span>
        </span>
        !
      </p>

      <p className="mt-2 text-gray-400">
        Products built by founders, tested by users
      </p>

      <button className="mt-4 px-6 py-2 bg-gradient-to-r from-[#313233] via-[#e7e2ea] to-[#59221f] text-white rounded-full hover:opacity-90 transition-opacity">
        Explore Launches
      </button>

      {/* Early access info box */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-300 bg-[#1F2933] border border-[#1F2933] px-6 py-3 rounded-full shadow-sm">
        <span className="flex items-center gap-1">🚀 <span className="font-semibold text-white">Early Access</span></span>
        <span className="hidden sm:block text-gray-500">•</span>
        <span className="flex items-center gap-1">🧪 <span className="font-semibold text-white">Real Feedback</span></span>
        <span className="hidden sm:block text-gray-500">•</span>
        <span className="flex items-center gap-1">⚡ <span className="font-semibold text-white">Fast Discovery</span></span>
      </div>

    </main>
  );
}
